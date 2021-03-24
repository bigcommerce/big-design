export interface WorksheetColumn {
  hash: string;
  header: string;
  type?: 'text';
}

export interface WorksheetProps<T> {
  columns: WorksheetColumn[];
  items: T[];
  onChange(items: T[]): void;
}
