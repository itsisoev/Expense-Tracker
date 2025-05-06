import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    canActivate: [authGuard],
    path: '',
    children: [],
  }
];
