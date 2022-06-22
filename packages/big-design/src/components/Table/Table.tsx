import { createTable, getCoreRowModel, useTableInstance } from '@tanstack/react-table';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useUniqueId } from '../../hooks';
import { MarginProps } from '../../mixins';
import { typedMemo } from '../../utils';

import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { DragIconHeaderCell, HeaderCheckboxCell } from './HeaderCell/HeaderCell';
import { Row } from './Row';
import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    actions,
    className,
    columns,
    emptyComponent,
    headerless = false,
    id,
    itemName,
    items,
    keyField = 'id',
    onRowDrop,
    pagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    ...rest
  } = props;

  const table = createTable().setRowType<TableItem>();
  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useUniqueId('table');
  const tableIdRef = useRef(id || uniqueTableId);
  const isSelectable = Boolean(selectable);

  // TODO: Refactor this.
  const convertSelectedItems = (selectedItems: T[]) => {
    if (selectedItems.length === 0) {
      return {};
    }

    const reactTableSelectedItems: Record<string, boolean> = {};

    selectedItems.forEach((selectedItem) => {
      const index = items.findIndex((item) => selectedItem === item);

      if (index >= 0) {
        reactTableSelectedItems[index] = true;
      }
    });

    return reactTableSelectedItems;
  };
  const [reactTableSelectedItems, setReactTableSelectedItems] = useState<Record<string, boolean>>(
    convertSelectedItems(selectable?.selectedItems ?? []),
  );

  const [headerCellWidths, setHeaderCellWidths] = useState<Array<number | string>>([]);
  const headerCellIconRef = useRef<HTMLTableCellElement>(null);

  const columnsReactTable = useMemo(() => {
    return columns.map((column) => {
      const { header: columnHeader, hash } = column;

      return table.createDataColumn(hash, {
        header: columnHeader,
        meta: { ...column },
      });
    });
  }, [columns, table]);

  // TODO: check if we should implement sorting react table functionality.
  // TODO: check if we should implement pagination react table functionality.
  // TODO: Remove debugs when finishing.
  const instanceReactTable = useTableInstance(table, {
    data: items,
    columns: columnsReactTable,
    manualSorting: true,
    manualPagination: true,
    state: {
      rowSelection: reactTableSelectedItems,
    },
    enableRowSelection: true,
    onRowSelectionChange: setReactTableSelectedItems,
    getSubRows: (row: any) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const onSelectionChange = selectable?.onSelectionChange;
  const selectedItems = selectable?.selectedItems ?? [];

  // TODO: Refactor this. create a hook for select functionality?
  const filterSelectedItems = (selectedItems: T[], reactTableSelectedItems: Record<string, boolean>) => {
    const selectedItemsFromOtherPages = selectedItems.filter((selectedItem) => {
      const item = items.find((item) => item === selectedItem);

      return item === undefined;
    });

    const selectedItemsFromCurrentPage = items.filter((item, index) => {
      if (reactTableSelectedItems[index]) {
        return item;
      }
    });

    return [...selectedItemsFromOtherPages, ...selectedItemsFromCurrentPage];
  };

  // TODO: Refactor this. create a hook for select functionality?
  // TODO: Fix pagination + selection when using stateful table component
  useEffect(() => {
    if (onSelectionChange) {
      const newSelectedItems = filterSelectedItems(selectedItems, reactTableSelectedItems);

      onSelectionChange(newSelectedItems);
    }
  }, [items, reactTableSelectedItems, onSelectionChange]);

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
      {instanceReactTable.getHeaderGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id}>
            {typeof onRowDrop === 'function' && (
              <DragIconHeaderCell
                actionsRef={actionsRef}
                width={headerCellWidths.length ? headerCellWidths[0] : 'auto'}
                headerCellIconRef={headerCellIconRef}
              />
            )}
            {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} actionsRef={actionsRef} />}

            {headerGroup.headers.map((header, index) => {
              // TODO: Check this type.
              const column = instanceReactTable.getColumn(header.id).columnDef.meta as TableColumn<T>;
              const { display, hash, isSortable, hideHeader, width } = column;
              const isSorted = isSortable && sortable && hash === sortable.columnHash;
              const sortDirection = sortable && sortable.direction;
              const headerCellWidth = headerCellWidths[index + 1];
              const widthColumn = headerCellWidth ?? width;

              return (
                <HeaderCell
                  display={display}
                  column={{ ...column, width: widthColumn }}
                  hide={hideHeader}
                  id={`header-cell-${index}`}
                  isSorted={isSorted}
                  key={header.id}
                  onSortClick={onSortClick}
                  sortDirection={sortDirection}
                  stickyHeader={stickyHeader}
                  actionsRef={actionsRef}
                >
                  {header.renderHeader()}
                </HeaderCell>
              );
            })}
          </tr>
        );
      })}
    </Head>
  );

  const renderDroppableItems = () => (
    <Droppable droppableId={`${uniqueTableId}-bd-droppable`}>
      {(provided) => (
        <Body withFirstRowBorder={headerless} ref={provided.innerRef} {...provided.droppableProps}>
          {instanceReactTable.getRowModel().rows.map((row, index) => {
            const reactTableRow = row.original as T;
            const key = getItemKey(reactTableRow, index);
            // TODO: Check this type.
            const reactTableColumns = instanceReactTable.getAllColumns() as unknown as Array<TableColumn<T>>;

            return (
              <Draggable key={key} draggableId={String(key)} index={index}>
                {(provided, snapshot) => (
                  <Row
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    columns={reactTableColumns}
                    headerCellWidths={headerCellWidths}
                    isIndeterminate={row.getIsSomeSelected()}
                    isSelectable={isSelectable}
                    isSelected={row.getIsSelected()}
                    item={reactTableRow}
                    onItemSelect={row.getToggleSelectedHandler()}
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
        {instanceReactTable.getRowModel().rows.map((row, index) => {
          // TODO: Check this type.
          const reactTableRow = row.original as T;
          const key = getItemKey(reactTableRow, index);
          // TODO: Check this type.
          const reactTableColumns = instanceReactTable.getAllColumns() as unknown as Array<TableColumn<T>>;

          return (
            <Row
              columns={reactTableColumns}
              headerCellWidths={headerCellWidths}
              isIndeterminate={row.getIsSomeSelected()}
              isSelectable={isSelectable}
              isSelected={row.getIsSelected()}
              item={reactTableRow}
              key={key}
              onItemSelect={row.getToggleSelectedHandler()}
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

  // TODO: Reafacor this: check isSelectable and check when onSelectionChange when is not a function.
  return (
    <>
      {shouldRenderActions() && (
        <Actions
          customActions={actions}
          forwardedRef={actionsRef}
          isSelectable={onSelectionChange === undefined ? false : true}
          isAllSelected={instanceReactTable.getIsAllRowsSelected()}
          isIndeterminate={instanceReactTable.getIsSomeRowsSelected()}
          items={items}
          itemName={itemName}
          tableId={tableIdRef.current}
          selectedItems={selectable?.selectedItems || []}
          stickyHeader={stickyHeader}
          onSelectionChange={instanceReactTable.getToggleAllRowsSelectedHandler()}
          pagination={pagination}
        />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {onRowDrop ? (
          <DragDropContext onBeforeDragStart={onBeforeDragStart} onDragEnd={onDragEnd}>
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

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC<MarginProps> = memo((props) => <StyledTableFigure {...props} />);
