import React, { ComponentPropsWithoutRef, memo } from 'react';

import { TableColumnDisplayProps } from '../helpers';

import {
  StyledActionsWrapper,
  StyledMobileHeader,
  StyledTableActionCell,
  StyledTableDataCell,
  StyledTableDataCheckbox,
} from './styled';

export interface DataCellProps extends ComponentPropsWithoutRef<'td'>, TableColumnDisplayProps {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withBorder?: boolean;
  withPadding?: boolean;
  colSpan?: number;
  rowSpan?: number;
  mobileHeader?: string;
  isAction?: boolean;
  isDraggable?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({
    align,
    children,
    display,
    isCheckbox,
    verticalAlign,
    width,
    withBorder = true,
    withPadding = true,
    colSpan,
    rowSpan,
    mobileHeader,
    isAction = false,
    isDraggable = false,
  }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox
        align={align}
        colSpan={colSpan}
        display={display}
        rowSpan={rowSpan}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : isAction ? (
      <StyledTableActionCell
        align={align}
        colSpan={colSpan}
        display={display}
        rowSpan={rowSpan}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
        withPadding={withPadding}
      >
        <StyledActionsWrapper>{children}</StyledActionsWrapper>
      </StyledTableActionCell>
    ) : (
      <StyledTableDataCell
        align={align}
        colSpan={colSpan}
        display={display}
        isDraggable={isDraggable}
        rowSpan={rowSpan}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
        withPadding={withPadding}
      >
        {mobileHeader ? (
          <StyledMobileHeader aria-hidden="true">{mobileHeader}</StyledMobileHeader>
        ) : null}
        {children}
      </StyledTableDataCell>
    );
  },
);
