import { ThemeInterface } from '@bigcommerce/big-design-theme';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { uniqueId } from '../../utils';
import { Form } from '../Form';
import { Small } from '../Typography';

import { StyledIconWrapper, StyledInput, StyledInputWrapper } from './styled';

interface Props {
  description?: React.ReactChild;
  error?: React.ReactChild;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  label?: React.ReactChild;
  theme?: ThemeInterface;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

class StyleableInput extends React.PureComponent<InputProps & PrivateProps> {
  static Description = Small;
  static Error = Form.Error;
  static Label = Form.Label;
  private readonly uniqueId = uniqueId('input_');

  render() {
    const { description, label, forwardedRef, ...props } = this.props;
    const id = this.getId();

    return (
      <div>
        {this.renderLabel()}
        {this.renderDescription()}
        <StyledInputWrapper>
          {this.renderIconLeft()}
          <StyledInput {...props} id={id} ref={forwardedRef} />
          {this.renderIconRight()}
        </StyledInputWrapper>
      </div>
    );
  }

  private getId() {
    const { id } = this.props;

    return id ? id : this.uniqueId;
  }

  private renderDescription() {
    const { description } = this.props;

    if (typeof description === 'string') {
      return <Input.Description>{description}</Input.Description>;
    }

    if (React.isValidElement(description) && description.type === Input.Description) {
      return description;
    }

    return null;
  }

  private renderLabel() {
    const { label } = this.props;
    const id = this.getId();

    if (typeof label === 'string') {
      return <Input.Label htmlFor={id}>{label}</Input.Label>;
    }

    if (React.isValidElement(label) && label.type === Input.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
      });
    }

    return null;
  }

  private renderIconLeft() {
    if (!this.props.iconLeft) {
      return null;
    }

    return <StyledIconWrapper position="left">{this.props.iconLeft}</StyledIconWrapper>;
  }

  private renderIconRight() {
    if (!this.props.iconRight || this.props.error) {
      return null;
    }

    return <StyledIconWrapper position="right">{this.props.iconRight}</StyledIconWrapper>;
  }
}

const InputWithForwardedRef = React.forwardRef<HTMLInputElement, InputProps>(({ className, style, ...props }, ref) => (
  <StyleableInput {...props} forwardedRef={ref} />
));

export const Input = hoistNonReactStatics(InputWithForwardedRef, StyleableInput);
