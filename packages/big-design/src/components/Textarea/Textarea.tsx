import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { ThemeInterface } from '../../theme';
import { uniqueId } from '../../utils';
import { Form } from '../Form';
import { ErrorIcon } from '../Icons';
import { Small } from '../Typography';

import { StyledErrorIconWrapper, StyledIconWrapper, StyledTextarea, StyledTextareaWrapper } from './styled';

interface Props {
  description?: React.ReactChild;
  error?: React.ReactChild;
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  label?: React.ReactChild;
  theme?: ThemeInterface;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLTextAreaElement>;
}

export type TextareaProps = Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

class StyleableTextarea extends React.PureComponent<TextareaProps & PrivateProps> {
  static Description = Small;
  static Error = Form.Error;
  static Label = Form.Label;
  private readonly uniqueId = uniqueId('textarea_');

  render() {
    const { description, label, forwardedRef, ...props } = this.props;
    const id = this.getId();

    return (
      <div>
        {this.renderLabel()}
        {this.renderDescription()}
        <StyledTextareaWrapper>
          {this.renderIconLeft()}
          <StyledTextarea {...props} id={id} ref={forwardedRef} />
          {this.renderIconRight()}
          {this.renderErrorIcon()}
        </StyledTextareaWrapper>
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
      return <Textarea.Description>{description}</Textarea.Description>;
    }

    if (React.isValidElement(description) && description.type === Textarea.Description) {
      return description;
    }

    return null;
  }

  private renderLabel() {
    const { label } = this.props;
    const id = this.getId();

    if (typeof label === 'string') {
      return <Textarea.Label htmlFor={id}>{label}</Textarea.Label>;
    }

    if (React.isValidElement(label) && label.type === Textarea.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
      });
    }

    return null;
  }

  private renderError() {
    const { error } = this.props;

    if (typeof error === 'string') {
      return <Textarea.Error>{error}</Textarea.Error>;
    }

    if (React.isValidElement(error) && error.type === Textarea.Error) {
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

const TextareaWithForwardedRef = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => <StyleableTextarea {...props} forwardedRef={ref} />,
);

export const Textarea = hoistNonReactStatics(TextareaWithForwardedRef, StyleableTextarea);
