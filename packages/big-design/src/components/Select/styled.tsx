import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../Button/private';

export const StyledStatusMessage = styled.div.attrs(withDefaultTheme)`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(ArrowDropDownIcon).attrs(withDefaultTheme)<{
  disabled?: boolean;
}>`
  ${({ disabled }) =>
    !disabled &&
    css`
      :hover {
        cursor: pointer;
      }
    `}
`;

export const StyledInputContainer = styled.div.attrs(withDefaultTheme)`
  input[readonly] {
    cursor: pointer;
  }
`;

export const DropdownButton = styled(StyleableButton).attrs(withDefaultTheme)`
  color: ${({ theme }) => theme.colors.secondary60};
  height: auto;
  padding: 0;
`;
