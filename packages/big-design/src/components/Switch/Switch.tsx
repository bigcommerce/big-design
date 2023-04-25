'use client';

import React, { forwardRef, memo, Ref, useId } from 'react';

import { Flex } from '../Flex';

import { HiddenCheckbox, StyledSwitchLabel } from './styled';

export type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export const RawSwitch: React.FC<SwitchProps & PrivateProps> = ({
  checked,
  disabled,
  forwardedRef,
  ...props
}) => {
  const uniqueSwitchId = useId();
  const id = props.id ? props.id : uniqueSwitchId;

  return (
    <Flex>
      <HiddenCheckbox
        checked={checked}
        disabled={disabled}
        id={id}
        type="checkbox"
        {...props}
        ref={forwardedRef}
      />
      <StyledSwitchLabel aria-hidden={true} checked={checked} disabled={disabled} htmlFor={id} />
    </Flex>
  );
};

export const Switch = memo(
  forwardRef<HTMLInputElement, SwitchProps>(({ className, style, ...props }, ref) => (
    <RawSwitch {...props} forwardedRef={ref} />
  )),
);
