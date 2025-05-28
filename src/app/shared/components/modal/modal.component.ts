import {ChangeDetectionStrategy, Component, input, model, output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'uc-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  openModal = input<boolean>(false);
  modalType = input<'edit' | 'delete' | null>(null);
  selectedTitle = input<string | null>(null);
  editTitle = model<string>("");

  closeModal = output();
  confirmDelete = output();
  saveEdit = output<string>();

  onEditTitleChange(value: string) {
    this.editTitle.set(value);
  }

  onSaveClick() {
    this.saveEdit.emit(this.editTitle());
  }
}
