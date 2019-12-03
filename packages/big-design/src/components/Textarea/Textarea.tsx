import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { uniqueId } from '../../utils';
import { Form } from '../Form';
import { Small } from '../Typography';

import { StyledTextarea, StyledTextareaWrapper } from './styled';

interface Props {
  description?: React.ReactChild;
  error?: React.ReactChild;
  label?: React.ReactChild;
  rows?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  resize?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLTextAreaElement>;
}

export type TextareaProps = Props & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

class StyleableTextarea extends React.PureComponent<TextareaProps & PrivateProps> {
  static readonly defaultProps: Partial<Props> = {
    rows: 3,
    resize: true,
  };

  static Description = Small;
  static Error = Form.Error;
  static Label = Form.Label;
  private readonly uniqueId = uniqueId('textarea_');
  private readonly MAX_ROWS = 7;

  render() {
    const { description, label, resize, rows, forwardedRef, ...props } = this.props;
    const id = this.getId();

    return (
      <div>
        {this.renderLabel()}
        {this.renderDescription()}
        <StyledTextareaWrapper>
          <StyledTextarea {...props} id={id} rows={this.getRows(rows)} resize={resize} ref={forwardedRef} />
        </StyledTextareaWrapper>
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
    const { label, required } = this.props;
    const id = this.getId();

    if (typeof label === 'string') {
      return (
        <Textarea.Label htmlFor={id} renderOptional={!required}>
          {label}
        </Textarea.Label>
      );
    }

    if (React.isValidElement(label) && label.type === Textarea.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
      });
    }

    return null;
  }

  private getRows(rows: Props['rows']) {
    if (rows && rows > this.MAX_ROWS) {
      return this.MAX_ROWS;
    }

    return rows;
  }
}

const TextareaWithForwardedRef = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, style, ...props }, ref) => <StyleableTextarea {...props} forwardedRef={ref} />,
);

export const Textarea = hoistNonReactStatics(TextareaWithForwardedRef, StyleableTextarea);

Textarea.displayName = 'Textarea';
