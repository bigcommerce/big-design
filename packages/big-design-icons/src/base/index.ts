import { theme as defaultTheme, Colors, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import React from 'react';
import styled from 'styled-components';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className: string;
  color: keyof Colors;
  size: keyof Spacing | number;
  theme: ThemeInterface;
  title: string;
}

export function createStyledIcon(Icon: React.FC<Partial<IconProps>>) {
  const StyledIcon = styled(Icon)`
    vertical-align: middle;

    ${({ color, theme }) => color && { color: theme.colors[color] }}

    ${({ size, theme }) =>
      size && {
        height: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
        width: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
      }}
  `;

  StyledIcon.defaultProps = {
    color: 'secondary60',
    theme: defaultTheme,
    size: 'xLarge',
  };

  return StyledIcon;
}
