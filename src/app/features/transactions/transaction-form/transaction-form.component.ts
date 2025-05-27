import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CategoryAddComponent} from "../../category/category-add/category-add.component";
import {CategoryComponent} from "../../category/category.component";
import {BalanceComponent} from "../balance/balance.component";

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CategoryAddComponent,
    CategoryComponent,
    BalanceComponent
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent {

}
