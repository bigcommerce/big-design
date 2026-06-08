import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { withTransition } from '../../helpers/transitions';

interface StyledCheckboxProps {
  checked?: boolean;
  isIndeterminate?: boolean;
  disabled?: boolean;
}

export const CheckboxImgContainer = styled.img`
  height: ${remCalc(40)};
  width: ${remCalc(40)};
  margin-right: ${({ theme }) => theme.spacing.xSmall};
`;

export const CheckboxContentContainer = styled.div<{
  hasContent?: boolean;
  isVerticalCenter?: boolean;
}>`
  margin-left: ${({ hasContent, theme }) => (hasContent ? theme.spacing.xSmall : 0)};

  ${({ isVerticalCenter }) =>
    isVerticalCenter &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    `}
`;

export const CheckboxLabelContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const CheckboxContainer = styled.div<{ isVerticalCenter?: boolean }>`
  align-items: ${({ isVerticalCenter }) => (isVerticalCenter ? 'center' : 'flex-start')};
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
CheckboxContainer.defaultProps = { theme: defaultTheme };
HiddenCheckbox.defaultProps = { theme: defaultTheme };
CheckboxContentContainer.defaultProps = { theme: defaultTheme };
CheckboxImgContainer.defaultProps = { theme: defaultTheme };
