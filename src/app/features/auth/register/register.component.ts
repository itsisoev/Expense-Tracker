import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";

import {ToastrService} from "ngx-toastr";
import {LoaderComponent} from "../../../shared/components/loader/loader.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: '../auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

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

    this.authService.register(userData).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
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
