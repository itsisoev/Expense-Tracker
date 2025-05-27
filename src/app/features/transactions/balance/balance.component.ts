import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'balance',
  standalone: true,
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceComponent {

}
