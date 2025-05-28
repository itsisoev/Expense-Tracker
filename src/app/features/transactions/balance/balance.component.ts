import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {BalanceService} from "./service/balance.service";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {TransactionService} from "../service/transaction.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'balance',
  standalone: true,
  imports: [
    LoaderComponent
  ],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent implements OnInit{
  private readonly balanceService = inject(BalanceService);
  private readonly transactionService = inject(TransactionService);
  private readonly destroyRef = inject(DestroyRef);

  totalBalance = signal<number>(0);
  income = signal<number>(0);
  expense = signal<number>(0);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.loadBalance();
    this.loadSplit();

    this.transactionService.transactionsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadBalance();
        this.loadSplit();
      });
  }

  loadBalance() {
    this.isLoading.set(true);

    this.balanceService.getBalance().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (balance) => {
        this.totalBalance.set(balance)
        this.isLoading.set(false);
      },
      error: () => {
        this.totalBalance.set(0)
        this.isLoading.set(false);
      },
    });
  }

  loadSplit() {
    this.isLoading.set(true);

    this.balanceService.getSplitTransactions().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: ({income, expense}) => {
        const incomeSum = income.reduce((acc, cur) => acc + (cur.amount ?? 0), 0);
        const expenseSum = expense.reduce((acc, cur) => acc + (cur.amount ?? 0), 0);

        this.income.set(incomeSum);
        this.expense.set(expenseSum);

        this.isLoading.set(false);
      },
      error: () => {
        this.income.set(0);
        this.expense.set(0);

        this.isLoading.set(false);
      }
    });
  }
}
