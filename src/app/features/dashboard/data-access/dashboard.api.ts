import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import {
  CategoryStats,
  DashboardStatistics,
  OrdersStats,
  OverallStats,
} from './dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://flower.elevateegy.com/api/v1/statistics';

  getAllStatistics() {
    return this.http
      .get<{ message: string; statistics: DashboardStatistics }>(
        `${this.baseUrl}`
      )
      .pipe(map((res) => res.statistics));
  }

  getOverall() {
    return this.http
      .get<{ message: string; statistics: OverallStats }>(
        `${this.baseUrl}/overall`
      )
      .pipe(map((res) => res.statistics));
  }

  getProducts() {
    return this.http
      .get<{ message: string; statistics: DashboardStatistics['products'] }>(
        `${this.baseUrl}/products`
      )
      .pipe(map((res) => res.statistics));
  }

  getOrders() {
    return this.http
      .get<{ message: string; statistics: OrdersStats }>(
        `${this.baseUrl}/orders`
      )
      .pipe(map((res) => res.statistics));
  }

  getCategories() {
    return this.http
      .get<{ message: string; statistics: CategoryStats[] }>(
        `${this.baseUrl}/categories`
      )
      .pipe(map((res) => res.statistics));
  }
}
