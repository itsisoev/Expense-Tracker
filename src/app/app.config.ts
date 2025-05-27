import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./core/interceptors/auth.interceptor";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {provideServiceWorker} from '@angular/service-worker';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: JWT_OPTIONS, useValue: {
        headerName: 'Authorization',
        authScheme: 'Bearer ',
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
      }
    },
    JwtHelperService, provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ]
};
