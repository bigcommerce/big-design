import { CheckIcon } from '@bigcommerce/big-design-icons';
import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { Ref } from 'react';

import { uniqueId } from '../../utils';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, StyledLabel } from './styled';

interface Props {
  label: React.ReactChild;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLInputElement>;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

class RawCheckbox extends React.PureComponent<CheckboxProps & PrivateProps> {
  static Label = StyledLabel;
  private readonly uniqueId = uniqueId('checkBox_');
  private readonly labelUniqueId = uniqueId('checkBox_label_');

  render() {
    const { checked, className, label, forwardedRef, style, ...props } = this.props;
    const id = this.getInputId();

    return (
      <CheckboxContainer className={className} style={style}>
        <HiddenCheckbox
          type="checkbox"
          checked={checked}
          id={id}
          {...props}
          aria-labelledby={this.labelUniqueId}
          ref={forwardedRef}
        />
        <StyledCheckbox checked={checked} htmlFor={id} aria-hidden={true}>
          <CheckIcon />
        </StyledCheckbox>
        {this.renderLabel()}
      </CheckboxContainer>
    );
  }

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
