import React, { memo, useCallback, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useUniqueId } from '../../hooks';
import { MarginProps } from '../../mixins';
import { typedMemo } from '../../utils';

import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import {
  DragIconHeaderCell,
  ExpandableHeaderCell,
  HeaderCheckboxCell,
} from './HeaderCell/HeaderCell';
import { useExpandable, useSelectable } from './hooks';
import { RowContainer } from './RowContainer';
import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';

const InternalTableNext = <T extends TableItem>(
  props: TableProps<T>,
): React.ReactElement<TableProps<T>> => {
  const {
    actions,
    className,
    columns,
    emptyComponent,
    expandable,
    headerless = false,
    id,
    itemName,
    items,
    keyField = 'id',
    pagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    onRowDrop,
    ...rest
  } = props;

  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useUniqueId('table');
  const tableIdRef = useRef(id || uniqueTableId);
  const [headerCellWidths, setHeaderCellWidths] = useState<Array<number | string>>([]);
  const headerCellIconRef = useRef<HTMLTableCellElement>(null);
  const { isSelectable, onItemSelect, selectedItems } = useSelectable(selectable);
  const { expandedRows, expandedRowSelector, isExpandable, onExpandedRow, setExpandedRows } =
    useExpandable(expandable);

  const onSortClick = useCallback(
    (column: TableColumn<T>) => {
      if (!sortable || !column.isSortable) {
        return;
      }

      const { hash } = column;
      const sortDirection = sortable.direction === 'ASC' ? 'DESC' : 'ASC';

      if (typeof sortable.onSort === 'function') {
        sortable.onSort(hash, sortDirection, column);
      }
    },
    [sortable],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      if (typeof onRowDrop === 'function') {
        onRowDrop(source.index, destination.index);
      }

      setHeaderCellWidths([]);
    },
    [onRowDrop],
  );

  const onBeforeCapture = () => {
    if (isExpandable) {
      setExpandedRows({});
    }
  };

  const onBeforeDragStart = () => {
    const headerCellIconWidth = headerCellIconRef.current?.offsetWidth ?? 'auto';

    const headerCellsWidths = columns.map((_column, index) => {
      const headerCellElement = window.document.getElementById(`header-cell-${index}`);

      return headerCellElement?.getBoundingClientRect().width ?? 'auto';
    });

    const allHeaderWidths = [headerCellIconWidth, ...headerCellsWidths];

    setHeaderCellWidths(allHeaderWidths);
  };

  const shouldRenderActions = () => {
    return Boolean(actions) || Boolean(pagination) || Boolean(selectable) || Boolean(itemName);
  };

  const getItemKey = (item: T, index: number): string | number => {
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  const renderHeaders = () => (
    <Head hidden={headerless}>
      <tr>
        {typeof onRowDrop === 'function' && (
          <DragIconHeaderCell actionsRef={actionsRef} headerCellIconRef={headerCellIconRef} />
        )}
        {isSelectable && <HeaderCheckboxCell actionsRef={actionsRef} stickyHeader={stickyHeader} />}

        {expandedRowSelector !== undefined && (
          <ExpandableHeaderCell actionsRef={actionsRef} headerCellIconRef={headerCellIconRef} />
        )}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader, width } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;
          const headerCellWidth = headerCellWidths[index + 1];
          const widthColumn = headerCellWidth ?? width;

          return (
            <HeaderCell
              actionsRef={actionsRef}
              column={{ ...column, width: widthColumn }}
              display={display}
              hide={hideHeader}
              id={`header-cell-${index}`}
              isSorted={isSorted}
              key={index}
              onSortClick={onSortClick}
              sortDirection={sortDirection}
              stickyHeader={stickyHeader}
            >
              {header}
            </HeaderCell>
          );
        })}
      </tr>
    </Head>
  );

  const renderDroppableItems = () => (
    <Droppable droppableId={`${uniqueTableId}-bd-droppable`}>
      {(provided) => (
        <Body ref={provided.innerRef} withFirstRowBorder={headerless} {...provided.droppableProps}>
          {items.map((item: T, index) => {
            const key = getItemKey(item, index);

            return (
              <Draggable draggableId={String(key)} index={index} key={key}>
                {(provided, snapshot) => (
                  <RowContainer
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    columns={columns}
                    expandedRowSelector={expandedRowSelector}
                    expandedRows={expandedRows}
                    getItemKey={getItemKey}
                    headerCellWidths={headerCellWidths}
                    isExpandable={isExpandable}
                    isSelectable={isSelectable}
                    item={item}
                    key={key}
                    onExpandedRow={onExpandedRow}
                    onItemSelect={onItemSelect}
                    parentRowIndex={index}
                    ref={provided.innerRef}
                    renderHelperRow={expandable?.renderHelperRow}
                    selectedItems={selectedItems}
                    showDragIcon={true}
                  />
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </Body>
      )}
    </Droppable>
  );

  const renderItems = () =>
    onRowDrop ? (
      renderDroppableItems()
    ) : (
      <Body withFirstRowBorder={headerless}>
        {items.map((item: T, index) => {
          const key = getItemKey(item, index);

          return (
            <RowContainer
              columns={columns}
              expandedRowSelector={expandedRowSelector}
              expandedRows={expandedRows}
              getItemKey={getItemKey}
              headerCellWidths={headerCellWidths}
              headerless={headerless}
              isExpandable={isExpandable}
              isSelectable={isSelectable}
              item={item}
              key={key}
              onExpandedRow={onExpandedRow}
              onItemSelect={onItemSelect}
              parentRowIndex={index}
              renderHelperRow={expandable?.renderHelperRow}
              selectedItems={selectedItems}
            />
          );
        })}
      </Body>
    );

  const renderEmptyState = () => {
    if (items.length === 0 && emptyComponent) {
      return emptyComponent;
    }

    return null;
  };

  return (
    <>
      {shouldRenderActions() && (
        <Actions
          customActions={actions}
          expandedRowSelector={expandedRowSelector}
          forwardedRef={actionsRef}
          isExpandable={isExpandable}
          itemName={itemName}
          items={items}
          onSelectionChange={selectable && selectable.onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          stickyHeader={stickyHeader}
          tableId={tableIdRef.current}
        />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {onRowDrop ? (
          <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragEnd={onDragEnd}
          >
            {renderHeaders()}
            {renderItems()}
          </DragDropContext>
        ) : (
          <>
            {renderHeaders()}
            {renderItems()}
          </>
        )}
      </StyledTable>

      {renderEmptyState()}
    </>
  );
};

export const TableNext = typedMemo(InternalTableNext);
export const TableFigureNext: React.FC<{ children?: React.ReactNode } & MarginProps> = memo(
  (props) => <StyledTableFigure {...props} />,
);
