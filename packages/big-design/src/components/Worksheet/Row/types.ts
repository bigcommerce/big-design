import { WorksheetColumn } from '../types';

export interface RowProps {
  rowIndex: number;
  row: unknown;
  columns: WorksheetColumn[];
}
