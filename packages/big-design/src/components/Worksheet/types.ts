export interface WorksheetColumn {
  hash: string;
  header: string;
  type?: 'text';
}

export interface WorksheetProps<T> {
  columns: WorksheetColumn[];
  items: T[];
  onChange(items: Cell[]): void;
}

export interface Cell {
  columnIndex: number;
  hash: string;
  rowIndex: number;
  value: string | number;
  type?: 'text';
}
