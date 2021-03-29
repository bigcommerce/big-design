export interface WorksheetColumn {
  hash: string;
  header: string;
  type?: 'text';
  validation?(value: string | number): boolean;
}

export interface WorksheetProps<T> {
  columns: WorksheetColumn[];
  items: T[];
  onChange(items: Cell[]): void;
  onErrors?(items: Cell[]): void;
}

export interface Cell {
  columnIndex: number;
  hash: string;
  rowIndex: number;
  value: string | number;
  type?: 'text';
}
