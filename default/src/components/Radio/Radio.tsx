import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { uniqueId } from '../../utils';

import { HiddenRadioStyles, LabelStyles, RadioContainerStyles, RadioStyles } from './styles';

export interface StyledRadioProps {
  checked?: boolean;
}

export const HiddenRadio = styled.input`
  ${HiddenRadioStyles}
`;

const StyledRadio = styled.div<StyledRadioProps>`
  ${RadioStyles()};
`;

const RadioContainer = styled.label`
  ${RadioContainerStyles}
`;

const StyledLabel = styled.label`
  ${LabelStyles};
`;

interface Props {
  label: React.ReactChild;
}

export type RadioProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Radio extends React.PureComponent<RadioProps> {
  static Label = StyledLabel;
  private readonly uniqueId = uniqueId('radio_');

  render() {
    const { checked, className, label, ...props } = this.props;
    const id = this.getId();

    return (
      <RadioContainer className={className} htmlFor={id}>
        <HiddenRadio type="radio" checked={checked} id={id} {...props} />
        <StyledRadio checked={checked} />
        {this.renderLabel()}
      </RadioContainer>
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

    if (React.isValidElement(label) && label.type === Radio.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor: id,
      });
    }

    return null;
  }
}

StyledRadio.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
