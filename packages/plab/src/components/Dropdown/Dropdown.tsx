import { ControllerStateAndHelpers } from 'downshift';
import { Placement } from 'popper.js';
import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { Button } from '../Button';

import { StyledDropdown } from './styled';
import { withDownshift, Downshift } from './Downshift/Downshift';
import { DropdownItem } from './Item/Item';

export interface DropdownProps<Item> {
  maxHeight?: number;
  placement?: Placement;
  onChange?(item: Item | null, value: string | string[] | number, extras: ControllerStateAndHelpers<Item>): void;
}

export interface DropdownToggleProps {
  component: typeof Button;
}

const Toggle = withDownshift(
  'toggle',
  ({ downshift: { getToggleButtonProps }, component: ToggleComponent, ...rest }) => (
    <Reference>
      {({ ref }) => (
        <ToggleComponent {...getToggleButtonProps(rest)} ref={ref}>
          Open
        </ToggleComponent>
      )}
    </Reference>
  ),
);

const Menu = withDownshift(
  'menu',
  ({
    downshift: { isOpen, getMenuProps },
    children,
    maxHeight,
    placement: selectedPlacement,
    suppressRefError,
    ...rest
  }) => (
    <Popper placement={selectedPlacement} modifiers={{ offset: { offset: '0, 10' } }}>
      {({ placement, ref, style }) =>
        isOpen && (
          <div ref={ref} style={style} data-placement={placement}>
            <StyledDropdown maxHeight={maxHeight} {...getMenuProps(rest, { suppressRefError })}>
              {children}
            </StyledDropdown>
          </div>
        )
      }
    </Popper>
  ),
);

export class Dropdown extends React.PureComponent<DropdownProps<DropdownItem>> {
  static Item = DropdownItem;

  render() {
    const { children, maxHeight, onChange, placement, ...props } = this.props;

    return (
      <Manager>
        <Downshift
          itemToString={item => (item && item.props.value ? item.props.value.toString() : '')}
          onChange={(selectedItem, { itemToString, ...rest }) => {
            return (
              selectedItem && onChange && onChange(selectedItem, itemToString(selectedItem), { itemToString, ...rest })
            );
          }}
        >
          <Toggle component={Button} />
          <Menu maxHeight={maxHeight} placement={placement} {...props}>
            {children}
          </Menu>
        </Downshift>
      </Manager>
    );
  }
}
