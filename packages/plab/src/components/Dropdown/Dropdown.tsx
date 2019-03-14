import { ControllerStateAndHelpers } from 'downshift';
import React from 'react';
import { Manager } from 'react-popper';

import { Downshift } from './Downshift/Downshift';
import { DropdownItem } from './Item/Item';
import { DropdownMenu } from './Menu/Menu';
import { DropdownTrigger } from './Trigger/Trigger';

export interface DropdownProps<Item> {
  onChange?(item: Item | null, value: string | string[] | number, extras: ControllerStateAndHelpers<Item>): void;
}

export class Dropdown extends React.PureComponent<DropdownProps<DropdownItem>> {
  static Item = DropdownItem;
  static Menu = DropdownMenu;
  static Trigger = DropdownTrigger;

  render() {
    const { children, onChange, ...props } = this.props;

    return (
      <Manager>
        <Downshift
          itemToString={item => (item && item.props.value ? item.props.value.toString() : '')}
          onChange={(selectedItem, { itemToString, ...rest }) => {
            return (
              selectedItem && onChange && onChange(selectedItem, itemToString(selectedItem), { itemToString, ...rest })
            );
          }}
          {...props}
        >
          {children}
        </Downshift>
      </Manager>
    );
  }
}
