import { RowProps } from '../Row';

interface CalculateColSpanArg<T> {
  columns: RowProps<T>['columns'];
  isExpandable?: RowProps<T>['isExpandable'];
  isDraggable?: RowProps<T>['isDraggable'];
  isSelectable?: RowProps<T>['isSelectable'];
}

export const calculateColSpan = <T>({
  columns,
  isExpandable,
  isDraggable,
  isSelectable,
}: CalculateColSpanArg<T>) => {
  let totalColSpans = columns.length;

  if (isExpandable) {
    totalColSpans += 1;
  }

  if (isDraggable) {
    totalColSpans += 1;
  }

  if (isSelectable) {
    totalColSpans += 1;
  }

  return totalColSpans;
};
