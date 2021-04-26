import { SelectOption } from '../Select';

export interface Worksheet<Item extends WorksheetItem> {
  columns: Array<WorksheetTextColumn<Item> | WorksheetSelectableColumn<Item>>;
  items: Item[];
  onChange(items: Array<Cell<Item>>): void;
  onErrors?(items: Array<Cell<Item>>): void;
}

export type WorksheetColumn<Item> = WorksheetTextColumn<Item> | WorksheetSelectableColumn<Item>;

interface BaseColumn<Item> {
  hash: keyof Item;
  header: string;
  validation?(value: Item[keyof Item]): boolean;
}

interface WorksheetTextColumn<Item> extends BaseColumn<Item> {
  type?: 'text' | 'number';
}

export interface WorksheetSelectableColumn<Item> extends BaseColumn<Item> {
  options: SelectOption<unknown>[];
  type: 'select';
}

export interface Cell<Item> {
  columnIndex: number;
  hash: keyof Item;
  rowIndex: number;
  value: Item[keyof Item];
  type: Exclude<WorksheetTextColumn<Item>['type'] | WorksheetSelectableColumn<Item>['type'], undefined>;
}

export interface WorksheetItem {
  [key: string]: any;
}
