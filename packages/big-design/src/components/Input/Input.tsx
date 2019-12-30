import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { uniqueId } from '../../utils';
import { Chip } from '../Chip';
import { Form } from '../Form';
import { Small } from '../Typography';

import { StyledIconWrapper, StyledInput, StyledInputContent, StyledInputWrapper } from './styled';

interface Props {
  chips?: string[];
  description?: React.ReactChild;
  error?: React.ReactChild | React.ReactChild[];
  iconLeft?: React.ReactChild;
  iconRight?: React.ReactChild;
  label?: React.ReactChild;
  labelId?: string;
  onChipDelete?(chip: string): () => void;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

interface InputState {
  focus: boolean;
}

export type InputProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

class StyleableInput extends React.PureComponent<InputProps & PrivateProps, InputState> {
  static Description = Small;
  static Error = Form.Error;
  static Label = Form.Label;

  readonly state: InputState = {
    focus: false,
  };

  private readonly uniqueId = uniqueId('input_');

  render() {
    const { chips, description, disabled, error, label, labelId, forwardedRef, onChipDelete, ...props } = this.props;
    const id = this.getId();

    return (
      <div>
        {this.renderLabel()}
        {this.renderDescription()}
        <StyledInputWrapper disabled={disabled} error={error} focus={this.state.focus}>
          {this.renderIconLeft()}
          <StyledInputContent chips={chips}>
            {this.renderChips()}
            <StyledInput
              {...props}
              disabled={disabled}
              chips={chips}
              error={error}
              id={id}
              onBlur={this.onInputBlur}
              onFocus={this.onInputFocus}
              ref={forwardedRef}
            />
          </StyledInputContent>

          {this.renderIconRight()}
        </StyledInputWrapper>
      </div>
    );
  }

  private getId() {
    const { id } = this.props;

    return id ? id : this.uniqueId;
  }

  private onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;

    this.setFocus(true);

    return onFocus && onFocus(event);
  };

  private onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;

    this.setFocus(false);

    return onBlur && onBlur(event);
  };

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
    const { label, labelId, required } = this.props;
    const id = this.getId();

    if (typeof label === 'string') {
      return (
        <Input.Label id={labelId} htmlFor={id} renderOptional={!required}>
          {label}
        </Input.Label>
      );
    }

    if (React.isValidElement(label) && label.type === Input.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        id: labelId,
        htmlFor: id,
      });
    }

    return null;
  }

  private renderIconLeft() {
    if (!this.props.iconLeft) {
      return null;
    }

    return <StyledIconWrapper>{this.props.iconLeft}</StyledIconWrapper>;
  }

  private renderIconRight() {
    if (!this.props.iconRight) {
      return null;
    }

    return <StyledIconWrapper>{this.props.iconRight}</StyledIconWrapper>;
  }

  private setFocus(toggle: boolean) {
    this.setState({ focus: toggle });
  }

  private renderChips() {
    const { chips, onChipDelete } = this.props;

    if (!chips) {
      return null;
    }

    return chips.map((chip, key) =>
      onChipDelete ? (
        <Chip key={key} label={chip} marginBottom="none" onDelete={onChipDelete(chip)} />
      ) : (
        <Chip key={key} label={chip} marginBottom="none" marginTop="none" />
      ),
    );
  }
}

const InputWithForwardedRef = React.forwardRef<HTMLInputElement, InputProps>(({ className, style, ...props }, ref) => (
  <StyleableInput {...props} forwardedRef={ref} />
));

export const Input = hoistNonReactStatics(InputWithForwardedRef, StyleableInput);

Input.displayName = 'Input';
