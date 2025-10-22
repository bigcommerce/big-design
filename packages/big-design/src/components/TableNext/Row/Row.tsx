import { ChevronRightIcon, DragIndicatorIcon, ExpandMoreIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import { typedMemo } from '../../../utils';
import { MessagingButton } from '../../Button/private';
import { Checkbox } from '../../Checkbox';
import { Flex } from '../../Flex';
import { FlexedProps } from '../../Flex/types';
import { DataCell } from '../DataCell';
import { TableColumn, TableItem, TableSelectable } from '../types';

import { StyledTableRow } from './styled';
import { useRowState } from './useRowState';

interface PrivateProps {
  readonly forwardedRef?: React.Ref<HTMLTableRowElement>;
}

const ALIGN_MAP: Record<string, FlexedProps['justifyContent']> = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export interface RowProps<T> extends ComponentPropsWithoutRef<'tr'> {
  readonly columns: Array<TableColumn<T>>;
  readonly headerCellWidths: Array<number | string>;
  readonly isDraggable: boolean;
  readonly isDragging?: boolean;
  readonly isExpanded?: boolean;
  readonly isExpandable?: boolean;
  readonly isParentRow?: boolean;
  readonly isSelected?: boolean;
  readonly isSelectable?: boolean;
  readonly item: T;
  readonly selectedItems: TableSelectable['selectedItems'];
  readonly showDragIcon?: boolean;
  readonly isChildrenRowsSelectable?: TableSelectable['isChildrenRowsSelectable'];
  readonly onExpandedRow?: () => void;
  readonly onItemSelect: () => void;
  readonly parentRowId: string;
  readonly childRowId?: string;
  readonly childrenRowsIds: string[];
}

const InternalRow = <T extends TableItem>({
  columns,
  forwardedRef,
  headerCellWidths,
  isDraggable,
  isDragging = false,
  isExpandable = false,
  isSelectable = false,
  isSelected = false,
  item,
  showDragIcon = false,
  onItemSelect,
  onExpandedRow,
  isExpanded = false,
  selectedItems,
  isParentRow = false,
  isChildrenRowsSelectable = false,
  parentRowId,
  childRowId,
  childrenRowsIds,
  ...rest
}: RowProps<T> & PrivateProps) => {
  const { hasChildrenRows, isChecked, isIndeterminate, label } = useRowState({
    isParentRow,
    isSelected,
    selectedItems,
    isChildrenRowsSelectable,
    childrenRowsIds,
  });

  const renderSelectDataCell = () => {
    if (isSelectable && isParentRow) {
      return (
        <DataCell isCheckbox={true} isExpandable={isExpandable} key="data-checkbox" width={10}>
          <Checkbox
            checked={isChecked}
            hiddenLabel
            isIndeterminate={isIndeterminate}
            label={label}
            onChange={onItemSelect}
            width={0}
          />
        </DataCell>
      );
    }

    return null;
  };
  const renderDragIconCell = () => {
    if (showDragIcon && isParentRow) {
      return (
        <DataCell padding="small" width={headerCellWidths[0]}>
          <DragIndicatorIcon />
        </DataCell>
      );
    }

    return null;
  };
  const renderExpandedIconCell = () => {
    if (isExpandable && isParentRow && hasChildrenRows) {
      const needsHorizontalPadding = !isSelectable && !isDraggable;

      return (
        <DataCell align="center" paddingHorizontal={needsHorizontalPadding ? 'small' : 'none'}>
          <MessagingButton
            iconOnly={isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            onClick={onExpandedRow}
            type="button"
            variant="subtle"
          />
        </DataCell>
      );
    }

    return null;
  };
  const renderExtraCellsForParentRow = (): ReactNode[] => {
    if (!hasChildrenRows) {
      return [<DataCell key={`parent-extra-cell-${parentRowId}-1`} />];
    }

    return [];
  };
  const renderExtraCellsForChildRow = () => {
    const extraDataCells: ReactNode[] = [<DataCell key={`child-extra-cell-${childRowId}-0`} />];

    if (isDraggable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowId}-1`} />);
    }

    if (isSelectable) {
      extraDataCells.push(<DataCell key={`child-extra-cell-${childRowId}-2`} />);
    }

    return extraDataCells;
  };

  return (
    <StyledTableRow isDragging={isDragging} isSelected={isSelected} ref={forwardedRef} {...rest}>
      {renderDragIconCell()}
      {isParentRow && renderSelectDataCell()}
      {renderExpandedIconCell()}
      {isParentRow && isExpandable && renderExtraCellsForParentRow()}
      {isExpandable && !isParentRow && renderExtraCellsForChildRow()}
      {columns.map(
        (
          { render: CellContent, align, display, verticalAlign, width, withPadding = true },
          columnIndex,
        ) => {
          const cellWidth = headerCellWidths[columnIndex + 1];

          return (
            <DataCell
              align={align}
              display={display}
              key={columnIndex}
              padding={withPadding ? 'small' : 'none'}
              verticalAlign={verticalAlign}
              width={isDragging ? cellWidth : width}
            >
              <Flex
                alignItems="center"
                flexDirection="row"
                justifyContent={align && ALIGN_MAP[align]}
              >
                {columnIndex === 0 && !isParentRow && isChildrenRowsSelectable && (
                  <Checkbox
                    checked={isSelected}
                    hiddenLabel
                    label={label}
                    onChange={onItemSelect}
                    width={0}
                  />
                )}
                <CellContent {...item} />
              </Flex>
            </DataCell>
          );
        },
      )}
    </StyledTableRow>
  );
};

export const Row = typedMemo(
  forwardRef<HTMLTableRowElement, RowProps<any>>((props, ref) => (
    <InternalRow {...props} forwardedRef={ref} />
  )),
);
