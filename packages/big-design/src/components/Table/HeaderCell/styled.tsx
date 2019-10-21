import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { HeaderCellProps } from './HeaderCell';

export const StyledTableHeaderCell = styled.th<HeaderCellProps>`
  background-color: ${({ theme }) => theme.colors.secondary10};
  box-shadow: ${({ theme }) =>
    `inset 0px -1px 0px ${theme.colors.secondary30}, inset 0px 1px 0px ${theme.colors.secondary30}`};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme }) => theme.spacing.small};
  white-space: nowrap;

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ isSortable }) =>
    isSortable &&
    css`
      cursor: pointer;
    `};

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : width + 'px'};
    `};

  ${({ stickyHeader }) =>
    stickyHeader &&
    css`
      position: sticky;
      top: 0;
    `}
`;

export const StyledTableHeaderCheckbox = styled(StyledTableHeaderCell)`
  ${props =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};
`;

StyledTableHeaderCell.defaultProps = { theme: defaultTheme };
StyledTableHeaderCheckbox.defaultProps = { theme: defaultTheme };
