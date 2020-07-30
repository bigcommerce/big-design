import React, { forwardRef, LiHTMLAttributes, memo, Ref } from 'react';

import { Checkbox, CheckboxProps } from '../../Checkbox';

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

const StyleableListCheckboxItem: React.FC<
  ListItemCheckboxProps & Pick<CheckboxProps, 'label' | 'description'> & PrivateProps
> = ({ checked, disabled, description, forwardedRef, label, ...props }) => {
  return (
    <StyledListItem {...props} actionType="normal" isSelected={false} disabled={disabled} ref={forwardedRef}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        description={description}
        label={label}
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
  forwardRef<HTMLLIElement, ListCheckboxItemProps & Pick<CheckboxProps, 'label' | 'description'>>((props, ref) => (
    <StyleableListCheckboxItem {...props} forwardedRef={ref} />
  )),
);
