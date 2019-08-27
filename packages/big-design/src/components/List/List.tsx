import { Placement } from 'popper.js';
import React from 'react';
import { Popper, RefHandler } from 'react-popper';

import { StyledList } from './styled';
import { ListPopperValidation } from './ListPopperValidation';

interface Props {
  handleListRef: RefHandler;
  isOpen: boolean;
  maxHeight?: number;
  placement?: Placement;
}

type ListProps = Props & React.HTMLAttributes<HTMLUListElement>;

export class List extends React.PureComponent<ListProps> {
  static defaultProps: Partial<Props> = {
    maxHeight: 250,
    placement: 'bottom-start',
  };

  render() {
    const { children, handleListRef, isOpen, maxHeight, placement: selectedPlacement, ...rest } = this.props;

    return (
      <Popper innerRef={handleListRef} placement={selectedPlacement} modifiers={{ offset: { offset: '0, 10' } }}>
        {({ placement, ref, scheduleUpdate, style }) => (
          <StyledList
            data-placement={placement}
            isOpen={isOpen}
            maxHeight={maxHeight}
            ref={ref}
            style={style}
            tabIndex={-1}
            {...rest}
          >
            <ListPopperValidation isOpen={isOpen} scheduleUpdate={scheduleUpdate}>
              {children}
            </ListPopperValidation>
          </StyledList>
        )}
      </Popper>
    );
  }
}
