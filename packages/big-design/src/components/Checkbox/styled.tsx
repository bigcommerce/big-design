import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableText } from '../Typography/private';

interface StyledCheckboxProps {
  checked?: boolean;
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
  background: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.white)};
  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
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
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement>>`
  margin-left: ${({ theme }) => theme.spacing.medium};
` as StyledComponent<'label', DefaultTheme>;

StyledCheckbox.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
