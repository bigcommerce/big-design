import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';

interface StyledCheckboxProps {
  checked?: boolean;
  isIndeterminate?: boolean;
  disabled?: boolean;
}

export interface StyledLabelProps {
  hidden?: boolean;
  disabled?: boolean;
}

export const CheckboxLabelContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xSmall};
`;

export const CheckboxContainer = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const HiddenCheckbox = styled.input`
  ${hideVisually()}
`;

export const StyledCheckbox = styled.label<StyledCheckboxProps>`
  ${withTransition(['border-color', 'background', 'box-shadow', 'color', 'opacity'])}

  align-items: center;
  background: ${({ checked, isIndeterminate, theme }) =>
    checked || isIndeterminate ? theme.colors.primary : theme.colors.white};
  box-sizing: border-box;
  border: ${({ theme }) => theme.border.box};
  border-color: ${({ checked, isIndeterminate, theme }) =>
    checked || isIndeterminate ? theme.colors.primary : theme.colors.secondary30};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  height: ${({ theme }) => theme.spacing.large};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.helpers.remCalc(2)};
  margin-top: ${({ theme }) => theme.helpers.remCalc(2)};
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${({ checked, disabled, isIndeterminate, theme }) =>
    disabled &&
    css`
      background: ${checked || isIndeterminate
        ? theme.colors.secondary30
        : theme.colors.secondary10};
      border-color: ${theme.colors.secondary30};
      cursor: not-allowed;
    `};

  ${({ checked, isIndeterminate, disabled, theme }) =>
    !disabled &&
    `&:hover {
      border-color: ${checked || isIndeterminate ? theme.colors.primary : theme.colors.secondary40};
    }`}

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
  }

  svg {
    opacity: ${({ checked, isIndeterminate }) => (checked || isIndeterminate ? 1 : 0)};
  }
`;

StyledCheckbox.defaultProps = { theme: defaultTheme };
CheckboxLabelContainer.defaultProps = { theme: defaultTheme };
