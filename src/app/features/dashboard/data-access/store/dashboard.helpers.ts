import { OrderStatus } from '../dashboard.models';

export function normalizeOrderStatus(raw: string | null): OrderStatus {
  if (!raw) return 'unknown';
  return raw as OrderStatus;
}

export function normalizeQuantity(qty: number): number {
  return qty < 0 ? 0 : qty;
}
