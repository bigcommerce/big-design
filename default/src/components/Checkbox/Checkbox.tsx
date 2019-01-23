import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { uniqueId } from '../../utils';
import PlusIcon from '../Icons/PlusIcon';

import { CheckboxContainerStyles, CheckboxStyles, HiddenCheckboxStyles, LabelStyles } from './styles';

export interface StyledCheckboxProps {
  checked?: boolean;
}

export const HiddenCheckbox = styled.input`
  ${HiddenCheckboxStyles}
`;

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  ${CheckboxStyles};
`;

const CheckboxContainer = styled.div`
  ${CheckboxContainerStyles}
`;

const StyledLabel = styled.label`
  ${LabelStyles};
`;

interface Props {
  label: React.ReactChild;
}

export type CheckboxProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Checkbox extends React.PureComponent<CheckboxProps> {
  static Label = StyledLabel;
  private readonly uniqueId = uniqueId('checkBox_');

  render() {
    const { checked, label, ...props } = this.props;
    const id = this.getId();

    return (
      <CheckboxContainer>
        <HiddenCheckbox type="checkbox" checked={checked} id={id} {...props} />
        <StyledCheckbox checked={checked}>
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

StyledCheckbox.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
