import React, { forwardRef } from 'react';

import { typedMemo } from '../../../utils';
import { StyleableButton } from '../../Button/Button';
import { DataCell } from '../DataCell';
import { OnItemSelectFn } from '../hooks';
import { Row, RowProps } from '../Row';
import { TableExpandable, TableItem, TableProps } from '../types';

import { calculateColSpan } from './helpers';

interface InternalRowContainerProps<T>
  extends Pick<
    RowProps<T>,
    | 'isChildrenRowsSelectable'
    | 'showDragIcon'
    | 'selectedItems'
    | 'item'
    | 'isSelectable'
    | 'isExpandable'
    | 'headerCellWidths'
    | 'columns'
    | 'isDragging'
  > {
  expandedRows: TableExpandable<T>['expandedRows'];
  getChildren?: TableExpandable<T>['getChildren'];
  getItemKey: (item: T, index: number) => string | number;
  headerless?: boolean;
  getLoadMoreAction?: TableExpandable<T>['getLoadMoreAction'];
  parentRowIndex: number;
  getRowId: NonNullable<TableProps<T>['getRowId']>;
  onItemSelect?: OnItemSelectFn;
  onExpandedRow?(parentRowId?: string): void;
}

interface PrivateProps {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
}

const InternalRowContainer = <T extends TableItem>({
  isDragging,
  columns,
  expandedRows,
  forwardedRef,
  headerCellWidths,
  isExpandable = false,
  isSelectable = false,
  item,
  getLoadMoreAction,
  parentRowIndex,
  showDragIcon,
  getChildren,
  getItemKey,
  onItemSelect,
  onExpandedRow,
  isChildrenRowsSelectable = false,
  selectedItems,
  getRowId = () => '',
  ...rest
}: InternalRowContainerProps<T> & PrivateProps) => {
  const parentRowId = getRowId(item, parentRowIndex);
  const isParentRowSelected = selectedItems[parentRowId] !== undefined;
  const isExpanded = expandedRows[parentRowId] !== undefined;
  const childrenRows: T[] | undefined = getChildren ? getChildren?.(item) : [];
  const isDraggable: boolean = showDragIcon === true;
  const loadMoreAction = getLoadMoreAction?.(parentRowId);

  const childrenRowsIds =
    childrenRows?.map((childRow, childRowIndex) => {
      return getRowId(childRow, parentRowIndex, childRowIndex);
    }) ?? [];

  const onParentRowSelect = () => {
    if (onItemSelect) {
      onItemSelect({
        isParentRow: true,
        parentRowId,
        childRowId: undefined,
        childrenRowsIds,
      });
    }
  };

  const onExpandedRowChange = () => {
    if (onExpandedRow) {
      onExpandedRow(parentRowId);
    }
  };

  return (
    <>
      <Row
        childrenRowsIds={childrenRowsIds}
        columns={columns}
        headerCellWidths={headerCellWidths}
        isChildrenRowsSelectable={isChildrenRowsSelectable}
        isDraggable={isDraggable}
        isDragging={isDragging}
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        isParentRow={true}
        isSelectable={isSelectable}
        isSelected={isParentRowSelected}
        item={item}
        onExpandedRow={onExpandedRowChange}
        onItemSelect={onParentRowSelect}
        parentRowId={parentRowId}
        ref={forwardedRef}
        selectedItems={selectedItems}
        showDragIcon={showDragIcon}
        {...rest}
      />
      {childrenRows &&
        isExpanded &&
        childrenRows?.map((childRow: T, childRowIndex: number) => {
          const key = getItemKey(childRow, childRowIndex);
          const childRowId = getRowId(childRow, parentRowIndex, childRowIndex);
          const isChildRowSelected = selectedItems[childRowId] !== undefined;
          const onChilRowSelect = () => {
            if (onItemSelect) {
              onItemSelect({
                isParentRow: false,
                parentRowId,
                childRowId,
                childrenRowsIds,
              });
            }
          };

          return (
            <Row
              childRowId={childRowId}
              childrenRowsIds={childrenRowsIds}
              columns={columns}
              headerCellWidths={headerCellWidths}
              isChildrenRowsSelectable={isChildrenRowsSelectable}
              isDraggable={isDraggable}
              isDragging={false}
              isExpandable={isExpandable}
              isParentRow={false}
              isSelectable={isSelectable} // for rendering extra cells
              isSelected={isChildRowSelected}
              item={childRow}
              key={key}
              onItemSelect={onChilRowSelect}
              parentRowId={parentRowId}
              selectedItems={selectedItems}
              showDragIcon={showDragIcon}
            />
          );
        })}
      {isExpanded && childrenRows !== undefined && loadMoreAction && (
        <tr key={`extra-helper-row-${parentRowIndex}`}>
          <DataCell
            colSpan={calculateColSpan({ columns, isExpandable, isDraggable, isSelectable })}
          >
            <StyleableButton
              isLoading={loadMoreAction.isLoading}
              onClick={(e) => loadMoreAction.onClick(e, parentRowIndex)}
              style={{ width: '100%' }}
              variant="subtle"
            >
              {loadMoreAction.text}
            </StyleableButton>
          </DataCell>
        </tr>
      )}
    </>
  );
};

export const RowContainer = typedMemo(
  forwardRef<HTMLTableRowElement, InternalRowContainerProps<any>>((props, ref) => (
    <InternalRowContainer {...props} forwardedRef={ref} />
  )),
);
