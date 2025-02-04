import { Colors } from '@bigcommerce/big-design-theme';
import React, { KeyboardEventHandler, ReactEventHandler, RefObject } from 'react';

import { SelectOption } from '../Select';

export type ExpandableRows = Record<string, Array<string | number>>;

export type DisabledRows = Array<string | number>;

export interface WorksheetLocalization {
  toggleRowExpanded: string;
}

export interface WorksheetProps<Item extends WorksheetItem> {
  columns: Array<WorksheetColumn<Item>>;
  items: Item[];
  expandableRows?: ExpandableRows;
  defaultExpandedRows?: Array<string | number>;
  disabledRows?: DisabledRows;
  localization?: WorksheetLocalization;
  minWidth?: number;
  onChange(items: Item[]): void;
  onErrors?(items: Array<WorksheetError<Item>>): void;
}

export interface WorksheetError<Item extends WorksheetItem> {
  item: Item;
  errors: Array<keyof Item>;
}

export interface NotationConfig {
  color: keyof Colors;
  description: string;
}

interface CellActionConfig {
  transform: (value: number | string) => string;
  icon: React.ReactNode;
}

export type WorksheetColumn<Item> =
  | WorksheetTextColumn<Item>
  | WorksheetNumberColumn<Item>
  | WorksheetCheckboxColumn<Item>
  | WorksheetSelectableColumn<Item>
  | WorksheetModalColumn<Item>;

export type InternalWorksheetColumn<Item> =
  | WorksheetTextColumn<Item>
  | WorksheetNumberColumn<Item>
  | WorksheetCheckboxColumn<Item>
  | WorksheetSelectableColumn<Item>
  | WorksheetModalColumn<Item>
  | WorksheetToggleColumn<Item>;

interface WorksheetBaseColumn<Item> {
  disabled?: boolean;
  enabled?: boolean;
  hash: keyof Item;
  header: string;
  width?: string | number;
  tooltip?: string;
  validation?(value: Item[keyof Item] | ''): boolean;
  notation?(value: Item[keyof Item] | '', row: WorksheetItem): NotationConfig | undefined;
}

export interface WorksheetTextColumn<Item> extends WorksheetBaseColumn<Item> {
  type?: 'text';
  formatting?(value: Item[keyof Item] | ''): string;
  action?: CellActionConfig;
}

export interface WorksheetNumberColumn<Item> extends WorksheetBaseColumn<Item> {
  type: 'number';
  formatting?(value: Item[keyof Item] | ''): string;
  action?: CellActionConfig;
}

export interface WorksheetCheckboxColumn<Item> extends WorksheetBaseColumn<Item> {
  type: 'checkbox';
}

export interface WorksheetSelectableColumn<Item> extends WorksheetBaseColumn<Item> {
  config: {
    options: Array<SelectOption<unknown>>;
  };
  type: 'select' | 'multiSelect';
}

export interface WorksheetModalColumn<Item> extends WorksheetBaseColumn<Item> {
  config: {
    cancelActionText?: string;
    header?: string;
    render(value: Item[keyof Item], onChange: (value: Item[keyof Item]) => void): React.ReactNode;
    saveActionText?: string;
  };
  formatting?(value: Item[keyof Item] | ''): string;
  type: 'modal';
}

export interface WorksheetToggleColumn<Item> extends WorksheetBaseColumn<Item> {
  type: 'toggle';
}

export interface Cell<Item> {
  columnIndex: number;
  disabled?: boolean;
  hash: keyof Item;
  hidden?: boolean;
  rowIndex: number;
  type: Exclude<InternalWorksheetColumn<Item>['type'], undefined>;
  value: Item[keyof Item] | '';
}

export interface InternalTableInterface {
  hasExpandableRows: boolean;
  hasStaticWidth: boolean;
  minWidth?: number;
  onKeyDown?: KeyboardEventHandler | undefined;
  onKeyUp?: ReactEventHandler | undefined;
  tableRef: RefObject<HTMLTableElement>;
}

export type WorksheetItem = Record<string, any>;
