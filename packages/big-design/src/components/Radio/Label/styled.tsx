import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import type { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';

import { withMargins } from '../../../helpers';
import type { TransientMarginProps } from '../../../helpers/margins/margins';

export interface StyledLabelProps extends ComponentPropsWithoutRef<'label'> {
  disabled?: boolean;
}

export const StyledLabel = styled.label<StyledLabelProps & TransientMarginProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.medium};

  &:last-child {
    margin-bottom: 0;
  }

  ${withMargins()};

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;

StyledLabel.defaultProps = { theme: defaultTheme };
