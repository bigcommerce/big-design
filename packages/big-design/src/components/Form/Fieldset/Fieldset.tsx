import React, { memo } from 'react';

import { StyledFieldset, StyledFieldsetDescription, StyledFieldsetLegend } from './styled';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactChild;
  description?: React.ReactChild;
}

export class Fieldset extends React.PureComponent<FieldsetProps> {
  static Legend = memo(StyledFieldsetLegend);
  static Description = memo(StyledFieldsetDescription);

  render() {
    const { className, legend, description, children, style, ...props } = this.props;

    return (
      <StyledFieldset {...props}>
        {this.renderLegend()}
        {this.renderDescription()}
        {children}
      </StyledFieldset>
    );
  }

  private renderLegend() {
    const { legend } = this.props;

    if (typeof legend === 'string') {
      return <Fieldset.Legend>{legend}</Fieldset.Legend>;
    }

    if (React.isValidElement(legend) && legend.type === Fieldset.Legend) {
      return legend;
    }

    return null;
  }

  private renderDescription() {
    const { description } = this.props;

    if (typeof description === 'string') {
      return <Fieldset.Description>{description}</Fieldset.Description>;
    }

    if (React.isValidElement(description) && description.type === Fieldset.Description) {
      return description;
    }

    return null;
  }
}
