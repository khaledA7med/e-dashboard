export interface DynamicListColumn<T = any> {
  key: string;
  label: string;
  formatter?: (row: T) => string | number;
  className?: string;
}

export type DynamicListActionType = 'edit' | 'delete' | 'custom';

export interface DynamicListAction<T = any> {
  label?: string;
  type?: DynamicListActionType;
  color?: 'primary' | 'danger';
  icon?: string;
  onClick: (row: T) => void;
}
