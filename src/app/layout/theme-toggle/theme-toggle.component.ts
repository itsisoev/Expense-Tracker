import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ThemeService} from "../../core/services/theme.service";

@Component({
  selector: 'layout-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  isWhiteMode = this.themeService.isWhiteMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
