import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {AlertComponent} from "../../../shared/components/alert/alert.component";

@Component({
  selector: 'auth-login',
  standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: '../auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  fb = inject(FormBuilder);
  authForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  errorMessage = signal<string>("");
  alertType = signal<'error' | 'success' | 'info'>('error');


  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit() {
    const {username, password} = this.authForm.value;
    const userData = {
      username: username ?? '',
      password: password ?? '',
    };

    this.authService.login(userData).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.alertType.set('success');
          this.errorMessage.set(res.message);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.alertType.set('error');
        this.errorMessage.set(err.error?.message || 'Произошла ошибка');
      }
    });
  }
}
