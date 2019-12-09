import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { StyleableText } from '../Typography/private';

interface StyledCheckboxProps {
  checked?: boolean;
  isIndeterminate?: boolean;
  disabled?: boolean;
}

export interface StyledLabelProps {
  hidden?: boolean;
  disabled?: boolean;
}

export const CheckboxContainer = styled.div`
  align-items: center;
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
  border: ${({ theme }) => theme.border.box};
  border-color: ${({ checked, isIndeterminate, theme }) =>
    checked || isIndeterminate ? theme.colors.primary : theme.colors.secondary30};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: inline-flex;
  height: ${({ theme }) => theme.spacing.large};
  justify-content: center;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${({ checked, disabled, isIndeterminate, theme }) =>
    disabled &&
    css`
      background: ${checked || isIndeterminate ? theme.colors.secondary30 : theme.colors.secondary10};
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

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement> & StyledLabelProps>`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.xSmall};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      color: ${theme.colors.secondary40};
    `}

  ${({ hidden }) => hidden && hideVisually()}
` as StyledComponent<'label', DefaultTheme, StyledLabelProps>;

StyledCheckbox.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
