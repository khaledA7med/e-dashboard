import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { CategoriesResponse, Category } from './categories.models';

@Injectable({ providedIn: 'root' })
export class CategoriesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://flower.elevateegy.com/api/v1/categories';

  /** =======================
   * GET ALL (with pagination)
   * ======================= */
  getAll(query: { page: number; limit: number; search?: string }) {
    let params = new HttpParams()
      .set('page', String(query.page))
      .set('limit', String(query.limit));

    if (query.search?.trim()) {
      params = params.set('keyword', query.search.trim());
    }

    return this.http.get<CategoriesResponse>(this.baseUrl, { params });
  }

  /** =======================
   * GET BY ID
   * ======================= */
  getById(id: string) {
    return this.http
      .get<{ message: string; category: Category }>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.category));
  }

  /** =======================
   * CREATE
   * ======================= */
  create(payload: FormData) {
    return this.http
      .post<{ message: string; category: Category }>(this.baseUrl, payload)
      .pipe(map((res) => res.category));
  }

  /** =======================
   * UPDATE
   * ======================= */
  update(id: string, payload: FormData) {
    return this.http
      .put<{ message: string; category: Category }>(
        `${this.baseUrl}/${id}`,
        payload
      )
      .pipe(map((res) => res.category));
  }

  /** =======================
   * DELETE
   * ======================= */
  remove(id: string) {
    return this.http
      .delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .pipe(map(() => id));
  }
}
