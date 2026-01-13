import { Component, Input } from '@angular/core';
import { OverallStats } from '../../../data-access/dashboard.models';

@Component({
  selector: 'app-kpi-cards',
  imports: [],
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.scss',
})
export class KpiCardsComponent {
  @Input() overall: OverallStats | null = null;
}
