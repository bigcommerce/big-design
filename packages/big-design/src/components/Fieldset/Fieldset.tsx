import React, { memo, useMemo } from 'react';

import { warning } from '../../utils/warning';

import { StyledFieldset } from './styled';
import { FieldsetDescription } from './Description';
import { FieldsetLegend } from './Legend';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactChild;
  description?: React.ReactChild;
}

export const Fieldset: React.FC<FieldsetProps> = memo(
  ({ className, legend, description, children, style, ...props }) => {
    const renderedLegend = useMemo(() => {
      if (typeof legend === 'string') {
        return <FieldsetLegend>{legend}</FieldsetLegend>;
      }

      if (React.isValidElement(legend) && legend.type === FieldsetLegend) {
        return legend;
      }

      if (!legend) {
        return null;
      }

      warning('legend must be either a string or a FieldsetLegend component.');
    }, [legend]);

    const renderedDescription = useMemo(() => {
      if (typeof description === 'string') {
        return <FieldsetDescription>{description}</FieldsetDescription>;
      }

      if (React.isValidElement(description) && description.type === FieldsetDescription) {
        return description;
      }

      if (!description) {
        return null;
      }

      warning('description must be either a string or a FieldsetDescription component.');
    }, [description]);

    return (
      <StyledFieldset {...props}>
        {renderedLegend}
        {renderedDescription}
        {children}
      </StyledFieldset>
    );
  },
);
