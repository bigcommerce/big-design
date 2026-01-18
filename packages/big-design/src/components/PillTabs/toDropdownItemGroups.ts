import { DropdownItemGroup, DropdownProps } from '../Dropdown';
import { isDropdownItemGroupArray } from '../Dropdown/Dropdown';

type Items = DropdownProps['items'];

const toGroups = (items: Items): DropdownItemGroup[] =>
  isDropdownItemGroupArray(items) ? items : [{ items }];

interface ToDropDownItemGroupsParams {
  overflow: DropdownItemGroup[] | Items;
  custom: Items;
}

type ToDropDownItemGroups = (params: ToDropDownItemGroupsParams) => DropdownItemGroup[];

export const toDropdownItemGroups: ToDropDownItemGroups = ({ overflow, custom }) => {
  // Handle overflow: could be DropdownItemGroup[] from PillTabs groups or Items from flat usage
  const overflowGroups = isDropdownItemGroupArray(overflow) ? overflow : toGroups(overflow);

  const customGroups = toGroups(custom);

  const hasOverflowItems = overflowGroups.some(({ items }) => items.length > 0);

  return [
    ...overflowGroups,
    ...customGroups.map(({ separated, ...rest }, index) => ({
      ...rest,
      separated: separated || (index === 0 && hasOverflowItems),
    })),
  ].filter(({ items }) => items.length > 0);
};
