import { theme as defaultTheme, type ThemeInterface } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withMargins } from '../../helpers';
import type { TransientMarginProps } from '../../helpers/margins/margins';

import type { BadgeProps } from './Badge';

interface StyledBadgeProps extends TransientMarginProps {
  $size?: BadgeProps['size'];
  $subtle?: BadgeProps['subtle'];
  $variant?: BadgeProps['variant'];
}

interface BadgeColors {
  backgroundColor: string;
  color: string;
}

const getVariantColors = (
  theme: ThemeInterface,
): Record<NonNullable<BadgeProps['variant']>, { solid: BadgeColors; subtle: BadgeColors }> => ({
  secondary: {
    solid: { backgroundColor: theme.colors.secondary60, color: theme.colors.white },
    subtle: { backgroundColor: theme.colors.secondary20, color: theme.colors.secondary70 },
  },
  success: {
    solid: { backgroundColor: theme.colors.success50, color: theme.colors.white },
    subtle: { backgroundColor: theme.colors.success20, color: theme.colors.success70 },
  },
  warning: {
    solid: { backgroundColor: theme.colors.warning40, color: theme.colors.secondary70 },
    subtle: { backgroundColor: theme.colors.warning20, color: theme.colors.secondary70 },
  },
  danger: {
    solid: { backgroundColor: theme.colors.danger40, color: theme.colors.white },
    subtle: { backgroundColor: theme.colors.danger20, color: theme.colors.danger70 },
  },
  primary: {
    solid: { backgroundColor: theme.colors.primary40, color: theme.colors.white },
    subtle: { backgroundColor: theme.colors.primary20, color: theme.colors.primary70 },
  },
});

interface BadgeSizeStyles {
  fontSize: string;
  lineHeight: string;
  minWidth?: string;
  padding: string;
}

const getSizeStyles = (
  theme: ThemeInterface,
): Record<NonNullable<BadgeProps['size']>, BadgeSizeStyles> => ({
  small: {
    fontSize: theme.helpers.remCalc(10),
    lineHeight: theme.helpers.remCalc(16),
    minWidth: theme.helpers.remCalc(28),
    padding: theme.spacing.xxSmall,
  },
  medium: {
    fontSize: theme.helpers.remCalc(12),
    lineHeight: theme.lineHeight.small,
    padding: theme.spacing.xSmall,
  },
});

export const StyledBadge = styled.span<StyledBadgeProps>`
  ${withMargins()};

  border-radius: ${({ theme }) => theme.borderRadius.normal};
  box-sizing: border-box;
  display: inline-block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;

  ${({ theme, $size = 'medium' }) => {
    const { fontSize, lineHeight, minWidth, padding } = getSizeStyles(theme)[$size];

    return css`
      font-size: ${fontSize};
      line-height: ${lineHeight};
      padding: 0 ${padding};
      ${minWidth &&
      css`
        min-width: ${minWidth};
      `}
    `;
  }}

  ${({ theme, $subtle, $variant = 'secondary' }) => {
    const { backgroundColor, color } =
      getVariantColors(theme)[$variant][$subtle ? 'subtle' : 'solid'];

    return css`
      color: ${color};
      background-color: ${backgroundColor};
    `;
  }}
`;

StyledBadge.defaultProps = {
  theme: defaultTheme,
};
