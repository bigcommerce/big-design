import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../helpers';
import type { TransientMarginProps } from '../../helpers/margins/margins';

import type { BadgeProps } from './Badge';

interface StyledBadgeProps extends TransientMarginProps {
  $size?: BadgeProps['size'];
  $variant?: BadgeProps['variant'];
}

export const StyledBadge = styled.span<StyledBadgeProps>`
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

  ${({ theme, $size }) =>
    $size === 'small' &&
    css`
      box-sizing: border-box;
      font-size: ${theme.helpers.remCalc(10)};
      height: ${theme.helpers.remCalc(16)};
      line-height: ${theme.helpers.remCalc(16)};
      min-width: ${theme.helpers.remCalc(28)};
      padding: 0 ${theme.spacing.xxSmall};
    `}

  ${({ theme, $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: ${theme.colors.secondary60};
    `}

  ${({ theme, $variant }) =>
    $variant === 'success' &&
    css`
      background-color: ${theme.colors.success50};
    `}

  ${({ theme, $variant }) =>
    $variant === 'warning' &&
    css`
      color: ${theme.colors.secondary70};
      background-color: ${theme.colors.warning40};
    `}

  ${({ theme, $variant }) =>
    $variant === 'danger' &&
    css`
      background-color: ${theme.colors.danger40};
    `}

  ${({ theme, $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary40};
    `}

  ${({ theme, $variant }) =>
    $variant === 'primary-subtle' &&
    css`
      color: #031033;
      background-color: ${theme.colors.primary30};
    `}
`;

StyledBadge.defaultProps = {
  theme: defaultTheme,
};
