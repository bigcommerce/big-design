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

export const Lozenge: React.FC<LozengeProps> = (props) => {
  const LozengeElement = (
    <StyledLozenge {...props}>
      {props.label}
      {props.tooltipContent ? <InfoIcon aria-hidden="true" size="large" /> : null}
    </StyledLozenge>
  );

  return props.tooltipContent ? (
    <Tooltip placement="auto" trigger={LozengeElement}>
      {props.tooltipContent}
    </Tooltip>
  ) : (
    LozengeElement
  );
};

Lozenge.displayName = 'Lozenge';
