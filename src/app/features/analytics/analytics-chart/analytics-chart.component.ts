import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnChanges,
  SimpleChanges,
  signal,
  input
} from '@angular/core';
import {NgxEchartsDirective} from 'ngx-echarts';
import {TransactionService} from '../../transactions/service/transaction.service';
import dayjs from 'dayjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EChartsCoreOption} from "echarts/core";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'features-analytics-chart',
  standalone: true,
  imports: [NgxEchartsDirective, LoaderComponent],
  templateUrl: './analytics-chart.component.html',
  styleUrls: ['./analytics-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsChartComponent implements OnChanges {
  private readonly transactionService = inject(TransactionService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastr = inject(ToastrService);

  period = input<'week' | 'month' | 'year'>('week')

  chartOption = signal<EChartsCoreOption>({});
  isLoading = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['period']) {
      this.loadData(this.period());
    }
  }

  private loadData(period: 'week' | 'month' | 'year') {
    const dates = this.generateDates(period);
    this.isLoading.set(true);

    this.transactionService.getStatsByPeriod(period)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({data}) => {
          const incomeMap = new Map(data.map(d => [d.date, d.income]));
          const expenseMap = new Map(data.map(d => [d.date, d.expense]));

          const incomes = dates.map(date => incomeMap.get(date) ?? 0);
          const expenses = dates.map(date => expenseMap.get(date) ?? 0);

          this.chartOption.set({
            tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
            legend: {data: ['Доход', 'Расход']},
            xAxis: {type: 'category', data: dates},
            yAxis: {type: 'value'},
            series: [
              {name: 'Доход', type: 'bar', data: incomes},
              {name: 'Расход', type: 'bar', data: expenses},
            ],
          });
        },
        error: () => {
          this.toastr.error('Ошибка при загрузки анализа', 'Ошибка')
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
  }

  private generateDates(period: 'week' | 'month' | 'year'): string[] {
    const dates: string[] = [];
    const now = dayjs();

    if (period === 'year') {
      for (let i = 11; i >= 0; i--) {
        dates.push(now.subtract(i, 'month').format('YYYY-MM'));
      }
    } else if (period === 'month') {
      const daysInMonth = now.daysInMonth();
      for (let i = daysInMonth - 1; i >= 0; i--) {
        dates.push(now.subtract(i, 'day').format('YYYY-MM-DD'));
      }
    } else {
      for (let i = 6; i >= 0; i--) {
        dates.push(now.subtract(i, 'day').format('YYYY-MM-DD'));
      }
    }
    return dates;
  }
}
