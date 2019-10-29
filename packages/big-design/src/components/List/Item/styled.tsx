import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { ListItemProps } from './Item';

export const StyledListItem = styled.li<ListItemProps>`
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.helpers.remCalc(36)};
  justify-content: space-between;
  min-width: ${({ theme }) => theme.helpers.remCalc(256)};
  outline: none;
  padding: 0 ${({ theme }) => theme.spacing.medium};

  &[aria-selected='true'] {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  }

  &[data-highlighted='true'],
  &[data-highlighted='true'] a {
    ${({ actionType, disabled }) =>
      !disabled &&
      (actionType === 'normal'
        ? css`
            background-color: ${({ theme }) => theme.colors.primary10};
            color: ${({ theme }) => theme.colors.primary};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.danger10};
            color: ${({ theme }) => theme.colors.danger50};
          `)}
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.secondary40};
      cursor: not-allowed;
    `}

  a {
    color: ${({ theme }) => theme.colors.secondary70};
  }

  label {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

StyledListItem.defaultProps = { theme: defaultTheme };
