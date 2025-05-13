import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CategoryAddComponent} from "../../category/category-add/category-add.component";

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CategoryAddComponent
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionFormComponent {

}
