import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { ListItemProps } from './Item';

export const StyledListItem = styled.li<ListItemProps>`
  align-items: center;
  box-sizing: border-box;
  cursor: default;
  display: flex;
  height: ${({ theme }) => theme.helpers.remCalc(36)};
  justify-content: space-between;
  min-width: ${({ theme }) => theme.helpers.remCalc(256)};
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

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: inherit;
      color: ${theme.colors.secondary40};

      :hover {
        background-color: inherit;
      }
    `}
`;

StyledListItem.defaultProps = { theme: defaultTheme };
