import { TableExpandable, TableSelectable } from '../types';

import {
  areAllInPageSelected,
  areSomeInPageSelected,
  getTotalSelectedItems,
  selectAll,
} from './helpers';

interface useSelectAllStateProps<T> {
  isExpandable: boolean;
  items: T[];
  selectedItems: TableSelectable['selectedItems'];
  expandedRowSelector?: TableExpandable<T>['expandedRowSelector'];
  onChange?: TableSelectable['onSelectionChange'];
}

export const useSelectAllState = <T>({
  expandedRowSelector,
  isExpandable,
  items,
  selectedItems,
  onChange,
}: useSelectAllStateProps<T>) => {
  const allInPageSelected = areAllInPageSelected({
    expandedRowSelector,
    isExpandable,
    items,
    selectedItems,
  });

  const someInPageSelected = areSomeInPageSelected({
    expandedRowSelector,
    isExpandable,
    items,
    selectedItems,
  });

  const totalSelectedItems = getTotalSelectedItems(items, selectedItems);
  const label = allInPageSelected ? 'Deselect All' : 'Select All';

  const handleSelectAll = () => {
    if (typeof onChange !== 'function') {
      return;
    }

    if (allInPageSelected) {
      return onChange({});
    }

    const newSelectedItems = selectAll({
      expandedRowSelector,
      isExpandable,
      items,
    });

    return onChange(newSelectedItems);
  };

  return {
    allInPageSelected,
    handleSelectAll,
    label,
    someInPageSelected,
    totalSelectedItems,
  };
};
