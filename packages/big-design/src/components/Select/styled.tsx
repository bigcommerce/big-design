import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { StyledButton } from '../Button/styled';
import { StyledGroupHeader } from '../List/GroupHeader/styled';

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

export const StyledListGroupHeader = styled(StyledGroupHeader)`
  font-family: 'Source Sans Pro SemiBold', 'Helvetica Neue', Arial, sans-serif;
  font-size: ${({ theme }) => theme.helpers.remCalc(14)};
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.secondary50};
`;

export const StyledInputContainer = styled.div`
  input[readonly] {
    cursor: pointer;
  }
`;

export const DropdownButton = styled(StyledButton)`
  color: ${({ theme }) => theme.colors.secondary60};
  height: auto;
  padding: 0;
`;

StyledStatusMessage.defaultProps = { theme: defaultTheme };
StyledDropdownIcon.defaultProps = { theme: defaultTheme };
StyledInputContainer.defaultProps = { theme: defaultTheme };
DropdownButton.defaultProps = { theme: defaultTheme };
