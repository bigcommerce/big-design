import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { withTransition } from '../../mixins/transitions';

import { ToggleLabelProps } from './Toggle';

export const HiddenCheckbox = styled.input`
  ${hideVisually()}
`;

export const StyledToggleLabel = styled.label<ToggleLabelProps>`
  ${withTransition(['background, border-color'])}
  background: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-color: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.helpers.remCalc(8)};
  cursor: pointer;
  height: ${({ theme }) => theme.helpers.remCalc(14)};
  position: relative;
  width: ${({ theme }) => theme.helpers.remCalc(38)};

  &::before {
    ${withTransition(['background, transform'])}
    top: -${({ theme }) => theme.helpers.remCalc(5)};
    background: ${({ checked, theme }) => (checked ? theme.colors.primary40 : theme.colors.white)};
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    content: '';
    height: ${({ theme }) => theme.spacing.xLarge};
    position: absolute;
    width: ${({ theme }) => theme.spacing.xLarge};
    left: calc(100% - ${({ theme }) => theme.spacing.large});
    box-shadow: ${({ theme }) => theme.shadow.raised};
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
