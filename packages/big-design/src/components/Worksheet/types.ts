import { SelectOption } from '../Select';

export interface Worksheet<Item extends WorksheetItem> {
  columns: Array<WorksheetColumn<Item>>;
  items: Item[];
  onChange(items: Array<Cell<Item>>): void;
  onErrors?(items: Array<Cell<Item>>): void;
}

export type WorksheetColumn<Item> = WorksheetBaseColumn<Item> | WorksheetSelectableColumn<Item>;

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

export interface Cell<Item> {
  columnIndex: number;
  hash: keyof Item;
  rowIndex: number;
  value: Item[keyof Item];
  type: Exclude<WorksheetColumn<Item>['type'] | WorksheetSelectableColumn<Item>['type'], undefined>;
}

export interface WorksheetItem {
  [key: string]: any;
}
