import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { uniqueId } from '../../utils';
import { CheckIcon } from '../Icons';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, StyledLabel } from './styled';

interface Props {
  label: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

interface State {
  checked: boolean;
}

export type CheckboxProps = Readonly<Props & React.InputHTMLAttributes<HTMLInputElement>>;

class RawCheckbox extends React.PureComponent<CheckboxProps & PrivateProps, State> {
  static Label = StyledLabel;

  static getDerivedStateFromProps(props: CheckboxProps, state: State) {
    if (props.checked === undefined) {
      return null;
    }

    return props.checked === state.checked ? null : { checked: props.checked };
  }

  state = {
    checked: this.props.defaultChecked || false,
  };

  private readonly uniqueId = uniqueId('checkBox_');
  private readonly labelUniqueId = uniqueId('checkBox_label_');

  render() {
    const { className, defaultChecked, label, forwardedRef, style, ...props } = this.props;
    const { checked } = this.state;
    const id = this.getInputId();

    return (
      <CheckboxContainer className={className} style={style}>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          id={id}
          {...props}
          onChange={this.toggle}
          aria-labelledby={this.labelUniqueId}
          ref={forwardedRef}
        />
        <StyledCheckbox checked={checked} htmlFor={id} aria-hidden={true}>
          <CheckIcon size="small" />
        </StyledCheckbox>
        {this.renderLabel()}
      </CheckboxContainer>
    );
  }

  private toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({ checked: !state.checked }));

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };

  private getInputId() {
    const { id } = this.props;

    return id ? id : this.uniqueId;
  }

  private renderLabel() {
    const htmlFor = this.getInputId();
    const { label } = this.props;

    if (typeof label === 'string') {
      return (
        <StyledLabel htmlFor={htmlFor} id={this.labelUniqueId}>
          {label}
        </StyledLabel>
      );
    }

    if (React.isValidElement(label) && label.type === Checkbox.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor,
        id: this.labelUniqueId,
      });
    }

    return null;
  }
}

const CheckboxWithForwardedRef = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, style, ...props }, ref) => <RawCheckbox {...props} forwardedRef={ref} />,
);

export const Checkbox = hoistNonReactStatics(CheckboxWithForwardedRef, RawCheckbox);

export const StyleableCheckbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => (
  <RawCheckbox {...props} forwardedRef={ref} />
));

Checkbox.displayName = 'Checkbox';
StyleableCheckbox.displayName = 'StyleableCheckbox';
