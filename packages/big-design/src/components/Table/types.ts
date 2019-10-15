import { ReactNode } from 'react';

import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

export interface TableSelectable<T> {
  itemType?: string;
  selectedItems: T[];
  onSelectionChange(selectedItems: T[]): void;
}

export interface TableItem {
  id?: string | number;
  [key: string]: any;
}

export interface TableColumn<T> {
  render: React.ComponentType<T> | ((props: T & { children?: ReactNode }, context?: any) => string | number);
  header: string;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'center';
  width?: number | string;
  withPadding?: boolean;
}

export type TablePagination = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement>, MarginProps {
  columns: Array<TableColumn<T>>;
  items: T[];
  keyField?: string;
  pagination?: TablePagination;
  selectable?: TableSelectable<T>;
  stickyHeader?: boolean;
}
