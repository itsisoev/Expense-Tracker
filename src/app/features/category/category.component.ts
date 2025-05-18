import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {CategoryService} from "./service/category.service";
import {ICategory} from "../../shared/models/category.model";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  categoryService = inject(CategoryService);

  categories = this.categoryService.categories;

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe();
  }
}
