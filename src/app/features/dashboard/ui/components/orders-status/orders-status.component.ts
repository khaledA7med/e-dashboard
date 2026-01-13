import { Component, Input } from '@angular/core';
import { OrdersByStatus } from '../../../data-access/dashboard.models';
import { ChartConfiguration } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-orders-status',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './orders-status.component.html',
  styleUrl: './orders-status.component.scss',
})
export class OrdersStatusComponent {
  @Input() OrdersByStatus: OrdersByStatus[] = [];

  chartData!: ChartConfiguration<'doughnut'>['data'];

  /** ✅ view list without unknown */
  get view(): OrdersByStatus[] {
    return (this.OrdersByStatus ?? []).filter(
      (x) => x.status !== 'unknown' && x.count > 0
    );
  }

  readonly options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart() {
    const labels = this.view.map((o) => this.pretty(o.status));
    const values = this.view.map((o) => o.count);

    this.chartData = {
      labels,
      datasets: [
        {
          data: values,
          // ✅ keep color mapping stable (same order as statuses in view)
          backgroundColor: this.view.map((x) => this.color(x.status)),
          borderWidth: 0,
        },
      ],
    };
  }

  pretty(status: string): string {
    if (status === 'inProgress') return 'In progress';
    if (status === 'completed') return 'Completed';
    if (status === 'canceled') return 'Canceled';
    if (status === 'pending') return 'Pending';
    return status;
  }

  percent(count: number): number {
    const total = this.view.reduce((s, x) => s + x.count, 0) || 1;
    return Math.round((count / total) * 100);
  }

  color(status: string): string {
    if (status === 'completed') return '#22C55E';
    if (status === 'inProgress') return '#3B82F6';
    if (status === 'canceled') return '#EF4444';
    if (status === 'pending') return '#F59E0B';
    return '#9CA3AF';
  }
}
