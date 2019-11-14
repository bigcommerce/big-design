import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

export const StyledStatusMessage = styled.div`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(ArrowDropDownIcon)<{ disabled?: boolean }>`
  :hover {
    cursor: pointer;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      :hover {
        cursor: default;
      }
    `}
`;

export const StyledInputContainer = styled.div`
  input[readonly] {
    cursor: pointer;
  }
`;
