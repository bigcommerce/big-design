import React from 'react';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';

import { FieldsetDescriptionStyles, FieldsetLegendStyles, FieldsetStyles } from './styles';

interface Props {
  legend?: React.ReactChild;
  description?: React.ReactChild;
}

export type FieldsetProps = Props & React.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export interface LegendProps {
  hasDescription: boolean;
}

const StyledFieldset = styled.fieldset`
  ${FieldsetStyles};
`;

const FieldsetLegend = styled.legend<LegendProps>`
  ${FieldsetLegendStyles};
`;

const FieldsetDescription = styled(Small)`
  ${FieldsetDescriptionStyles};
`;

export class Fieldset extends React.PureComponent<FieldsetProps> {
  static Legend = FieldsetLegend;
  static Description = FieldsetDescription;

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

StyledFieldset.defaultProps = { theme: defaultTheme };
FieldsetLegend.defaultProps = { theme: defaultTheme };
