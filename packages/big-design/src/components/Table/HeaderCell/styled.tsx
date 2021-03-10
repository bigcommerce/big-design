import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { ColumnDisplayProps, withDisplay } from '../../../mixins';
import { Flex } from '../../Flex';

interface StyledTableHeaderCellProps extends ColumnDisplayProps {
  isSortable?: boolean;
  width?: number | string;
  stickyHeader?: boolean;
  stickyHeight: number;
}

interface StyledFlexProps {
  align?: 'left' | 'center' | 'right';
  hide: boolean;
}

export const StyledTableHeaderCell = styled.th<StyledTableHeaderCellProps>`
  ${withDisplay()}

  background-color: ${({ theme }) => theme.colors.secondary10};
  border-bottom: ${({ theme }) => theme.border.box};
  border-top: ${({ theme }) => theme.border.box};
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

export const StyledFlex = styled(Flex)<StyledFlexProps>`
  ${({ align }) => {
    switch (align) {
      case 'center':
        return css`
          justify-content: center;
        `;
      case 'right':
        return css`
          justify-content: flex-end;
        `;
      default:
        return css`
          justify-content: flex-start;
        `;
    }
  }};
  ${({ hide }) => hide && hideVisually()};
`;

StyledFlex.defaultProps = { theme: defaultTheme };
StyledTableHeaderCell.defaultProps = { theme: defaultTheme };
StyledTableHeaderCheckbox.defaultProps = { theme: defaultTheme };
