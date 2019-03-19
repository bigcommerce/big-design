import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { StyledForm } from './styled';
import { Actions } from './Actions';
import { Fieldset } from './Fieldset';
import { Row } from './Row';

interface PrivateProps {
  forwardedRef: Ref<HTMLFormElement>;
}

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

class RawForm extends React.PureComponent<PrivateProps & FormProps> {
  static Actions = Actions;
  static Fieldset = Fieldset;
  static Row = Row;

  render() {
    const { forwardedRef, ...props } = this.props;

    return <StyledForm {...props} ref={forwardedRef} />;
  }
}

const FormWithForwardedRef = React.forwardRef<HTMLFormElement, FormProps>((props, ref) => (
  <RawForm {...props} forwardedRef={ref} />
));

export const Form = hoistNonReactStatics(FormWithForwardedRef, RawForm);
