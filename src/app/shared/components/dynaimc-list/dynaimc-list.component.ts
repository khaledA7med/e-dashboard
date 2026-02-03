import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DynamicListAction,
  DynamicListColumn,
} from '../../models/dynamic-list/dynamic-list.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynaimc-list',
  imports: [CommonModule],
  templateUrl: './dynaimc-list.component.html',
  styleUrl: './dynaimc-list.component.scss',
})
export class DynaimcListComponent<T> {
  /* =======================
   * INPUTS
   * ======================= */

  @Input() title = '';
  @Input() data: T[] = [];
  @Input() columns: DynamicListColumn<T>[] = [];
  @Input() actions: DynamicListAction<T>[] = [];

  @Input() loading = false;

  // search
  @Input() searchable = true;
  @Output() searchChange = new EventEmitter<string>();

  // pagination (controlled)
  @Input() page = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  /* =======================
   * UI HELPERS
   * ======================= */

  get gridTemplate(): string {
    return `repeat(${this.columns.length}, 1fr) auto`;
  }

  onSearch(value: string) {
    this.searchChange.emit(value);
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement)?.value ?? '';
    this.onSearch(value);
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.pageChange.emit(p);
  }

  actionClass(action: DynamicListAction) {
    if (action.color === 'danger') {
      return 'bg-red-50 text-red-600 hover:bg-red-100';
    }
    return 'bg-blue-50 text-blue-600 hover:bg-blue-100';
  }

  getCellValue(row: T, col: { key: string; formatter?: (r: T) => any }) {
    if (col.formatter) return col.formatter(row);
    return (row as any)?.[col.key];
  }
}
