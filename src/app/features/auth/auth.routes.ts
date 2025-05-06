import {Routes} from "@angular/router";
import {AuthPageComponent} from "./auth.page";


export const authRoutes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        data: {
          showHeader: false
        }
      },
      {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        data: {
          showHeader: false
        }
      }
    ]
  }
]
