import { theme as defaultTheme, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import React, { SVGProps } from 'react';
import styled from 'styled-components';

export interface FlagIconProps extends SVGProps<SVGSVGElement> {
  size?: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

export function createStyledFlagIcon(FlagIcon: React.FC<FlagIconProps>) {
  const StyledFlagIcon = styled(FlagIcon)`
    ${({ size, theme }) =>
      size && {
        height: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
      }}
  `;

  StyledFlagIcon.defaultProps = {
    size: 'xLarge',
    theme: defaultTheme,
  };

  return StyledFlagIcon;
}
