import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from "../../core/services/theme.service";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  isWhiteMode = this.themeService.isWhiteMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
