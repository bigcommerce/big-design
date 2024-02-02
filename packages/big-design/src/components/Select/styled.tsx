import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import { css, styled } from 'styled-components';

import { StyleableButton } from '../Button/private';

export const StyledStatusMessage = styled.div`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(ArrowDropDownIcon)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        cursor: pointer;
      }
    `}
`;

export const StyledInputContainer = styled.div`
  input[readonly] {
    cursor: pointer;
  }
`;

export const DropdownButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary60};
  height: auto;
  padding: 0;
`;

StyledStatusMessage.defaultProps = { theme: defaultTheme };
StyledDropdownIcon.defaultProps = { theme: defaultTheme };
StyledInputContainer.defaultProps = { theme: defaultTheme };
DropdownButton.defaultProps = { theme: defaultTheme };
