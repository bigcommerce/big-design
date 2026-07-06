import { Spacing, ThemeInterface, withDefaultTheme } from '@bigcommerce/big-design-theme';
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import styled from 'styled-components';

export { type PrivateIconProps } from '../../base';

type IconSize = keyof Spacing | number | (string & {});

export interface FlagIconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: IconSize;
  theme?: ThemeInterface;
  title?: string;
}

export function createStyledFlagIcon(
  FlagIcon: ForwardRefExoticComponent<
    PropsWithoutRef<FlagIconProps> & RefAttributes<SVGSVGElement>
  >,
) {
  const StyledFlagIcon = styled(FlagIcon).attrs(withDefaultTheme)`
    ${({ size, theme }) =>
      size && {
        width: getIconSize(size, theme),
      }}
  `;

  return forwardRef<SVGSVGElement, FlagIconProps>(({ size = 'xLarge', ...props }, ref) => (
    <StyledFlagIcon {...props} ref={ref} size={size} />
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
