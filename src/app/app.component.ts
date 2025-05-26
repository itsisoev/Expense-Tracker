import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./layout/header/header.component";
import {filter} from "rxjs";
import {AlertComponent} from "./shared/components/alert/alert.component";
import {DbService} from "./core/services/db.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private db = inject(DbService);

  showHeader = signal<boolean>(true);

  constructor() {
    this.db.categories.toArray().then(cats => {
      console.log('[AppComponent] IndexedDB categories loaded:', cats);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const data = route.snapshot.data;
      this.showHeader.set(data?.['showHeader'] !== false);
    });
  }
}
