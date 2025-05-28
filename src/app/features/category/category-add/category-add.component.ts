import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormsModule} from "@angular/forms";
import {CategoryService} from "../service/category.service";
import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryAddComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly categoryService = inject(CategoryService)
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  title: string = '';

  isModalOpen = signal<boolean>(false);
  userId = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.userId.set(this.authService.userId());
  }

  onSubmit() {
    this.isLoading.set(true);

    if (!this.title.trim()) {
      this.isLoading.set(false);
      this.toastr.error('Введите название категории');
      return;
    }

    this.categoryService.createCategory({ title: this.title }).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toastr.success(res?.message || 'Категория успешно создана');
        this.title = '';
        this.closeModal();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastr.error(err.error.message || 'Ошибка при создании категории');
      },
    });
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
