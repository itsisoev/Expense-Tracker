import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {CreateCategoryDto, ICategory} from "../../../shared/models/category.model";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApi = `${environment.baseAPI}category`;
  categories = signal<ICategory[]>([]);

  http = inject(HttpClient);

  constructor() {
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.http.post<ICategory>(this.baseApi, createCategoryDto).pipe(
      tap(newCategory => {
        this.categories.update((prev) => [...prev, newCategory])
      })
    )
  }

  getAllCategories() {
    return this.http.get<ICategory[]>(`${this.baseApi}`).pipe(
      tap(categories => this.categories.set(categories))
    )
  }
}
