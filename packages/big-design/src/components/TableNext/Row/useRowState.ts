import { OnItemSelectFn } from '../hooks';

interface UseRowStateProps<T> {
  childRowIndex?: number;
  childrenRows?: T[];
  isParentRow: boolean;
  isSelected?: boolean;
  onExpandedRow?(parentRowIndex: number | null): void;
  onItemSelect?: OnItemSelectFn;
  parentRowIndex: number;
}

export const useRowState = <T>({
  childrenRows,
  isParentRow,
  isSelected,
  onExpandedRow,
  onItemSelect,
  parentRowIndex,
}: UseRowStateProps<T>) => {
  const onChange = () => {
    if (onItemSelect) {
      onItemSelect({
        isParentRow,
        parentRowIndex,
      });
    }
  };

  const onExpandedChange = () => {
    if (onExpandedRow) {
      onExpandedRow(parentRowIndex ?? null);
    }
  };

  const hasChildrenRows = Array.isArray(childrenRows);

  const label = isSelected ? `Selected` : `Unselected`;

  return {
    hasChildrenRows,
    isChecked: isSelected,
    label,
    onChange,
    onExpandedChange,
  };
};
