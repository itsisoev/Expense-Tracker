import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {authGuard} from "./core/guards/auth.guard";
import {transactionsRoutes} from "./features/transactions/transactions.routes";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    canActivate: [authGuard],
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./features/transactions/transactions.routes').then(m => m.transactionsRoutes),
      },
      {
        path: 'analytics',
        loadChildren: () => import('./features/analytics/analytics.routes').then(m => m.analyticsRoutes),
      }
    ],
  }
];
