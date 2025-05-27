import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: '../auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);

  authForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });
  isLoading = signal<boolean>(false);

  onSubmit() {
    this.isLoading.set(true);

    const {username, password} = this.authForm.value;
    const userData = {
      username: username ?? '',
      password: password ?? '',
    };


    this.authService.login(userData).subscribe({
      next: (res) => {
        this.isLoading.set(false);

        if (res?.status === 'success') {
          this.toastr.success(res.message || 'Регистрация успешна', 'Успех');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Неизвестный ответ от сервера', 'Ошибка');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.toastr.error(err.error.message, 'Ошибка');
      }
    });
  }
}
