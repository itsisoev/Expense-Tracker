import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {CategoryAddComponent} from "../../category/category-add/category-add.component";
import {CategoryComponent} from "../../category/category.component";
import {BalanceComponent} from "../balance/balance.component";
import {TransactionService} from '../service/transaction.service';
import {CreateTransactionDto} from "../../../shared/models/transaction.model";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CategoryAddComponent,
    CategoryComponent,
    BalanceComponent,
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent {
  private readonly transactionService = inject(TransactionService);
  private readonly toastr = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);

  amount: number = 0;
  type = signal<'income' | 'expense'>('income');
  selectedCategory = signal<{ id: string; title: string } | null>(null);
  isLoading = signal<boolean>(false);

  onCreateTransaction() {
    this.isLoading.set(true);

    const amount = this.amount;
    const categoryId = this.selectedCategory()?.id;
    const type = this.type();

    if (!amount || !categoryId) {
      this.isLoading.set(false);
      this.toastr.error('Введите сумму и выберите категорию');
      return;
    }

    const dto: CreateTransactionDto = {
      title: this.selectedCategory()?.title ?? '',
      amount,
      type,
      category: {id: categoryId}
    };

    this.transactionService.createTransaction(dto).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => {
        this.toastr.success('Транзакция добавлена');
        this.amount = 0;
        this.selectedCategory.set(null);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastr.success(err?.error?.message || 'Ошибка при создании транзакции');
      }
    });
  }

  setCategory(category: { id: string; title: string }) {
    this.selectedCategory.set(category);
  }
}
