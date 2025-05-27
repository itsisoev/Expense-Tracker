import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {AlertComponent} from "../../../shared/components/alert/alert.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);

  authForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });
  errorMessage = signal<string>("");

  onSubmit() {
    this.errorMessage.set("");
    const {username, password} = this.authForm.value;
    const userData = {
      username: username ?? '',
      password: password ?? '',
    };

    this.authService.register(userData).subscribe({
      next: (res) => {
        if (res?.status === 'success') {
          this.toastr.success(res.message || 'Регистрация успешна', 'Успех');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Неизвестный ответ от сервера', 'Ошибка');
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Ошибка');
      }
    });
  }
}
