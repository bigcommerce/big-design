import { Placement } from 'popper.js';
import React, { memo } from 'react';
import { Popper, RefHandler } from 'react-popper';

import { StyledList } from './styled';
import { ListPopperElement } from './ListPopperElement';

interface Props {
  handleListRef: RefHandler;
  isOpen: boolean;
  maxHeight?: number;
  placement?: Placement;
  positionFixed?: boolean;
}

type ListProps = Props & React.HTMLAttributes<HTMLUListElement>;

export const List: React.FC<ListProps> = memo(
  ({
    children,
    className,
    handleListRef,
    isOpen,
    maxHeight = 250,
    placement: selectedPlacement = 'bottom-start' as 'bottom-start',
    positionFixed,
    style,
    ...rest
  }) => (
    <Popper
      innerRef={handleListRef}
      placement={selectedPlacement}
      positionFixed={positionFixed}
      modifiers={{ offset: { offset: '0, 10' } }}
      eventsEnabled={isOpen}
    >
      {({ placement, ref, scheduleUpdate, style: popperStyle }) => (
        <StyledList
          data-placement={placement}
          isOpen={isOpen}
          maxHeight={maxHeight}
          ref={ref}
          style={popperStyle}
          tabIndex={-1}
          {...rest}
        >
          <ListPopperElement isOpen={isOpen} scheduleUpdate={scheduleUpdate}>
            {children}
          </ListPopperElement>
        </StyledList>
      )}
    </Popper>
  ),
);

List.displayName = 'List';
