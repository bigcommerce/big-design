import React, { memo, TdHTMLAttributes } from 'react';

import { PaddingProps } from '../../../mixins';
import { TableColumnDisplayProps } from '../mixins';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps
  extends TdHTMLAttributes<HTMLTableCellElement>,
    TableColumnDisplayProps,
    PaddingProps {
  readonly align?: 'left' | 'center' | 'right';
  readonly children?: React.ReactNode;
  readonly isExpandable?: boolean;
  readonly isCheckbox?: boolean;
  readonly verticalAlign?: 'top' | 'middle';
  readonly width?: number | string;
  readonly withBorder?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({
    align,
    children,
    colSpan,
    display,
    isCheckbox,
    isExpandable = false,
    verticalAlign,
    width,
    withBorder = true,
    paddingHorizontal,
    paddingVertical,
    padding,
  }: DataCellProps) => {
    return isCheckbox ? (
      <StyledTableDataCheckbox
        $display={display}
        $isExpandable={isExpandable}
        $withBorder={withBorder}
        align={align}
        width={width}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        $display={display}
        $padding={padding}
        $paddingHorizontal={paddingHorizontal}
        $paddingVertical={paddingVertical}
        $verticalAlign={verticalAlign}
        $withBorder={withBorder}
        align={align}
        colSpan={colSpan}
        width={width}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
