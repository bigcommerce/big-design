export interface WorksheetColumn {
  key: string;
  name: string;
}

export interface WorksheetProps<T> {
  columns: WorksheetColumn[];
  data: T[];
}
