import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTableColumnDisplay } from '../helpers';

import { DataCellProps } from './DataCell';

// TODO: Use PaddingProps
export const StyledTableDataCell = styled.td<DataCellProps>`
  ${withTableColumnDisplay()}

  /* mobile first */
  display: block;

  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  padding: ${({ theme, withPadding }) => (withPadding ? theme.spacing.small : 0)};

  &:first-of-type {
    padding-inline-start: ${({ theme }) => theme.spacing.small};
  }

  &:last-of-type {
    padding-inline-end: ${({ theme, withPadding }) => (withPadding ? theme.spacing.xLarge : 0)};
  }

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};

  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      vertical-align: ${verticalAlign};
    `};

  ${({ width }) =>
    width !== undefined &&
    css`
      width: ${typeof width === 'string' ? width : `${width}px`};
    `};

  ${({ isDraggable }) =>
    isDraggable &&
    css`
      display: flex;
      align-items: center;
      position: absolute;
      inset-block-start: 0;
      inset-block-end: 0;
      width: 42px;
      justify-content: center;

      &:first-of-type {
        padding: ${({ theme }) => theme.spacing.none};
      }
      & ~ td {
        padding-inline-start: ${({ theme }) => theme.spacing.xxxLarge};
      }

      @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
        position: static;
        display: table-cell;

        &:first-of-type {
          padding: ${({ theme }) => theme.spacing.small};
        }

        & ~ td {
          padding-inline-start: ${({ theme }) => theme.spacing.small};
        }
      }
    `};

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: table-cell;

    ${({ theme, withBorder }) =>
      withBorder &&
      css`
        border-bottom: ${theme.border.box};
      `}

    &:first-of-type {
      padding-inline-start: ${({ theme, withPadding }) => (withPadding ? theme.spacing.xLarge : 0)};
    }
  }
`;

export const StyledTableDataCheckbox = styled(StyledTableDataCell)`
  ${withTableColumnDisplay()}

  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  width: min-content;
  display: block;
  padding-block-start: ${({ theme }) => theme.spacing.small};

  &:first-of-type {
    padding-inline-start: ${({ theme }) => theme.spacing.small};
  }
  &:nth-of-type(2) {
    padding-inline-start: ${({ theme }) => theme.spacing.small};
  }

  ${(props) =>
    props.isCheckbox &&
    css`
      width: ${({ theme }) => theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.small)};
      white-space: nowrap;
    `};

  & ~ td {
    padding-inline-start: ${({ theme }) => theme.spacing.xxxLarge};
  }

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    position: static;
    display: table-cell;
    padding-block-start: 0;

    &:first-of-type {
      padding-inline-start: ${({ theme }) => theme.spacing.xLarge};
    }
    &:nth-of-type(2) {
      padding-inline-start: ${({ theme }) => theme.spacing.xxSmall};
    }

    &:last-of-type {
      padding-inline-end: ${({ theme }) => theme.spacing.xLarge};
    }

    & ~ td {
      padding-inline-start: ${({ theme }) => theme.spacing.small};
    }
  }
`;

export const StyledTableActionCell = styled(StyledTableDataCell)`
  &:last-of-type {
    padding: ${({ theme }) => theme.spacing.none};
    position: absolute;
    inset-block-start: ${({ theme }) => theme.spacing.small};
    inset-inline-end: ${({ theme }) => theme.spacing.small};
    width: min-content;
    display: block;
    margin: ${({ theme }) => theme.spacing.none};

    @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
      position: static;
      display: table-cell;
      padding-inline-end: ${({ theme }) => theme.spacing.xLarge};
      text-align: end;
    }
  }
`;

export const StyledActionsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  width: min-content;
`;

export const StyledMobileHeader = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: block;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
    margin-bottom: ${({ theme }) => theme.spacing.xSmall};
  }
`;

StyledTableDataCell.defaultProps = { theme: defaultTheme };
StyledTableDataCheckbox.defaultProps = { theme: defaultTheme };
StyledTableActionCell.defaultProps = { theme: defaultTheme };
StyledActionsWrapper.defaultProps = { theme: defaultTheme };
StyledMobileHeader.defaultProps = { theme: defaultTheme };
