import React, { forwardRef, memo, Ref } from 'react';

import { Flex } from '..';
import { useUniqueId } from '../../hooks';

import { StyledToggleInput, StyledToggleLabel } from './styled';

export type ToggleLabelProps = Pick<ToggleProps, 'checked'>;

export type ToggleProps = React.InputHTMLAttributes<HTMLInputElement>;

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export const RawToggle: React.FC<ToggleProps & PrivateProps> = ({ checked, ...props }) => {
  const uniqueCheckboxId = useUniqueId('checkbox');
  const id = props.id ? props.id : uniqueCheckboxId;

  return (
    <Flex>
      <StyledToggleInput id={id} type="checkbox" checked={checked} {...props} />
      <StyledToggleLabel htmlFor={id} checked={checked} />
    </Flex>
  );
};

export const Toggle = memo(
  forwardRef<HTMLInputElement, ToggleProps>((props, ref) => <RawToggle {...props} forwardedRef={ref} />),
);
