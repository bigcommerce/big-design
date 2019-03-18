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
  private readonly labelUniqueId = uniqueId('checkBox_label_');

  render() {
    const { checked, className, label, ...props } = this.props;
    const id = this.getInputId();

    return (
      <RadioContainer className={className}>
        <HiddenRadio type="radio" checked={checked} id={id} {...props} aria-labelledby={this.labelUniqueId} />
        <StyledRadio checked={checked} htmlFor={id} aria-hidden={true} />
        {this.renderLabel()}
      </RadioContainer>
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

    if (React.isValidElement(label) && label.type === Radio.Label) {
      return React.cloneElement(label as React.ReactElement<React.LabelHTMLAttributes<HTMLLabelElement>>, {
        htmlFor,
        id: this.labelUniqueId,
      });
    }

    return null;
  }
}
