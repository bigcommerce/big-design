export interface Worksheet<Item> {
  columns: WorksheetColumn<Item[keyof Item]>[];
  items: Item[];
  onChange(items: Array<Cell<Item[keyof Item]>>): void;
  onErrors?(items: Array<Cell<Item[keyof Item]>>): void;
}

export interface WorksheetColumn<Value> {
  hash: string;
  header: string;
  type?: 'text' | 'number';
  validation?(value: Value): boolean;
}

export interface Cell<Value> {
  columnIndex: number;
  hash: string;
  rowIndex: number;
  value: Value;
  type?: WorksheetColumn<Value>['type'];
}
