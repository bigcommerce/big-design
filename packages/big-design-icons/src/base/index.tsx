import {
  type Colors,
  theme as defaultTheme,
  type Spacing,
  type ThemeInterface,
} from '@bigcommerce/big-design-theme';
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  Ref,
  RefAttributes,
} from 'react';
import styled from 'styled-components';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  className?: string;
  color?: keyof Colors;
  size?: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

export interface PrivateIconProps {
  svgRef?: Ref<SVGSVGElement>;
  titleId?: string;
}

export function createStyledIcon(
  Icon: ForwardRefExoticComponent<PropsWithoutRef<IconProps> & RefAttributes<SVGSVGElement>>,
) {
  const StyledIcon = styled(Icon)`
    vertical-align: middle;

    ${({ color, theme }) => color && { color: theme.colors[color] }}

    ${({ size = 'xLarge', theme }) => ({
      height: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
      width: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
    })}
  `;

  StyledIcon.defaultProps = { theme: defaultTheme };

  return StyledIcon;
}
