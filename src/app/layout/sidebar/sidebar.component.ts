import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [
    ThemeToggleComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

}
