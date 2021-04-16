export interface Worksheet<Item extends WorksheetItem> {
  columns: WorksheetColumn<Item>[];
  items: Item[];
  onChange(items: Array<Cell<Item>>): void;
  onErrors?(items: Array<Cell<Item>>): void;
}

export interface WorksheetColumn<Item> {
  hash: keyof Item;
  header: string;
  type?: 'text' | 'number';
  validation?(value: Item[keyof Item]): boolean;
}

export interface Cell<Item> {
  columnIndex: number;
  hash: keyof Item;
  rowIndex: number;
  value: Item[keyof Item];
  type: 'text' | 'number';
}

export interface WorksheetItem {
  [key: string]: any;
}
