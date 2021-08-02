import React, { forwardRef, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { typedMemo } from '../../utils';

import { StyledForm } from './styled';

interface PrivateProps {
  forwardedRef: Ref<HTMLFormElement>;
}

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> &
  MarginProps & {
    fullWidth?: boolean;
  };

const StyleableForm: React.FC<PrivateProps & FormProps> = ({ forwardedRef, ...props }) => (
  <StyledForm {...props} ref={forwardedRef} />
);

export const Form = typedMemo(
  forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
    <StyleableForm {...props} forwardedRef={ref} />
  )),
);
