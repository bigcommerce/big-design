import React from 'react';

import { SelectOption } from '../Select';

export interface ExpandableRows {
  [key: string]: Array<string | number>;
}

export interface WorksheetProps<Item extends WorksheetItem> {
  columns: Array<WorksheetColumn<Item>>;
  items: Item[];
  expandableRows?: ExpandableRows;
  onChange(items: Array<Item>): void;
  onErrors?(items: WorksheetError<Item>[]): void;
}

export interface WorksheetError<Item extends WorksheetItem> {
  item: Item;
  errors: (keyof Item)[];
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
  hash: keyof Item;
  header: string;
  validation?(value: Item[keyof Item]): boolean;
}

export interface WorksheetTextColumn<Item> extends WorksheetBaseColumn<Item> {
  type?: 'text';
  formatting?(value: Item[keyof Item]): string;
}

export interface WorksheetNumberColumn<Item> extends WorksheetBaseColumn<Item> {
  type: 'number';
  formatting?(value: Item[keyof Item]): string;
}

export interface WorksheetCheckboxColumn<Item> extends WorksheetBaseColumn<Item> {
  type: 'checkbox';
}

export interface WorksheetSelectableColumn<Item> extends WorksheetBaseColumn<Item> {
  config: {
    options: SelectOption<unknown>[];
  };
  type: 'select';
}

export interface WorksheetModalColumn<Item> extends WorksheetBaseColumn<Item> {
  config: {
    cancelActionText?: string;
    header?: string;
    render(
      value: Item[keyof Item],
      onChange: (value: Item[keyof Item]) => void,
    ): React.ComponentType<Item> | React.ReactElement;
    saveActionText?: string;
  };
  formatting?(value: Item[keyof Item]): string;
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
  value: Item[keyof Item];
}

export interface WorksheetItem {
  [key: string]: any;
}
