import React, { forwardRef, memo, Ref } from 'react';

import { Flex } from '..';
import { useUniqueId } from '../../hooks';

import { HiddenCheckbox, StyledToggleLabel } from './styled';

export type ToggleProps = React.InputHTMLAttributes<HTMLInputElement>;

export type ToggleLabelProps = {
  checked?: boolean;
  disabled?: boolean;
};

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export const RawToggle: React.FC<ToggleProps & PrivateProps> = ({ checked, disabled, forwardedRef, ...props }) => {
  const uniqueCheckboxId = useUniqueId('checkbox');
  const id = props.id ? props.id : uniqueCheckboxId;

  return (
    <Flex>
      <HiddenCheckbox id={id} type="checkbox" checked={checked} disabled={disabled} {...props} ref={forwardedRef} />
      <StyledToggleLabel aria-hidden={true} disabled={disabled} htmlFor={id} checked={checked} />
    </Flex>
  );
};

export const Toggle = memo(
  forwardRef<HTMLInputElement, ToggleProps>((props, ref) => <RawToggle {...props} forwardedRef={ref} />),
);
