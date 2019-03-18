import React from 'react';

import { uniqueId } from '../../utils';
import { CheckIcon } from '../Icons';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, StyledLabel } from './styled';

interface Props {
  label: React.ReactChild;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Checkbox extends React.PureComponent<CheckboxProps> {
  static Label = StyledLabel;
  private readonly uniqueId = uniqueId('checkBox_');
  private readonly labelUniqueId = uniqueId('checkBox_label_');

  render() {
    const { checked, className, label, ...props } = this.props;
    const id = this.getInputId();

    return (
      <CheckboxContainer className={className}>
        <HiddenCheckbox type="checkbox" checked={checked} id={id} {...props} aria-labelledby={this.labelUniqueId} />
        <StyledCheckbox checked={checked} htmlFor={id} aria-hidden={true}>
          <CheckIcon size="small" />
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
