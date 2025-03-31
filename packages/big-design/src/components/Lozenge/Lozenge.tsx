import { InfoIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { MarginProps } from '../../helpers';
import { Tooltip } from '../Tooltip';

import { StyledLozenge } from './styled';

export interface LozengeProps extends MarginProps {
  label: string;
  tooltipContent?: string;
  variant?: 'alpha' | 'beta' | 'deprecated' | 'legacy' | 'new';
}

export const Lozenge: React.FC<LozengeProps> = ({ label, tooltipContent, ...props }) => {
  const LozengeElement = (
    <StyledLozenge {...props}>
      {label}
      {tooltipContent ? <InfoIcon aria-hidden="true" size="large" /> : null}
    </StyledLozenge>
  );

  return tooltipContent ? (
    <Tooltip placement="auto" trigger={LozengeElement}>
      {tooltipContent}
    </Tooltip>
  ) : (
    LozengeElement
  );
};

Lozenge.displayName = 'Lozenge';
