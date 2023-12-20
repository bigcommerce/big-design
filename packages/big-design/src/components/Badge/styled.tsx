import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../mixins';

import { BadgeProps } from './Badge';

export const StyledBadge = styled.span<Omit<BadgeProps, 'label'>>`
  ${withMargins()};

  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  display: inline-block;
  font-size: ${({ theme }) => theme.helpers.remCalc(12)};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  line-height: ${({ theme }) => theme.lineHeight.small};
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  padding: 0 ${({ theme }) => theme.spacing.xSmall};

  ${({ theme, variant }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors.secondary60};
    `}

  ${({ theme, variant }) =>
    variant === 'success' &&
    css`
      background-color: ${theme.colors.success50};
    `}

  ${({ theme, variant }) =>
    variant === 'warning' &&
    css`
      color: ${theme.colors.secondary70};
      background-color: ${theme.colors.warning40};
    `}

  ${({ theme, variant }) =>
    variant === 'danger' &&
    css`
      background-color: ${theme.colors.danger40};
    `}

  ${({ theme, variant }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary40};
    `}
`;

StyledBadge.defaultProps = {
  theme: defaultTheme,
  variant: 'secondary',
};
