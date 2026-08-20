import React, { type ComponentPropsWithoutRef, memo } from 'react';

import type { PaddingProps } from '../../../helpers';
import { toTransientPaddingProps } from '../../../helpers/paddings/paddings';
import type { TableColumnDisplayProps } from '../helpers';

import { StyledTableDataCell, StyledTableDataCheckbox } from './styled';

export interface DataCellProps
  extends ComponentPropsWithoutRef<'td'>,
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
        $align={align}
        $display={display}
        $isExpandable={isExpandable}
        $width={width}
        $withBorder={withBorder}
      >
        {children}
      </StyledTableDataCheckbox>
    ) : (
      <StyledTableDataCell
        $align={align}
        $display={display}
        $verticalAlign={verticalAlign}
        $width={width}
        $withBorder={withBorder}
        colSpan={colSpan}
        {...toTransientPaddingProps({ padding, paddingHorizontal, paddingVertical })}
      >
        {children}
      </StyledTableDataCell>
    );
  },
);
