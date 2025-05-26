import { inject, Injectable, signal } from '@angular/core';
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CreateCategoryDto, ICategory } from "../../../shared/models/category.model";
import { tap, catchError, of } from "rxjs";
import { Category, DbService, User } from "../../../core/services/db.service";
import {IUser} from "../../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApi = `${environment.baseAPI}category`;
  categories = signal<ICategory[]>([]);

  private http = inject(HttpClient);
  private db = inject(DbService);

  constructor() {
    this.loadCategoriesFromDb().catch(err => {
      console.log('Failed to load categories from DB:', err);
    });
  }

  // --- Конвертация из IndexedDB Category + User в ICategory ---
  private mapCategoryToICategory(cat: Category, user?: IUser): ICategory {
    return {
      id: cat.id,
      title: cat.title,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      user: user ?? undefined,
    };
  }

  // --- Конвертация из ICategory в IndexedDB Category ---
  private mapICategoryToCategory(cat: ICategory): Category {
    return {
      id: cat.id,
      title: cat.title,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      userId: cat.user?.id ?? 'unknown-user-id',
    };
  }

  private async loadCategoriesFromDb() {
    const cached: Category[] = await this.db.categories.toArray();
    if (cached.length === 0) return;

    // Загружаем пользователей для каждой категории
    const categoriesWithUsers: ICategory[] = await Promise.all(
      cached.map(async cat => {
        const userDb: User | undefined = await this.db.users.get(cat.userId);
        const user: IUser | undefined = userDb ? { id: userDb.id, username: userDb.username } : undefined;
        return this.mapCategoryToICategory(cat, user);
      })
    );

    this.categories.set(categoriesWithUsers);
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.http.post<ICategory>(this.baseApi, createCategoryDto).pipe(
      tap(async newCategory => {
        this.categories.update(prev => [...prev, newCategory]);
        const categoryForDb = this.mapICategoryToCategory(newCategory);
        await this.db.categories.put(categoryForDb);
      }),
      catchError(async () => {
        const tempCategory: ICategory = {
          ...createCategoryDto,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: undefined,
        };
        this.categories.update(prev => [...prev, tempCategory]);
        const categoryForDb = this.mapICategoryToCategory(tempCategory);
        await this.db.categories.put(categoryForDb);
        return of(tempCategory);
      })
    );
  }

  getAllCategories() {
    return this.http.get<ICategory[]>(this.baseApi).pipe(
      tap(async categories => {
        this.categories.set(categories);
        // Обновляем IndexedDB кеш
        await this.db.categories.clear();
        // Конвертируем и сохраняем
        const categoriesForDb = categories.map(cat => this.mapICategoryToCategory(cat));
        await this.db.categories.bulkPut(categoriesForDb);
      }),
      catchError(async () => {
        const cached = await this.db.categories.toArray();
        const categoriesWithUsers: ICategory[] = await Promise.all(
          cached.map(async cat => {
            const userDb = await this.db.users.get(cat.userId);
            const user = userDb ? { id: userDb.id, username: userDb.username } : undefined;
            return this.mapCategoryToICategory(cat, user);
          })
        );
        this.categories.set(categoriesWithUsers);
        return of(categoriesWithUsers);
      })
    );
  }

  updateCategory(id: string, dto: Partial<CreateCategoryDto>) {
    return this.http.patch<ICategory>(`${this.baseApi}/category/${id}`, dto).pipe(
      tap(async updatedCategory => {
        this.categories.update(categories =>
          categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
        const categoryForDb = this.mapICategoryToCategory(updatedCategory);
        await this.db.categories.put(categoryForDb);
      }),
      catchError(async () => {
        const categories = this.categories();
        const index = categories.findIndex(c => c.id === id);
        if (index !== -1) {
          const updatedCat: ICategory = {
            ...categories[index],
            ...dto,
            updatedAt: new Date().toISOString(),
            user: categories[index].user,
          };
          this.categories.update(cats => {
            const copy = [...cats];
            copy[index] = updatedCat;
            return copy;
          });
          const categoryForDb = this.mapICategoryToCategory(updatedCat);
          await this.db.categories.put(categoryForDb);
          return of(updatedCat);
        }
        return of(null);
      })
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(`${this.baseApi}/category/${id}`).pipe(
      tap(async () => {
        this.categories.update(categories => categories.filter(cat => cat.id !== id));
        await this.db.categories.delete(id);
      }),
      catchError(async () => {
        this.categories.update(categories => categories.filter(cat => cat.id !== id));
        await this.db.categories.delete(id);
        return of(null);
      })
    );
  }
}
