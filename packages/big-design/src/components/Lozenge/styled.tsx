import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Box } from '../Box';

import { LozengeProps } from './Lozenge';

interface StyledLozengeProps extends Omit<LozengeProps, 'label' | 'tooltipContent'> {
  hasTooltip?: boolean;
}

const variantStyles = {
  alpha: css`
    background-color: ${({ theme }) => theme.colors.warning20};
    color: ${({ theme }) => theme.colors.secondary70};
  `,
  beta: css`
    background-color: ${({ theme }) => theme.colors.primary20};
    color: ${({ theme }) => theme.colors.primary50};
  `,
  deprecated: css`
    background-color: ${({ theme }) => theme.colors.danger20};
    color: ${({ theme }) => theme.colors.danger70};
  `,
  legacy: css`
    background-color: ${({ theme }) => theme.colors.secondary30};
    color: ${({ theme }) => theme.colors.secondary70};
  `,
  new: css`
    background-color: ${({ theme }) => theme.colors.success20};
    color: ${({ theme }) => theme.colors.success70};
  `,
};

export const StyledLozenge = styled(Box)<StyledLozengeProps>`
  border-radius: ${({ theme }) => theme.spacing.medium};
  display: inline-flex;
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  line-height: ${({ theme }) => theme.lineHeight.small};
  text-align: center;
  padding-block: ${({ theme }) => theme.spacing.xxSmall};
  vertical-align: middle;
  padding-inline: ${({ theme, hasTooltip }) =>
    hasTooltip ? `${theme.spacing.small} ${theme.spacing.xxSmall}` : theme.spacing.small};
  white-space: nowrap;

  ${({ variant = 'new' }) => variantStyles[variant]};
`;

StyledLozenge.defaultProps = {
  theme: defaultTheme,
  hasTooltip: false,
};
