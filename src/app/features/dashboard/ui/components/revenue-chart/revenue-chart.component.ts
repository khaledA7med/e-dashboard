import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  RevenueMode,
  RevenuePoint,
} from '../../../data-access/dashboard.models';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-revenue-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss',
})
export class RevenueChartComponent {
  @Input() monthly: RevenuePoint[] = [];
  @Input() daily: RevenuePoint[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  mode: RevenueMode = 'monthly';

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  readonly options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed.y;
            if (value == null) return '';
            return `${new Intl.NumberFormat('en-US').format(value)} EGP`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: '#F3F4F6' },
        ticks: {
          callback: (v) => {
            if (v == null) return '';
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
            }).format(Number(v));
          },
        },
      },
    },
  };

  ngOnChanges(_: SimpleChanges): void {
    this.buildChart();
  }

  setMode(mode: RevenueMode) {
    if (this.mode === mode) return;
    this.mode = mode;
    this.buildChart();
  }

  private buildChart() {
    const source = this.mode === 'monthly' ? this.monthly : this.daily;

    if (!source || source.length === 0) {
      this.chartData = { labels: [], datasets: [] };
      return;
    }

    const sorted = [...source].sort((a, b) => a.date.localeCompare(b.date));

    this.chartData = {
      labels: sorted.map((p) => this.formatLabel(p.date)),
      datasets: [
        {
          data: sorted.map((p) => p.revenue),
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220,38,38,0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 6,
        },
      ],
    };

    // Force redraw (important)
    queueMicrotask(() => this.chart?.update());
  }

  private formatLabel(date: string): string {
    const parts = date.split('-');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    if (parts.length === 2) {
      return months[+parts[1] - 1];
    }

    return `${parts[2]} ${months[+parts[1] - 1]}`;
  }
}
