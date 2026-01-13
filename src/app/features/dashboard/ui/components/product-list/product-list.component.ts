import { Component, Input } from '@angular/core';
import {
  LowStockProduct,
  TopSellingProduct,
} from '../../../data-access/dashboard.models';
import { CommonModule } from '@angular/common';

export type ProductListType = 'top' | 'low';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() title = '';
  @Input() type: ProductListType = 'top';
  @Input() topSelling: TopSellingProduct[] = [];
  @Input() lowStock: LowStockProduct[] = [];

  /** show only first 10 */
  get viewTopSelling() {
    return this.topSelling.slice(0, 10);
  }

  get viewLowStock() {
    return this.lowStock.slice(0, 10);
  }
  isTop(): boolean {
    return this.type === 'top';
  }
  isLow(): boolean {
    return this.type === 'low';
  }

  isCritical(qty: number): boolean {
    return qty <= 2;
  }
}
