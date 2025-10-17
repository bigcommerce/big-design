import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

import { MarginProps } from '../../helpers';
import { OffsetPaginationProps } from '../OffsetPagination';
import { StatelessPaginationProps } from '../StatelessPagination';

import { TableColumnDisplayProps } from './helpers';

export interface TableSelectable {
  selectedItems: Record<string, true>;
  onSelectionChange(selectedItems: Record<string, true>): void;
  isChildrenRowsSelectable?: boolean;
  initialSelectedParentRows?: string[];
}
export interface LoadMoreAction {
  isLoading: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, parentRowIndex: number) => void;
  text: string;
}

type LoadMoreActionCallback = (parentRowId: string) => LoadMoreAction | undefined;

export interface TableExpandable<T> {
  expandedRows: Record<string, true>;
  getChildren: (item: T) => T[] | undefined;
  onExpandedChange(expandedRows: Record<string, true>, expandedRowId: string): void;
  getLoadMoreAction?: LoadMoreActionCallback;
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

type WithoutMarginProps<T> = Omit<T, keyof MarginProps>;

type StatelessPaginationPropsWithItemTotal = StatelessPaginationProps & { totalItems?: number };

export type DiscriminatedTablePaginationProps =
  | (WithoutMarginProps<OffsetPaginationProps> & { type: 'offset' })
  | (WithoutMarginProps<StatelessPaginationPropsWithItemTotal> & { type: 'stateless' });

export type TablePaginationProps =
  | WithoutMarginProps<OffsetPaginationProps>
  | WithoutMarginProps<StatelessPaginationPropsWithItemTotal>;

export interface Localization {
  ascendingOrder?: string;
  descendingOrder?: string;
  controlsLabel?: string;
}

export interface TableProps<T> extends ComponentPropsWithoutRef<'table'> {
  actions?: React.ReactNode;
  columns: Array<TableColumn<T>>;
  emptyComponent?: React.ReactElement;
  expandable?: TableExpandable<T>;
  headerless?: boolean;
  itemName?: string;
  items: T[];
  keyField?: string;
  localization?: Localization;
  onRowDrop?(from: number, to: number): void;
  pagination?: TablePaginationProps;
  selectable?: TableSelectable;
  sortable?: TableSortable<T>;
  stickyHeader?: boolean;
  getRowId?: (item: T, parentRowIndex: number, childRowIndex?: number) => string;
}
