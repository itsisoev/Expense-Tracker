import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {RouterLink} from "@angular/router";

export interface HeaderLink {
  label: string;
  href: string;
}

@Component({
  selector: 'layout-header',
  standalone: true,
  imports: [
    ThemeToggleComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  links = signal<HeaderLink[]>([
    {label: 'Основное', href: '/'},
    {label: 'Отчет', href: '#'},
    {label: 'История', href: '/history'}
  ])
}
