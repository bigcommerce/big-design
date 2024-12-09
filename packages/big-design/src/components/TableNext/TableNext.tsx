import React, { memo, useCallback, useId, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { MarginProps } from '../../helpers';
import { typedMemo } from '../../utils';

import { Actions } from './Actions';
import { Body } from './Body';
import { discriminatePagination } from './discriminatePagination';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import {
  DragIconHeaderCell,
  ExpandableHeaderCell,
  HeaderCheckboxCell,
} from './HeaderCell/HeaderCell';
import { getPagedIndex } from './helpers';
import { useExpandable, useSelectable } from './hooks';
import { RowContainer } from './RowContainer';
import { StyledTable, StyledTableFigure } from './styled';
import { Localization, TableColumn, TableItem, TableProps } from './types';

const defaultLocalization: Required<Localization> = {
  ascendingOrder: 'Ascending order',
  descendingOrder: 'Descending order',
  controlsLabel: 'Table Controls',
};

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
    localization: customLocalization,
    pagination: undiscriminatedPagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    onRowDrop,
    getRowId = (_item, parentRowIndex, childRowIndex) => {
      if (childRowIndex !== undefined) {
        return `${parentRowIndex}.${childRowIndex}`;
      }

      return `${parentRowIndex}`;
    },
    ...rest
  } = props;
  const localization = useMemo(
    () => ({ ...defaultLocalization, ...customLocalization }),
    [customLocalization],
  );
  const pagination = useMemo(
    () => undiscriminatedPagination && discriminatePagination(undiscriminatedPagination),
    [undiscriminatedPagination],
  );
  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useId();
  const tableIdRef = useRef(id || uniqueTableId);
  const [headerCellWidths, setHeaderCellWidths] = useState<Array<number | string>>([]);
  const headerCellIconRef = useRef<HTMLTableCellElement>(null);
  const {
    isSelectable,
    onItemSelect,
    selectedItems,
    isChildrenRowsSelectable,
    setSelectedParentRowsCrossPages,
    selectedParentRowsCrossPages,
  } = useSelectable(selectable);
  const { expandedRows, getChildren, isExpandable, onExpandedRow, setExpandedRows } =
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

        {getChildren !== undefined && (
          <ExpandableHeaderCell actionsRef={actionsRef} headerCellIconRef={headerCellIconRef} />
        )}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader, width } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable?.direction;
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
              localization={localization}
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
            const pagedIndex = getPagedIndex(index, pagination);

            return (
              <Draggable draggableId={String(key)} index={index} key={key}>
                {(provided, snapshot) => (
                  <RowContainer
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    columns={columns}
                    expandedRows={expandedRows}
                    getChildren={getChildren}
                    getItemKey={getItemKey}
                    getLoadMoreAction={expandable?.getLoadMoreAction}
                    getRowId={getRowId}
                    headerCellWidths={headerCellWidths}
                    isChildrenRowsSelectable={isChildrenRowsSelectable}
                    isExpandable={isExpandable}
                    isSelectable={isSelectable}
                    item={item}
                    key={key}
                    onExpandedRow={onExpandedRow}
                    onItemSelect={onItemSelect}
                    parentRowIndex={pagedIndex}
                    ref={provided.innerRef}
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
          const pagedIndex = getPagedIndex(index, pagination);

          return (
            <RowContainer
              columns={columns}
              expandedRows={expandedRows}
              getChildren={getChildren}
              getItemKey={getItemKey}
              getLoadMoreAction={expandable?.getLoadMoreAction}
              getRowId={getRowId}
              headerCellWidths={headerCellWidths}
              headerless={headerless}
              isChildrenRowsSelectable={isChildrenRowsSelectable}
              isExpandable={isExpandable}
              isSelectable={isSelectable}
              item={item}
              key={key}
              onExpandedRow={onExpandedRow}
              onItemSelect={onItemSelect}
              parentRowIndex={pagedIndex}
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
          forwardedRef={actionsRef}
          getChildren={getChildren}
          getRowId={getRowId}
          isChildrenRowsSelectable={isChildrenRowsSelectable}
          itemName={itemName}
          items={items}
          label={localization.controlsLabel}
          onSelectionChange={selectable?.onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          selectedParentRowsCrossPages={selectedParentRowsCrossPages}
          setSelectedParentRowsCrossPages={setSelectedParentRowsCrossPages}
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
