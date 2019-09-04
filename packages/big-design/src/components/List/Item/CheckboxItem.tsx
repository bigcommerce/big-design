import React, { memo, Ref } from 'react';

import { Checkbox } from '../../Checkbox';

import { StyledListItem } from './styled';

export interface ListCheckboxItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  checked?: boolean;
  disabled?: boolean;
  onCheckboxChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

const StyleableListCheckboxItem: React.FunctionComponent<ListCheckboxItemProps & PrivateProps> = memo(
  ({ children, checked, disabled, forwardedRef, value, onCheckboxChange, ...rest }) => (
    <StyledListItem disabled={disabled} onMouseDown={preventFocus} ref={forwardedRef} tabIndex={-1} {...rest}>
      <Checkbox
        checked={checked}
        data-value={value}
        disabled={disabled}
        label={typeof children === 'string' ? children : ''}
        onChange={onCheckboxChange}
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
