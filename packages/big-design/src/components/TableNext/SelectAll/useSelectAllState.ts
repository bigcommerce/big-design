import { areAllInPageSelected, areSomeInPageSelected, getSelectAllState } from './helpers';
import { SelectAllProps } from './SelectAll';

export const useSelectAllState = <T>(props: SelectAllProps<T>) => {
  const { onChange } = props;

  const allInPageSelected = areAllInPageSelected(props);
  const someInPageSelected = areSomeInPageSelected(props);
  const totalSelectedItems = props.selectedParentRowsCrossPages.size;
  const label = allInPageSelected ? 'Deselect All' : 'Select All';

  const handleSelectAll = () => {
    if (typeof onChange !== 'function') {
      return;
    }

    const newSelectedItems = getSelectAllState(props);

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
