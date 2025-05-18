import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormsModule} from "@angular/forms";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryAddComponent implements OnInit {
  title: string = '';

  isModalOpen = signal<boolean>(false);
  userId = signal<string | null>(null);

  authService = inject(AuthService);
  categoryService = inject(CategoryService)

  ngOnInit() {
    this.userId.set(this.authService.userId());
  }

  onSubmit() {
    if (!this.title.trim()) return;

    this.categoryService.createCategory({title: this.title})
      .subscribe({
        next: (category) => {
          this.title = '';
          this.closeModal();
        },
        error: (err) => {
        }
      });
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
