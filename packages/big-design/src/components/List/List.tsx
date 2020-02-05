import { Placement } from 'popper.js';
import React, { memo, useMemo } from 'react';
import { Popper } from 'react-popper';

import { StyledList } from './styled';
import { ListPopperElement } from './ListPopperElement';

interface Props {
  handleListRef: React.RefObject<HTMLUListElement>;
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
  }) => {
    const modifiers = useMemo(() => ({ offset: { offset: '0, 10' } }), []);

    return (
      <Popper
        innerRef={handleListRef}
        placement={selectedPlacement}
        positionFixed={positionFixed}
        modifiers={modifiers}
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
    );
  },
);

List.displayName = 'List';
