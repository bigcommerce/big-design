import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { StyledForm } from './styled';
import { FormControlError } from './Error';
import { Fieldset } from './Fieldset';
import { FormGroup } from './Group';
import { FormControlLabel } from './Label';

interface PrivateProps {
  forwardedRef: Ref<HTMLFormElement>;
}

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  fullWidth?: boolean;
};

class StyleableForm extends React.PureComponent<PrivateProps & FormProps> {
  static Label = FormControlLabel;
  static Error = FormControlError;
  static Fieldset = Fieldset;
  static Group = FormGroup;

  render() {
    const { forwardedRef, ...props } = this.props;

    return <StyledForm {...props} ref={forwardedRef} />;
  }
}

const FormWithForwardedRef = React.forwardRef<HTMLFormElement, FormProps>(({ className, style, ...props }, ref) => (
  <StyleableForm {...props} forwardedRef={ref} />
));

export const Form = hoistNonReactStatics(FormWithForwardedRef, StyleableForm);

Form.displayName = 'Form';
