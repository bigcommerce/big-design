export interface Worksheet<Item> {
  columns: WorksheetColumn[];
  items: Item[];
  onChange(items: Array<Cell<Item[keyof Item]>>): void;
  onErrors?(items: Array<Cell<Item[keyof Item]>>): void;
}

export interface WorksheetColumn {
  hash: string;
  header: string;
  type?: 'text' | 'number';
  validation?(value: string | number): boolean; // Will only return string or number as value
}

export interface Cell<Value> {
  columnIndex: number;
  hash: string;
  rowIndex: number;
  value: Value;
  type: Exclude<WorksheetColumn['type'], undefined>;
}
