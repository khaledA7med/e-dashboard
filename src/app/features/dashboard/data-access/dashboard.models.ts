/* =======================
 * OVERALL
 * ======================= */

export interface OverallStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

/* =======================
 * PRODUCTS
 * ======================= */

export interface ProductItem {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold?: number;
}

export interface ProductsByCategory {
  _id: string;
  category: string;
  count: number;
  products: ProductItem[];
}

export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
}

export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
}

/* =======================
 * ORDERS
 * ======================= */

export type OrderStatus =
  | 'completed'
  | 'canceled'
  | 'pending'
  | 'inProgress'
  | 'unknown';

export interface OrdersByStatusDto {
  _id: string | null; // backend can return null
  count: number;
}
export interface RevenuePointDto {
  _id: string; // "2025-12" or "2025-12-29"
  revenue: number;
  count: number;
}

export interface OrdersByStatus {
  status: OrderStatus;
  count: number;
}

export interface RevenuePoint {
  date: string; // day or month
  revenue: number;
  count: number;
}

export type RevenueMode = 'monthly' | 'daily';

export interface OrdersStats {
  ordersByStatus: OrdersByStatusDto[];
  dailyRevenue: RevenuePointDto[];
  monthlyRevenue: RevenuePointDto[];
}

/* =======================
 * CATEGORIES
 * ======================= */

export interface CategoryStats {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}

/* =======================
 * FULL DASHBOARD RESPONSE
 * ======================= */

export interface DashboardStatistics {
  overall: OverallStats;
  products: {
    productsByCategory: ProductsByCategory[];
    topSellingProducts: TopSellingProduct[];
    lowStockProducts: LowStockProduct[];
  };
  orders: OrdersStats;
  categories: CategoryStats[];
}

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface ChartCategoryData {
  labels: string[];
  series: number[];
}
