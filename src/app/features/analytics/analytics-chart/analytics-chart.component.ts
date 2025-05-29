import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgxEchartsDirective} from "ngx-echarts";

@Component({
  selector: 'features-analytics-chart',
  standalone: true,
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './analytics-chart.component.html',
  styleUrl: './analytics-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsChartComponent {
  chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Расход', 'Доход', '']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Доход',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: '',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Расход',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          }
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
      },
      {
        name: 'Доход',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' ml';
          }
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
      },
      {
        name: '',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
      }
    ]
  };
}
