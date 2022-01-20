import { ChevronRightIcon, DragIndicatorIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { forwardRef, TableHTMLAttributes, useEffect, useState } from 'react';

import { typedMemo } from '../../../utils';
import { Button } from '../../Button';
import { Checkbox } from '../../Checkbox';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem } from '../types';

import { StyledDataCell, StyledTableRow } from './styled';

export interface RowProps<T> extends TableHTMLAttributes<HTMLTableRowElement> {
  isExpandable?: boolean;
  isDragging?: boolean;
  isSelected?: boolean;
  isSelectable?: boolean;
  item: T;
  columns: Array<TableColumn<T>>;
  showDragIcon?: boolean;
  onItemSelect?(item: T): void;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
}

const InternalRow = <T extends TableItem>({
  columns,
  forwardedRef,
  isExpandable = false,
  isDragging = false,
  isSelectable = false,
  isSelected = false,
  item,
  showDragIcon = false,
  onItemSelect,
  ...rest
}: RowProps<T> & PrivateProps) => {
  const onChange = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const label = isSelected ? `Selected` : `Unselected`;
  const [isExpanded, setIsExpanded] = useState(false);
  const itemHasChild = Boolean(item.expandableContent);
  const colSpan = columns.length + Number(showDragIcon) + Number(isSelectable);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isDragging && isExpanded) {
      setIsExpanded(false);
    }
  }, [isDragging, isExpanded]);

  return (
    <>
      <StyledTableRow isSelected={isSelected} ref={forwardedRef} isDragging={isDragging} {...rest}>
        {isExpandable && (
          <DataCell withPadding={false}>
            {itemHasChild && (
              <Button
                variant="subtle"
                onClick={toggleExpanded}
                iconOnly={isExpanded ? <ExpandMoreIcon color="gray" /> : <ChevronRightIcon color="gray" />}
              />
            )}
          </DataCell>
        )}
        {showDragIcon && (
          <DataCell>
            <DragIndicatorIcon />
          </DataCell>
        )}
        {isSelectable && (
          <DataCell key="data-checkbox" isCheckbox={true}>
            <Checkbox checked={isSelected} hiddenLabel label={label} onChange={onChange} />
          </DataCell>
        )}
        {columns.map(
          ({ render: CellContent, align, display, verticalAlign, width, withPadding = true }, columnIndex) => (
            <DataCell
              key={columnIndex}
              align={align}
              display={display}
              verticalAlign={verticalAlign}
              width={width}
              withPadding={withPadding}
            >
              {/*
              // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
              <CellContent {...item} />
            </DataCell>
          ),
        )}
      </StyledTableRow>
      {isExpanded && (
        <StyledTableRow isSelected={false} isDragging={false}>
          <StyledDataCell withPadding={false} />
          <StyledDataCell colSpan={colSpan}>{item.expandableContent}</StyledDataCell>
        </StyledTableRow>
      )}
    </>
  );
};

export const Row = typedMemo(
  forwardRef<HTMLTableRowElement, RowProps<any>>((props, ref) => <InternalRow {...props} forwardedRef={ref} />),
);
