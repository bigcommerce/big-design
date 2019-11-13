import { ReactNode } from 'react';

import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableSelectable<T> {
  selectedItems: T[];
  onSelectionChange(selectedItems: T[]): void;
}

export type TableSortDirection = 'ASC' | 'DESC';

export interface TableSortable<T> {
  direction: TableSortDirection;
  columnHash?: string;
  onSort(columnHash: string, direction: TableSortDirection, column: TableColumn<T>): void;
}

export interface TableItem {
  id?: string | number;
  [key: string]: any;
}

export interface TableColumn<T> {
  align?: 'left' | 'center' | 'right';
  hash: string;
  header: string;
  isSortable?: boolean;
  render: React.ComponentType<T> | ((props: T & { children?: ReactNode }, context?: any) => string | number);
  verticalAlign?: 'top' | 'center';
  width?: number | string;
  withPadding?: boolean;
}

export type TablePaginationProps = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  actions?: React.ComponentType<T>;
  columns: Array<TableColumn<T>>;
  itemName?: string;
  items: T[];
  keyField?: string;
  pagination?: TablePaginationProps;
  selectable?: TableSelectable<T>;
  sortable?: TableSortable<T>;
  stickyHeader?: boolean;
}
