import { OnItemSelectFn } from '../hooks';
import { TableSelectable } from '../types';

interface UseRowStateProps<T> {
  childRowIndex?: number;
  childrenRows: T[];
  isExpandable: boolean;
  isParentRow: boolean;
  isSelected?: boolean;
  selectedItems: TableSelectable['selectedItems'];
  onExpandedRow?(parentRowIndex: number | null): void;
  onItemSelect?: OnItemSelectFn;
  parentRowIndex: number;
}

export const useRowState = <T>({
  childRowIndex,
  childrenRows,
  isExpandable,
  isParentRow,
  isSelected,
  selectedItems,
  onExpandedRow,
  onItemSelect,
  parentRowIndex,
}: UseRowStateProps<T>) => {
  const onChange = () => {
    if (onItemSelect) {
      onItemSelect({
        childRowIndex: childRowIndex ?? null,
        childrenRows,
        isParentRow,
        isExpandable,
        parentRowIndex,
      });
    }
  };

  const onExpandedChange = () => {
    if (onExpandedRow) {
      onExpandedRow(parentRowIndex ?? null);
    }
  };

  const hasChildrenRows = childrenRows.length > 0;

  const allChildrenRowsSelected =
    isExpandable &&
    childrenRows.every((_childRow, childRowIndex) => {
      return selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined;
    });

  const someChildrenRowsSelected =
    isExpandable &&
    childrenRows.some((_childRow, childRowIndex) => {
      return selectedItems[`${parentRowIndex}.${childRowIndex}`] !== undefined;
    });

  const label = isSelected ? `Selected` : `Unselected`;

  const isChecked = isExpandable && hasChildrenRows ? allChildrenRowsSelected : isSelected;
  const isIndeterminate = isExpandable && hasChildrenRows ? someChildrenRowsSelected : undefined;

  return {
    hasChildrenRows,
    isChecked,
    isIndeterminate,
    label,
    onChange,
    onExpandedChange,
  };
};
