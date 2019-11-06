import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

interface StyledTableHeaderCellProps {
  isSortable?: boolean;
  width?: number | string;
  stickyHeader?: boolean;
  stickyHeight: number;
}

export const StyledTableHeaderCell = styled.th<StyledTableHeaderCellProps>`
  background-color: ${({ theme }) => theme.colors.secondary10};
  box-shadow: ${({ theme }) =>
    `inset 0px -1px 0px ${theme.colors.secondary30}, inset 0px 1px 0px ${theme.colors.secondary30}`};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary60};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme }) => theme.spacing.small};
  white-space: nowrap;

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

  ${({ theme, stickyHeader, stickyHeight }) =>
    stickyHeader &&
    stickyHeight >= 0 &&
    css`
      ${theme.breakpoints.tablet} {
        position: sticky;
        top: ${theme.helpers.remCalc(stickyHeight)};
        z-index: ${theme.zIndex.sticky};
      }
    `}
`;

export const StyledTableHeaderCheckbox = styled(StyledTableHeaderCell)`
  width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
  white-space: nowrap;
`;

StyledTableHeaderCell.defaultProps = { theme: defaultTheme };
StyledTableHeaderCheckbox.defaultProps = { theme: defaultTheme };
