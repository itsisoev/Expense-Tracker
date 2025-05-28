import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {TransactionService} from "../service/transaction.service";
import {ToastrService} from "ngx-toastr";
import {Transaction} from "../../../shared/models/transaction.model";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    ModalComponent,
    LoaderComponent
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionHistoryComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = signal<boolean>(false);
  transactions = signal<Transaction[]>([]);

  openModal = signal<boolean>(false);
  selectedTransaction = signal<Transaction | null>(null);
  editTitle = signal<string>('');
  modalType = signal<'edit' | 'delete' | null>(null);


  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.isLoading.set(true);

    this.transactionService.getTransactions().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: data => {
        this.transactions.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastr.error('Ошибка загрузки транзакций');
      }
    })
  }

  onEdit(id: string) {
    const transaction = this.transactions().find(t => t.id === id);
    if (!transaction) return;

    this.selectedTransaction.set(transaction);
    this.editTitle.set(transaction.title);
    this.modalType.set('edit');
    this.openModal.set(true);
  }

  onDelete(id: string) {
    const transaction = this.transactions().find(t => t.id === id);
    if (!transaction) return;

    this.selectedTransaction.set(transaction);
    this.modalType.set('delete');
    this.openModal.set(true);
  }

  saveEdit(title: string) {
    const transaction = this.selectedTransaction();
    if (!transaction) return;

    this.isLoading.set(true);

    this.transactionService.updateTransaction(transaction.id, 'transaction', {
      ...transaction,
      title
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.toastr.success('Категория обновлена');
        this.closeModal();
        this.getAllTransactions();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastr.error('Ошибка при обновлении');
      }
    });
  }

  confirmDelete() {
    const transaction = this.selectedTransaction();
    if (!transaction) return;

    this.isLoading.set(true);

    this.transactionService.deleteTransaction(transaction.id, 'transaction').pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.toastr.success('Удалено');
        this.closeModal();
        this.getAllTransactions();
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastr.error('Ошибка при удалении');
      }
    });
  }

  closeModal() {
    this.openModal.set(false);
    this.selectedTransaction.set(null);
    this.editTitle.set('');
    this.modalType.set(null);
  }
}
