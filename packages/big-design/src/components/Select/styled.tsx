import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { hideVisually } from 'polished';
import styled from 'styled-components';

export const StyledStatusMessage = styled.div`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(ArrowDropDownIcon)`
  :hover {
    cursor: pointer;
  }
`;
