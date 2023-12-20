import { TableSelectable } from '../types';

interface UseRowStateProps {
  isParentRow: boolean;
  isSelected?: boolean;
  selectedItems: TableSelectable['selectedItems'];
  onExpandedRow?(parentRowId: string | undefined): void;
  isChildrenRowsSelectable: boolean;
  childrenRowsIds: string[];
}

export const useRowState = ({
  isParentRow,
  isSelected,
  selectedItems,
  isChildrenRowsSelectable,
  childrenRowsIds,
}: UseRowStateProps) => {
  const hasChildrenRows = Boolean(childrenRowsIds.length);

  const allChildrenRowsSelected =
    isChildrenRowsSelectable &&
    hasChildrenRows &&
    childrenRowsIds.every((childRowId) => {
      return selectedItems[childRowId] !== undefined;
    });

  const someChildrenRowsSelected =
    isChildrenRowsSelectable &&
    hasChildrenRows &&
    childrenRowsIds.some((childRowId) => {
      return selectedItems[childRowId] !== undefined;
    });

  const isRowChecked = () => {
    if (isParentRow) {
      return isChildrenRowsSelectable && hasChildrenRows ? allChildrenRowsSelected : isSelected;
    }

    return isSelected;
  };

  const isRowIndeterminate = () => {
    if (isParentRow) {
      return isChildrenRowsSelectable && hasChildrenRows ? someChildrenRowsSelected : false;
    }

    return false;
  };

  const isChecked = isRowChecked();

  const isIndeterminate = isRowIndeterminate();

  const label = isSelected ? `Selected` : `Unselected`;

  return {
    hasChildrenRows,
    isChecked,
    isIndeterminate,
    label,
  };
};
