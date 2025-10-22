import React, { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';

import { MarginProps } from '../../helpers';
import { typedMemo } from '../../utils';

import { StyledForm } from './styled';
import { FormContext } from './useFormContext';

interface PrivateProps {
  readonly forwardedRef: Ref<HTMLFormElement>;
}

export type FormProps = ComponentPropsWithoutRef<'form'> &
  MarginProps & {
    readonly fullWidth?: boolean;
  };

const StyleableForm: React.FC<PrivateProps & FormProps> = ({ forwardedRef, ...props }) => {
  return (
    <FormContext.Provider value={{ fullWidth: props.fullWidth }}>
      <StyledForm {...props} ref={forwardedRef} />
    </FormContext.Provider>
  );
};

export const Form = typedMemo(
  forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
    <StyleableForm {...props} forwardedRef={ref} />
  )),
);
