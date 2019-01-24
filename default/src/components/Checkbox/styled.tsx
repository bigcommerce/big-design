import { hideVisually } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { TextStyles } from '../Text/styled';

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
  background: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.white)};
  border-radius: ${({ theme }) => theme.border.radius};
  border: ${({ theme }) => theme.border.box};
  border-color: ${props => (props.checked ? props.theme.colors.primary40 : props.theme.colors.secondary30)};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  height: ${({ theme }) => theme.spacing.large};
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

export const StyledLabel = styled.label`
  ${TextStyles};
  margin-left: ${({ theme }) => theme.spacing.medium};
`;

StyledCheckbox.defaultProps = { theme: defaultTheme };
StyledLabel.defaultProps = { theme: defaultTheme };
