import { DownshiftProps } from 'downshift';
import { Placement } from 'popper.js';
import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';

import { Button } from '../Button';

import { StyledDropdown } from './styled';
import { withDownshift, Downshift } from './Downshift/Downshift';
import { DropdownItem } from './Item/Item';

export interface DropdownProps {
  maxHeight?: number;
  placement?: Placement;
  onChange?: DownshiftProps<DropdownItem>['onChange'];
}

export interface DropdownToggleProps {
  component: typeof Button;
}

const Toggle = withDownshift('toggle', ({ downshift: { getToggleButtonProps }, component: Comp, ...rest }) => (
  <Reference>
    {({ ref }) => (
      <Comp {...getToggleButtonProps(rest)} ref={ref}>
        Open
      </Comp>
    )}
  </Reference>
));

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

export class Dropdown extends React.PureComponent<DropdownProps> {
  static Item = DropdownItem;

  render() {
    const { children, maxHeight, onChange, placement } = this.props;

    return (
      <Manager>
        <Downshift
          itemToString={item => (item && item.props.value ? item.props.value.toString() : '')}
          onChange={onChange}
        >
          <Toggle component={Button} />
          <Menu maxHeight={maxHeight} placement={placement}>
            {children}
          </Menu>
        </Downshift>
      </Manager>
    );
  }
}
