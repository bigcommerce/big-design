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

interface BadgeSizeStyles {
  fontSize: string;
  lineHeight: string;
  padding: string;
}

// Colors for each variant. Add a new variant here, or add an extra property to an existing one.
const getVariantColors = (
  theme: ThemeInterface,
): Record<NonNullable<BadgeProps['variant']>, { solid: BadgeColors; subtle?: BadgeColors }> => ({
  secondary: {
    solid: { backgroundColor: theme.colors.secondary60, color: theme.colors.white },
  },
  success: {
    solid: { backgroundColor: theme.colors.success50, color: theme.colors.white },
  },
  warning: {
    solid: { backgroundColor: theme.colors.warning40, color: theme.colors.secondary70 },
  },
  danger: {
    solid: { backgroundColor: theme.colors.danger40, color: theme.colors.white },
  },
  primary: {
    solid: { backgroundColor: theme.colors.primary40, color: theme.colors.white },
    subtle: { backgroundColor: theme.colors.primary30, color: theme.colors.secondary70 },
  },
});

// Styles for each size. Add a new size here, or extend `BadgeSizeStyles` to style more properties.
const getSizeStyles = (
  theme: ThemeInterface,
): Record<NonNullable<BadgeProps['size']>, BadgeSizeStyles> => ({
  small: {
    fontSize: theme.helpers.remCalc(10),
    lineHeight: theme.helpers.remCalc(16),
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
  display: inline-block;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;

  ${({ theme, $size = 'medium' }) => {
    const { fontSize, lineHeight, padding } = getSizeStyles(theme)[$size];

    return css`
      font-size: ${fontSize};
      line-height: ${lineHeight};
      padding: 0 ${padding};
    `;
  }}

  ${({ theme, $variant = 'secondary', $subtle }) => {
    const colors = getVariantColors(theme)[$variant];
    const { backgroundColor, color } = ($subtle && colors.subtle) || colors.solid;

    return css`
      background-color: ${backgroundColor};
      color: ${color};
    `;
  }}
`;

StyledBadge.defaultProps = {
  theme: defaultTheme,
};
