import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { ToggleLabelProps } from './Toggle';

export const StyledToggleInput = styled.input`
  ${hideVisually()}
`;

export const StyledToggleLabel = styled.label<ToggleLabelProps>`
  background: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-color: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.helpers.remCalc(8)};
  cursor: pointer;
  height: ${({ theme }) => theme.helpers.remCalc(14)};
  position: relative;
  width: ${({ theme }) => theme.helpers.remCalc(38)};
  transition: all 150ms ease-out;
  transition-property: background, border-color;

  &::before {
    top: -${({ theme }) => theme.helpers.remCalc(5)};
    background: ${({ checked, theme }) => (checked ? theme.colors.primary40 : theme.colors.white)};
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    content: '';
    height: ${({ theme }) => theme.spacing.xLarge};
    position: absolute;
    width: ${({ theme }) => theme.spacing.xLarge};
    left: calc(100% - ${({ theme }) => theme.spacing.large});
    box-shadow: ${({ theme }) => theme.shadow.raised};
    transition: all 150ms ease-out;
    transition-property: background, transform;
    ${({ checked }) =>
      !checked &&
      `
        transform: translateX(-100%);
    `}
  }
`;

StyledToggleLabel.defaultProps = {
  theme: defaultTheme,
};
