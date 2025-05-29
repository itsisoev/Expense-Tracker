import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AnalyticsChartComponent} from "./analytics-chart/analytics-chart.component";

@Component({
  selector: 'features-analytics',
  standalone: true,
  imports: [
    AnalyticsChartComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent {

}
