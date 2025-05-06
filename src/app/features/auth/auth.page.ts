import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'auth-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <div class="auth-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
}
