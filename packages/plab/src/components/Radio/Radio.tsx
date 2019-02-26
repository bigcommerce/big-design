import React from 'react';

import { uniqueId } from '../../utils';

import { HiddenRadio, RadioContainer, StyledLabel, StyledRadio } from './styled';

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
      <RadioContainer className={className}>
        <HiddenRadio type="radio" checked={checked} id={id} {...props} />
        <StyledRadio checked={checked} htmlFor={id} aria-hidden={true} />
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
