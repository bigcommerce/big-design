import React, { ComponentType, ReactNode, TableHTMLAttributes } from 'react';

import { MarginProps } from '../../mixins';
import { PaginationProps } from '../Pagination';

import { TableColumnDisplayProps } from './mixins';

export interface TableSelectable {
  selectedItems: Record<string, true>;
  onSelectionChange(selectedItems: Record<string, true>): void;
}

export interface TableExpandable<T> {
  expandedRows: Record<string, true>;
  expandedRowSelector: (item: T) => T[] | undefined;
  onExpandedChange(expandedItems: Record<string, true>, expandedIndex: number): void;
  renderHelperRow?:
    | ComponentType<{ parentRowIndex: number; children?: ReactNode }>
    | ((props: { parentRowIndex: number; children?: ReactNode }, context?: any) => ReactNode);
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

export interface TableColumn<T> extends TableColumnDisplayProps {
  align?: 'left' | 'center' | 'right';
  hash: string;
  header: string;
  tooltip?: string;
  hideHeader?: boolean;
  isSortable?: boolean;
  render:
    | React.ComponentType<T & { children?: ReactNode }>
    | ((props: T & { children?: ReactNode }, context?: any) => string | number);
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withPadding?: boolean;
}

export type TablePaginationProps = Omit<PaginationProps, keyof MarginProps>;

export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  actions?: React.ReactNode;
  columns: Array<TableColumn<T>>;
  emptyComponent?: React.ReactElement;
  expandable?: TableExpandable<T>;
  headerless?: boolean;
  itemName?: string;
  items: T[];
  keyField?: string;
  onRowDrop?(from: number, to: number): void;
  pagination?: TablePaginationProps;
  selectable?: TableSelectable;
  sortable?: TableSortable<T>;
  stickyHeader?: boolean;
}
