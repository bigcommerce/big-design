import { ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyledInput } from '../Input/styled';

export const StyledStatusMessage = styled.div`
  ${hideVisually()}
`;

export const StyledDropdownIcon = styled(ArrowDropDownIcon)`
  :hover {
    cursor: pointer;
  }
`;

export const Test = styled(StyledInput).attrs({
  as: 'div',
})`
  display: flex;
` as StyledComponent<'div', DefaultTheme>;

Test.defaultProps = { theme: defaultTheme };
