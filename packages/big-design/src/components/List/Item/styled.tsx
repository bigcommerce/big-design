import { rem } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

export const StyledListItem = styled.li`
  align-items: center;
  box-sizing: border-box;
  cursor: default;
  display: flex;
  height: ${rem(36)};
  justify-content: space-between;
  min-width: ${rem(256)};
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.medium};

  &[aria-selected='true'] {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }

  &[data-highlighted='true'] {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }

  a {
    align-items: center;
    color: ${({ theme }) => theme.colors.secondary70};
    cursor: pointer;
    display: flex;
    height: 100%;
    margin: 0 -${({ theme }) => theme.spacing.medium};
    padding: 0 ${({ theme }) => theme.spacing.medium};
    text-decoration: none;
    width: 100%;
  }
`;

StyledListItem.defaultProps = { theme: defaultTheme };
