import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';

export const HiddenCheckbox = styled.input`
  ${hideVisually()}
`;

type SwitchLabelProps = {
  checked?: boolean;
  disabled?: boolean;
};

export const StyledSwitchLabel = styled.label<SwitchLabelProps>`
  ${withTransition(['background, border-color'])}

  background: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-color: ${({ checked, theme }) => (checked ? theme.colors.primary30 : theme.colors.secondary30)};
  border-radius: ${({ theme }) => theme.helpers.remCalc(8)};
  cursor: pointer;
  height: ${({ theme }) => theme.helpers.remCalc(14)};
  position: relative;
  width: ${({ theme }) => theme.helpers.remCalc(38)};

  &:hover {
    &::before {
      ${({ checked, theme }) =>
        checked
          ? css`
              box-shadow: 0px 0px 0px 4px ${theme.helpers.createRGBA(theme.colors.primary, 0.2)};
            `
          : css`
              box-shadow: 0px 0px 0px 4px ${theme.helpers.createRGBA(theme.colors.secondary50, 0.2)};
            `}
    }
  }

  &:focus {
    &::before {
      box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.helpers.createRGBA(theme.colors.primary, 0.2)};
    }
  }

  ${({ checked, disabled, theme }) =>
    disabled &&
    css`
      background: ${checked ? theme.colors.primary20 : theme.colors.secondary20};
      cursor: not-allowed;

      &:hover {
        &::before {
          ${({ theme }) => theme.shadow.raised}

          border-radius: ${({ theme }) => theme.borderRadius.circle};
        }
      }
    `}

  &::before {
    ${withTransition(['background, transform'])}
    ${({ theme }) => theme.shadow.raised}

    background: ${({ checked, theme }) => (checked ? theme.colors.primary40 : theme.colors.white)};
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    content: '';
    height: ${({ theme }) => theme.spacing.xLarge};
    left: calc(100% - ${({ theme }) => theme.spacing.large});
    position: absolute;
    top: -${({ theme }) => theme.helpers.remCalc(5)};
    width: ${({ theme }) => theme.spacing.xLarge};

    ${({ checked, disabled, theme }) =>
      disabled &&
      css`
        background: ${checked ? theme.colors.primary30 : theme.colors.secondary10};
        cursor: not-allowed;
      `}

    ${({ checked }) =>
      !checked &&
      css`
        transform: translateX(-100%);
      `}
  }
`;

StyledSwitchLabel.defaultProps = {
  theme: defaultTheme,
};
