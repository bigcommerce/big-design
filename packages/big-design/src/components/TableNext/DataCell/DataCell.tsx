import React, { memo, TableHTMLAttributes } from 'react';

import { PaddingProps } from '../../../mixins';
import { TableColumnDisplayProps } from '../mixins';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableColumnDisplayProps,
    PaddingProps {
  align?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
  isExpandable?: boolean;
  isCheckbox?: boolean;
  verticalAlign?: 'top' | 'middle';
  width?: number | string;
  withBorder?: boolean;
}

export const DataCell: React.FC<DataCellProps> = memo(
  ({
    align,
    children,
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
        align={align}
        display={display}
        isExpandable={isExpandable}
        width={width}
        withBorder={withBorder}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        align={align}
        display={display}
        padding={padding}
        paddingHorizontal={paddingHorizontal}
        paddingVertical={paddingVertical}
        verticalAlign={verticalAlign}
        width={width}
        withBorder={withBorder}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
