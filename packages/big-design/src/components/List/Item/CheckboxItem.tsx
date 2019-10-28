import React, { memo, Ref } from 'react';

import { Checkbox } from '../../Checkbox';

import { StyledListItem } from './styled';

export interface ListCheckboxItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onClick'> {
  checked?: boolean;
  disabled?: boolean;
  onClick?(): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListCheckboxItem: React.FunctionComponent<ListCheckboxItemProps & PrivateProps> = memo(
  ({ children, checked, className, disabled, forwardedRef, onClick, style, value, ...rest }) => (
    <StyledListItem
      {...rest}
      actionType="normal"
      disabled={disabled}
      onClick={event => {
        event.stopPropagation();
        event.preventDefault();
        if (onClick) {
          onClick();
        }
      }}
      onMouseDown={preventFocus}
      ref={forwardedRef}
      tabIndex={-1}
    >
      <Checkbox
        checked={checked}
        disabled={disabled}
        label={typeof children === 'string' ? children : ''}
        onChange={onClick}
      />
    </StyledListItem>
  ),
);

function preventFocus(
  event: React.MouseEvent<HTMLLIElement, MouseEvent> | React.MouseEvent<HTMLInputElement, MouseEvent>,
) {
  event.preventDefault();
}

export const ListCheckboxItem = React.forwardRef<HTMLLIElement, ListCheckboxItemProps>((props, ref) => (
  <StyleableListCheckboxItem {...props} forwardedRef={ref} />
));
