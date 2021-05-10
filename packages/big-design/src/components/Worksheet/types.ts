import React from 'react';

import { SelectOption } from '../Select';

export interface Worksheet<Item extends WorksheetItem> {
  columns: Array<WorksheetColumn<Item>>;
  items: Item[];
  onChange(items: Array<Cell<Item>>): void;
  onErrors?(items: WorksheetError<Item>[]): void;
}

export interface WorksheetError<Item extends WorksheetItem> {
  item: Item;
  errors: (keyof Item)[];
}

export type WorksheetColumn<Item> =
  | WorksheetBaseColumn<Item>
  | WorksheetSelectableColumn<Item>
  | WorksheetModalColumn<Item>;

interface WorksheetBaseColumn<Item> {
  hash: keyof Item;
  header: string;
  type?: 'text' | 'number' | 'checkbox';
  validation?(value: Item[keyof Item]): boolean;
}

export interface WorksheetSelectableColumn<Item> extends Omit<WorksheetBaseColumn<Item>, 'type'> {
  options: SelectOption<unknown>[];
  type: 'select';
}

export interface WorksheetModalColumn<Item> extends Omit<WorksheetBaseColumn<Item>, 'type'> {
  config: {
    header?: string;
    render(
      value: Item[keyof Item],
      onChange: (value: Item[keyof Item]) => void,
    ): React.ComponentType<Item> | React.ReactElement;
  };
  type: 'modal';
}

export interface WorksheetRenderProps<Item> {
  value: Item[keyof Item];
  onChange: (value: Item[keyof Item]) => void;
}

export interface Cell<Item> {
  columnIndex: number;
  hash: keyof Item;
  rowIndex: number;
  value: Item[keyof Item];
  type: Exclude<
    WorksheetColumn<Item>['type'] | WorksheetSelectableColumn<Item>['type'] | WorksheetModalColumn<Item>['type'],
    undefined
  >;
}

export interface WorksheetItem {
  [key: string]: any;
}
