import React, { ChangeEvent } from 'react';

import { uniqueId } from '../../utils';

import { HiddenRadio, StyledContainer, StyledLabel, StyledRadio } from './styled';

export interface StyledRadioProps {
  checked?: boolean;
}

export interface StyledLabelProps {
  htmlFor: string;
}

interface Props {
  label: string;
}

export type RadioProps = Props & React.InputHTMLAttributes<HTMLInputElement>;

export class Radio extends React.PureComponent<RadioProps> {
  static defaultProps = {
    id: uniqueId('radio_'),
  };

  render() {
    const { label, ...props } = this.props;
    const { id, checked, defaultChecked } = props;

    return (
      <StyledContainer>
        <HiddenRadio type="radio" {...props} />
        <StyledRadio checked={checked || defaultChecked} />
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
      </StyledContainer>
    );
  }
}
