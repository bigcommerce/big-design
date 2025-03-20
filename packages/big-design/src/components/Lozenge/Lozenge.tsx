import React, { ComponentPropsWithoutRef, memo } from 'react';
import { InfoIcon } from '@bigcommerce/big-design-icons';

import { MarginProps } from '../../helpers';

import { StyledLozenge } from './styled';

export interface LozengeProps extends ComponentPropsWithoutRef<'span'>, MarginProps {
  label: string;
  tooltipIcon?: boolean;
  variant?: 'alpha' | 'beta' | 'deprecated' | 'legacy' | 'new';
}

export const Lozenge: React.FC<LozengeProps> = memo(
  ({ className, style, label, ...props }) =>
    typeof label === 'string' ? (
      <StyledLozenge {...props}>
        {label}
        {props.tooltipIcon ? (
          <>
            {' '}
            <InfoIcon size="large" aria-hidden="true" />
          </>
        ) : null}
      </StyledLozenge>
    ) : null,
);

Lozenge.displayName = 'Lozenge';
