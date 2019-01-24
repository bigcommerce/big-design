import React from 'react';

import { ThemeInterface } from '../../theme';
import { uniqueId } from '../../utils';
import ErrorIcon from '../Icons/ErrorIcon';

import { StyledErrorIconWrapper, StyledIconWrapper, StyledInput, StyledInputWrapper } from './styled';
import { Description } from './Description';
import { Error } from './Error';
import { Label } from './Label';

interface Props {
  description?: React.ReactChild;
  error?: React.ReactChild;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  label?: React.ReactChild;
  theme?: ThemeInterface;
}

export type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Input extends React.PureComponent<InputProps> {
  static Description = Description;
  static Error = Error;
  static Label = Label;
  private readonly uniqueId = uniqueId('checkBox_');

  render() {
    return (
      <div>
        {this.renderLabel()}
        {this.renderDescription()}
        <StyledInputWrapper>
          {this.renderIconLeft()}
          <StyledInput {...this.props} />
          {this.renderIconRight()}
          {this.renderErrorIcon()}
        </StyledInputWrapper>
        {this.renderError()}
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

  private renderError() {
    const { error } = this.props;

    if (typeof error === 'string') {
      return <Input.Error>{error}</Input.Error>;
    }

    if (React.isValidElement(error) && error.type === Input.Error) {
      return error;
    }

    return null;
  }

  private renderErrorIcon() {
    if (!this.props.error) {
      return null;
    }

    return (
      <StyledErrorIconWrapper>
        <ErrorIcon />
      </StyledErrorIconWrapper>
    );
  }

  private renderIconLeft() {
    if (!this.props.iconLeft) {
      return null;
    }

    return <StyledIconWrapper position="left">{this.props.iconLeft}</StyledIconWrapper>;
  }

  private renderIconRight() {
    if (!this.props.iconRight) {
      return null;
    }

    return <StyledIconWrapper position="right">{this.props.iconRight}</StyledIconWrapper>;
  }
}
