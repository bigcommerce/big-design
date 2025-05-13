import { DropdownItemGroup, DropdownProps } from '../Dropdown';
import { isDropdownItemGroupArray } from '../Dropdown/Dropdown';

type Items = DropdownProps['items'];

const toGroups = (items: Items): DropdownItemGroup[] =>
  isDropdownItemGroupArray(items) ? items : [{ items }];

type ToDropDownItemGroups = (items: { overflow: Items; custom: Items }) => DropdownItemGroup[];

export const toDropdownItemGroups: ToDropDownItemGroups = ({ overflow, custom }) => {
  const overflowGroups = toGroups(overflow);
  const customGroups = toGroups(custom);

  return [
    ...overflowGroups,
    ...customGroups.map(({ separated, ...rest }, index) => ({
      ...rest,
      separated: separated || (index === 0 && overflow.length > 0),
    })),
  ].filter(({ items }) => items.length > 0);
};
