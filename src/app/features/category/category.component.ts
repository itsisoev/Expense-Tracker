import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {CategoryService} from "./service/category.service";
import {ICategory} from "../../shared/models/category.model";
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {ModalComponent} from "../../shared/components/modal/modal.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  selectCategory = output<{ id: string; title: string }>();

  editTitle: string = '';

  visibleCount = signal<number>(5);
  searchTerm = signal<string>('');
  openModal = signal<boolean>(false);
  modalType = signal<'edit' | 'delete' | null>(null);
  selectedCategory = signal<ICategory | null>(null);
  isLoading = signal<boolean>(false);

  categories = this.categoryService.categories;

  filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const filtered = this.categories().filter(category =>
      category.title.toLowerCase().includes(term)
    );
    return filtered.slice(0, this.visibleCount());
  });

  showLoadMoreButton = computed(() => {
    const totalFiltered = this.categories().filter(c =>
      c.title.toLowerCase().includes(this.searchTerm().toLowerCase())
    );

    return totalFiltered.length > this.visibleCount() && totalFiltered.length >= 5;
  });

  ngOnInit() {
    this.getAllCategories();
  }

  loadMore() {
    this.visibleCount.update(n => n + 5);
  }

  selectCategoryEmit(category: ICategory) {
    this.selectCategory.emit({ id: category.id, title: category.title });
  }

  getAllCategories() {
    this.isLoading.set(true);

    this.categoryService.getAllCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.toastr.error('Ошибка при загрузке категорий');
        this.isLoading.set(false);
      }
    });
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
      this.isLoading.set(true);

      this.categoryService.deleteCategory(id).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: (res) => {
          this.getAllCategories();
          this.closeModal();
          this.isLoading.set(false);
          this.toastr.success(res.message)
        },
        error: () => {
          this.isLoading.set(false);
          this.toastr.error('Ошибка при удалении категории');
        }
      });
    }
  }

  saveEdit(newTitle: string) {
    const category = this.selectedCategory();
    if (category) {
      this.isLoading.set(true);

      this.categoryService.updateCategory(category.id, { title: this.editTitle }).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
          next: (res) => {
            this.getAllCategories();
            this.closeModal();
            this.isLoading.set(false);
            this.toastr.success(res.message)
          },
          error: () => {
            this.isLoading.set(false);
            this.toastr.error('Ошибка при обновлении категории');
          }
        });
    }
  }
}
