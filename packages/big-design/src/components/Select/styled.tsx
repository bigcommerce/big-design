import { hideVisually } from 'polished';
import styled from 'styled-components';

import { DropdownIcon } from '../Icons';

export const StyledStatusMessage = styled.div`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(DropdownIcon)`
  :hover {
    cursor: pointer;
  }
`;
