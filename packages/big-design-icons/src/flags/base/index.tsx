import { theme as defaultTheme, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps } from 'react';
import styled from 'styled-components';

export interface FlagIconProps extends SVGProps<SVGSVGElement> {
  size?: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

export function createStyledFlagIcon(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FlagIcon: ForwardRefExoticComponent<
    PropsWithoutRef<FlagIconProps> & RefAttributes<SVGSVGElement>
  >,
) {
  const StyledFlagIcon = styled(FlagIcon)`
    ${({ size, theme }) =>
      size && {
        width: typeof size === 'number' ? theme.helpers.remCalc(size) : theme.spacing[size],
      }}
  `;

  StyledFlagIcon.defaultProps = {
    size: 'xLarge',
    theme: defaultTheme,
  };

  return StyledFlagIcon;
}
