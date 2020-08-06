import React, { forwardRef, memo, Ref } from 'react';

import { useUniqueId } from '../../hooks';
import { Flex } from '../Flex';

import { HiddenCheckbox, StyledSwitchLabel } from './styled';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export const RawSwitch: React.FC<SwitchProps & PrivateProps> = ({ checked, disabled, forwardedRef, ...props }) => {
  const uniqueSwitchId = useUniqueId('switch');
  const id = props.id ? props.id : uniqueSwitchId;

  return (
    <Flex>
      <HiddenCheckbox id={id} type="checkbox" checked={checked} disabled={disabled} {...props} ref={forwardedRef} />
      <StyledSwitchLabel aria-hidden={true} disabled={disabled} htmlFor={id} checked={checked} />
    </Flex>
  );
};

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(({ className, style, ...props }, ref) => (
    <RawSwitch {...props} forwardedRef={ref} />
  )),
);
