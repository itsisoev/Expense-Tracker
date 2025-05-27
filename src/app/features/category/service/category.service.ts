import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {CreateCategoryDto, ICategory} from "../../../shared/models/category.model";
import {tap, catchError, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApi = `${environment.baseAPI}category`;
  categories = signal<ICategory[]>([]);

  private http = inject(HttpClient);

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.http.post<{ message: string, data: ICategory }>(this.baseApi, createCategoryDto).pipe(
      tap(response => {
        const newCategory = response.data;
        if (newCategory.title?.trim()) {
          this.categories.update(prev => [...prev, newCategory]);
        }
      }),
      catchError(err => {
        console.error('Ошибка при создании категории:', err);
        throw err;
      })
    );
  }

  getAllCategories() {
    return this.http.get<ICategory[]>(this.baseApi).pipe(
      tap(categories => {
        this.categories.set(categories);
      }),
      catchError(err => {
        console.error('Ошибка при загрузке категорий:', err);
        return of([]);
      })
    );
  }

  updateCategory(id: string, dto: Partial<CreateCategoryDto>) {
    return this.http.patch<ICategory>(`${this.baseApi}/category/${id}`, dto).pipe(
      tap(updatedCategory => {
        this.categories.update(categories =>
          categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
      })
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(`${this.baseApi}/category/${id}`).pipe(
      tap(() => {
        this.categories.update(categories => categories.filter(cat => cat.id !== id));
      })
    );
  }
}
