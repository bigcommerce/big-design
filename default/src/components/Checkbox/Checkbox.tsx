import React from 'react';

import { uniqueId } from '../../utils';
import PlusIcon from '../Icons/PlusIcon';

import { CheckboxContainer, HiddenCheckbox, StyledCheckbox, StyledLabel } from './styled';

interface Props {
  label: React.ReactChild;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Checkbox extends React.PureComponent<CheckboxProps> {
  static Label = StyledLabel;
  private readonly uniqueId = uniqueId('checkBox_');

  render() {
    const { checked, className, label, ...props } = this.props;
    const id = this.getId();

    return (
      <CheckboxContainer className={className}>
        <HiddenCheckbox type="checkbox" checked={checked} id={id} {...props} />
        <StyledCheckbox checked={checked} htmlFor={id} aria-hidden={true}>
          <PlusIcon />
        </StyledCheckbox>
        {this.renderLabel()}
      </CheckboxContainer>
    );
  }

  private getId() {
    const { id } = this.props;

    return id ? id : this.uniqueId;
  }

  private renderLabel() {
    const id = this.getId();
    const { label } = this.props;

    if (typeof label === 'string') {
      return <StyledLabel htmlFor={id}>{label}</StyledLabel>;
    }

    if (React.isValidElement(label) && label.type === Checkbox.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
      });
    }

    return null;
  }
}
