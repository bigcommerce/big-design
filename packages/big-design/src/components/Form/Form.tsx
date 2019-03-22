import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { StyledForm } from './styled';
import { Error as FormError } from './Error';
import { Fieldset } from './Fieldset';
import { Label } from './Label';
import { Row } from './Row';

interface PrivateProps {
  forwardedRef: Ref<HTMLFormElement>;
}

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

class StyleableForm extends React.PureComponent<PrivateProps & FormProps> {
  static Label = Label;
  static Error = FormError;
  static Fieldset = Fieldset;
  static Row = Row;

  render() {
    const { forwardedRef, ...props } = this.props;

    return <StyledForm {...props} ref={forwardedRef} />;
  }
}

const FormWithForwardedRef = React.forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
  <StyleableForm {...props} forwardedRef={ref} />
));

export const Form = hoistNonReactStatics(FormWithForwardedRef, StyleableForm);
