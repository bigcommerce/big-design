import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableText } from '../Typography/private';

interface StyledCheckboxProps {
  checked?: boolean;
  isIndeterminate?: boolean;
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
  align-items: center;
  background: ${({ checked, isIndeterminate, theme }) =>
    checked || isIndeterminate ? theme.colors.primary : theme.colors.white};
  border: ${({ theme }) => theme.border.box};
  border-color: ${({ checked, isIndeterminate, theme }) =>
    checked || isIndeterminate ? theme.colors.primary : theme.colors.secondary30};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  color: ${({ theme }) => theme.colors.white};
  display: inline-flex;
  height: ${({ theme }) => theme.spacing.large};
  justify-content: center;
  transition: all 150ms;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 ${theme.spacing.xxSmall} ${theme.colors.primary20}`};
  }

  svg {
    visibility: ${({ checked, isIndeterminate }) => (checked || isIndeterminate ? 'visible' : 'hidden')};
  }
`;

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement> & StyledLabelProps>`
  margin-left: ${({ theme }) => theme.spacing.xSmall};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.secondary40};
    `}

  ${({ hidden }) => hidden && hideVisually()}
` as StyledComponent<'label', DefaultTheme, StyledLabelProps>;

StyledCheckbox.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
