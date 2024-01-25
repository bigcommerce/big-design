import React, { forwardRef, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { typedMemo, withTransients } from '../../utils';

import { StyledForm } from './styled';
import { FormContext } from './useFormContext';

interface PrivateProps {
  readonly forwardedRef: Ref<HTMLFormElement>;
}

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> &
  MarginProps & {
    readonly fullWidth?: boolean;
  };

const StyleableForm: React.FC<PrivateProps & FormProps> = ({ forwardedRef, ...props }) => {
  return (
    <FormContext.Provider value={{ fullWidth: props.fullWidth }}>
      <StyledForm {...withTransients(props)} ref={forwardedRef} />
    </FormContext.Provider>
  );
};

export const Form = typedMemo(
  forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
    <StyleableForm {...props} forwardedRef={ref} />
  )),
);
