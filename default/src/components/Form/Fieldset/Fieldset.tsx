import React from 'react';

interface Props {
  legend?: React.ReactChild;
  description?: React.ReactChild;
}

import { StyledFieldset, StyledFieldsetDescription, StyledFieldsetLegend } from './styled';

export type FieldsetProps = Props & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export class Fieldset extends React.PureComponent<FieldsetProps> {
  static Legend = StyledFieldsetLegend;
  static Description = StyledFieldsetDescription;

  render() {
    const { legend, description, children, ...props } = this.props;

    return (
      <StyledFieldset {...props}>
        {this.renderLegend()}
        {this.renderDescription()}
        {children}
      </StyledFieldset>
    );
  }

  private renderLegend() {
    const { description, legend } = this.props;
    const hasDescription = Boolean(description);

    if (typeof legend === 'string') {
      return <Fieldset.Legend hasDescription={hasDescription}>{legend}</Fieldset.Legend>;
    }

    if (React.isValidElement(legend) && legend.type === Fieldset.Legend) {
      return React.cloneElement(legend as React.ReactElement<any>, {
        hasDescription,
      });
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
