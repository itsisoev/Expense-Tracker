import {Routes} from "@angular/router";
import {TransactionsComponent} from "./transactions.component";


export const transactionsRoutes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./transaction-form/transaction-form.component').then(m => m.TransactionFormComponent),
        data: {
          showHeader: true
        }
      },
      {
        path: 'history',
        loadComponent: () => import('./transaction-history/transaction-history.component').then(m => m.TransactionHistoryComponent),
        data: {
          showHeader: true
        }
      }
    ]
  }
]
