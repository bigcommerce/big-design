import { hideVisually } from 'polished';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { defaultTheme } from '../../theme';
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
  ${({ theme }) => theme.border.box};
  ${({ theme }) => theme.borderRadius.normal};

  align-items: center;
  background: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.white)};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  color: ${({ theme }) => theme.colors.white};
  display: inline-flex;
  height: ${({ theme }) => theme.spacing.large};
  justify-content: center;
  transition: all 150ms;
  user-select: none;
  width: ${({ theme }) => theme.spacing.large};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary20};
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
