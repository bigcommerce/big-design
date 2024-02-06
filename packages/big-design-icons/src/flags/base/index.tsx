import { theme as defaultTheme, Spacing, ThemeInterface } from '@bigcommerce/big-design-theme';
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps } from 'react';
import { IStyledComponent, styled } from 'styled-components';

export interface FlagIconProps extends SVGProps<SVGSVGElement> {
  size?: keyof Spacing | number;
  theme?: ThemeInterface;
  title?: string;
}

type StyledFlagIcon = IStyledComponent<
  'web',
  Omit<FlagIconProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export function createStyledFlagIcon(
  FlagIcon: ForwardRefExoticComponent<
    PropsWithoutRef<FlagIconProps> & RefAttributes<SVGSVGElement>
  >,
): StyledFlagIcon {
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
