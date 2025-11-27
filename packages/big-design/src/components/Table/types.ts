import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { MarginProps } from '../../helpers';
import { OffsetPaginationProps } from '../OffsetPagination';
import { StatelessPaginationProps } from '../StatelessPagination';

import { TableColumnDisplayProps } from './helpers';

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
  isAction?: boolean;
}

type WithoutMarginProps<T> = Omit<T, keyof MarginProps>;

type StatelessPaginationPropsWithItemTotal = StatelessPaginationProps & { totalItems?: number };

export type DiscriminatedTablePaginationProps =
  | (WithoutMarginProps<OffsetPaginationProps> & { type: 'offset' })
  | (WithoutMarginProps<StatelessPaginationPropsWithItemTotal> & { type: 'stateless' });

export type TablePaginationProps =
  | WithoutMarginProps<OffsetPaginationProps>
  | WithoutMarginProps<StatelessPaginationPropsWithItemTotal>;

interface Localization {
  ascendingOrder: string;
  descendingOrder: string;
}

export interface TableProps<T> extends ComponentPropsWithoutRef<'table'> {
  actions?: React.ReactNode;
  columns: Array<TableColumn<T>>;
  emptyComponent?: React.ReactElement;
  headerless?: boolean;
  itemName?: string;
  items: T[];
  keyField?: string;
  localization?: Localization;
  onRowDrop?(from: number, to: number): void;
  pagination?: TablePaginationProps;
  selectable?: TableSelectable<T>;
  sortable?: TableSortable<T>;
  stickyHeader?: boolean;
}
