import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {CategoryService} from "./service/category.service";
import {ICategory} from "../../shared/models/category.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  categoryService = inject(CategoryService);

  editTitle: string = '';

  openModal = signal<boolean>(false);
  modalType = signal<'edit' | 'delete' | null>(null);
  selectedCategory = signal<ICategory | null>(null);

  categories = this.categoryService.categories;

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe();
  }

  openEditModal(category: ICategory) {
    this.selectedCategory.set(category);
    this.editTitle = category.title;
    this.modalType.set('edit');
    this.openModal.set(true);
  }

  openDeleteModal(category: ICategory) {
    this.selectedCategory.set(category);
    this.modalType.set('delete');
    this.openModal.set(true);
  }

  closeModal() {
    this.openModal.set(false);
    this.modalType.set(null);
    this.selectedCategory.set(null);
  }

  confirmDelete() {
    const id = this.selectedCategory()?.id;
    if (id) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.getAllCategories();
        this.closeModal();
      });
    }
  }

  saveEdit(newTitle: string) {
    const category = this.selectedCategory();
    if (category) {
      this.categoryService.updateCategory(category.id, {title: this.editTitle})
        .subscribe(() => {
          this.getAllCategories();
          this.closeModal();
        });
    }
  }
}
