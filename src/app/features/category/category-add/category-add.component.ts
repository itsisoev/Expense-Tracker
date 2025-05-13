import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryAddComponent {
  isModalOpen = signal<boolean>(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
