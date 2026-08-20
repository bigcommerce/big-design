import React, { type ComponentPropsWithoutRef, forwardRef, type Ref } from 'react';

import { type MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';
import { typedMemo } from '../../utils';

import { StyledForm } from './styled';
import { FormContext } from './useFormContext';

interface PrivateProps {
  forwardedRef: Ref<HTMLFormElement>;
}

export type FormProps = ComponentPropsWithoutRef<'form'> &
  MarginProps & {
    fullWidth?: boolean;
  };

const StyleableForm: React.FC<PrivateProps & FormProps> = (props) => {
  const {
    forwardedRef,
    fullWidth,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...domProps
  } = props;

  return (
    <FormContext.Provider value={{ fullWidth }}>
      <StyledForm
        {...domProps}
        {...toTransientMarginProps(props)}
        $fullWidth={fullWidth}
        ref={forwardedRef}
      />
    </FormContext.Provider>
  );
};

export const Form = typedMemo(
  forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
    <StyleableForm {...props} forwardedRef={ref} />
  )),
);
