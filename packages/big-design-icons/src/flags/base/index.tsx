import { theme as defaultTheme, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import styled from 'styled-components';

export { type PrivateIconProps } from '../../base';

export interface FlagIconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

export function createStyledFlagIcon(
  FlagIcon: ForwardRefExoticComponent<
    PropsWithoutRef<FlagIconProps> & RefAttributes<SVGSVGElement>
  >,
) {
  const StyledFlagIcon = styled(FlagIcon)`
    ${({ size = 'xLarge', theme }) => ({
      width: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
    })}
  `;

  StyledFlagIcon.defaultProps = { theme: defaultTheme };

  return StyledFlagIcon;
}
