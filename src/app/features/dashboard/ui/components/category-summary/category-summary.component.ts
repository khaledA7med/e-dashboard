import { Component, Input } from '@angular/core';
import { CategoryStats } from '../../../data-access/dashboard.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-summary',
  imports: [CommonModule],
  templateUrl: './category-summary.component.html',
  styleUrl: './category-summary.component.scss',
})
export class CategorySummaryComponent {
  @Input() categoryStats: CategoryStats[] = [];
}
