import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isWhite = signal<boolean>(false);

  toggleTheme(): void {
    const newValue = !this.isWhite();
    this.isWhite.set(newValue);
    document.body.classList.toggle('white-theme', newValue);
  }

  isWhiteMode = this.isWhite.asReadonly();
}
