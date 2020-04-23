import React, { forwardRef, LiHTMLAttributes, memo, Ref } from 'react';

import { Checkbox } from '../../Checkbox';

import { StyledListItem } from './styled';

export interface ListCheckboxItemProps extends LiHTMLAttributes<HTMLLIElement> {
  checked?: boolean;
  disabled?: boolean;
  isHighlighted: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLLIElement>;
}

export interface ListItemCheckboxProps extends LiHTMLAttributes<HTMLLIElement> {
  disabled?: boolean;
  checked?: boolean;
  isHighlighted: boolean;
}

const StyleableListCheckboxItem: React.FC<ListItemCheckboxProps & PrivateProps> = ({
  checked,
  children,
  disabled,
  forwardedRef,
  ...props
}) => {
  return (
    <StyledListItem {...props} actionType="normal" isSelected={false} disabled={disabled} ref={forwardedRef}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        label={typeof children === 'string' ? children : ''}
        onChange={() => null}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        tabIndex={-1}
      />
    </StyledListItem>
  );
};

export const ListItemCheckbox = memo(
  forwardRef<HTMLLIElement, ListCheckboxItemProps>((props, ref) => (
    <StyleableListCheckboxItem {...props} forwardedRef={ref} />
  )),
);
