import { rem } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

export const StyledDropdownItem = styled.li`
  align-items: center;
  background-color: ;
  box-sizing: border-box;
  display: flex;
  height: ${rem(36)};
  justify-content: space-between;
  min-width: ${rem(256)};
  padding: 0 ${({ theme }) => theme.spacing.medium};

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }

  a {
    align-items: center;
    color: ${({ theme }) => theme.colors.secondary70};
    display: flex;
    height: 100%;
    margin: 0 -${({ theme }) => theme.spacing.medium};
    padding: 0 ${({ theme }) => theme.spacing.medium};
    text-decoration: none;
    width: 100%;
  }
`;

StyledDropdownItem.defaultProps = { theme: defaultTheme };
