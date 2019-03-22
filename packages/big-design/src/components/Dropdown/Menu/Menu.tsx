import { Placement } from 'popper.js';
import React from 'react';
import { Popper } from 'react-popper';

import { withDownshift } from '../Downshift/Downshift';

import { StyledDropdownMenu } from './styled';

export interface DropdownMenuProps {
  children: React.ReactNode;
  maxHeight?: number;
  placement?: Placement;
}

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
            <StyledDropdownMenu maxHeight={maxHeight} {...getMenuProps(rest, { suppressRefError })}>
              {children}
            </StyledDropdownMenu>
          </div>
        )
      }
    </Popper>
  ),
);

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { children, maxHeight, placement, ...rest } = props;

  return (
    <Menu maxHeight={maxHeight} placement={placement} {...rest}>
      {children}
    </Menu>
  );
};
