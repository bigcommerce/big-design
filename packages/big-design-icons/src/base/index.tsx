import { Colors, Spacing, ThemeInterface, withDefaultTheme } from '@bigcommerce/big-design-theme';
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import styled from 'styled-components';

type IconSize = keyof Spacing | number | (string & {});

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  className?: string;
  color?: keyof Colors;
  size?: IconSize;
  theme?: ThemeInterface;
  title?: string;
}

export interface PrivateIconProps {
  svgRef?: React.Ref<SVGSVGElement>;
  titleId?: string;
}

export function createStyledIcon(
  Icon: ForwardRefExoticComponent<PropsWithoutRef<IconProps> & RefAttributes<SVGSVGElement>>,
) {
  const StyledIcon = styled(Icon).attrs(withDefaultTheme)`
    vertical-align: middle;

    ${({ color, theme }) => color && { color: theme.colors[color] }}

    ${({ size, theme }) =>
      size && {
        height: getIconSize(size, theme),
        width: getIconSize(size, theme),
      }}
  `;

  return forwardRef<SVGSVGElement, IconProps>(({ size = 'xLarge', ...props }, ref) => (
    <StyledIcon {...props} ref={ref} size={size} />
  ));
}

function getIconSize(size: IconSize, theme: ThemeInterface) {
  if (typeof size === 'number') {
    return theme.helpers.remCalc(size);
  }

  return isSpacingKey(size, theme.spacing) ? theme.spacing[size] : size;
}

function isSpacingKey(size: string, spacing: Spacing): size is keyof Spacing {
  return Object.prototype.hasOwnProperty.call(spacing, size);
}
