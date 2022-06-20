import { createTable, getCoreRowModel, useTableInstance } from '@tanstack/react-table';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
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
  // const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
  // const [selectedItems, setRowSelection] = useState<Set<T>>({});
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
  // TODO: check if we should implement select react table functionality.
  // TODO: check if we should implement pagination react table functionality.
  // TODO: Check TS issue when adding selectedItems in the state
  const instanceReactTable = useTableInstance(table, {
    data: items,
    columns: columnsReactTable,
    // manualSorting: false,
    // manualPagination: true,
    state: {
      rowSelection: selectable?.selectedItems,
    },
    enableRowSelection: true,
    onRowSelectionChange: selectable?.onSelectionChange,
    getSubRows: (row: any) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  } as any);

  // const eventCallback = useEventCallback((item: T) => {
  //   if (!selectable || !item) {
  //     return;
  //   }

  //   const { onSelectionChange } = selectable;
  //   const nextIsSelected = !selectedItems.has(item);

  //   if (nextIsSelected) {
  //     onSelectionChange([...selectedItems, item]);
  //   } else {
  //     onSelectionChange([...selectedItems].filter((selectedItem) => selectedItem !== item));
  //   }
  // });

  // const selectableConditionalDep = selectable ? selectable.selectedItems : null;

  // useEffect(() => {
  //   if (selectable) {
  //     setSelectedItems(new Set(selectable.selectedItems));
  //   }
  // }, [selectable, selectableConditionalDep]);

  // const onItemSelect = selectable ? eventCallback : undefined;

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

  // const principalHeaderGroups = instanceReactTable.getHeaderGroups().slice(1);

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
      {/* {instanceReactTable.getHeaderGroups().map((headerGroup) => {
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
      })} */}
    </Head>
  );

  const renderDroppableItems = () => (
    <Droppable droppableId={`${uniqueTableId}-bd-droppable`}>
      {(provided) => (
        <Body withFirstRowBorder={headerless} ref={provided.innerRef} {...provided.droppableProps}>
          {instanceReactTable.getRowModel().rows.map((row, index) => {
            const reactTableRow = row.original as T;
            const key = getItemKey(reactTableRow, index);
            // const isSelected = selectedItems.has(reactTableRow);
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
                    isSelectable={isSelectable}
                    // isSelected={isSelected}
                    item={reactTableRow}
                    // onItemSelect={onItemSelect}
                    showDragIcon={true}
                    isSelected={row.getIsSelected()}
                    onSelectionChange={row.getToggleSelectedHandler()}
                    isIndeterminate={row.getIsSomeSelected()}
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
          // const isSelected = selectedItems.has(reactTableRow);
          // TODO: Check this type.
          const reactTableColumns = instanceReactTable.getAllColumns() as unknown as Array<TableColumn<T>>;

          return (
            <Row
              columns={reactTableColumns}
              headerCellWidths={headerCellWidths}
              isSelectable={isSelectable}
              // isSelected={isSelected}
              item={reactTableRow}
              key={key}
              // onItemSelect={onItemSelect}
              isSelected={row.getIsSelected()}
              onSelectionChange={row.getToggleSelectedHandler()}
              isIndeterminate={row.getIsSomeSelected()}
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

  // console.log(selectedItems, 'here the selected items in table');

  return (
    <>
      {shouldRenderActions() && (
        <Actions
          customActions={actions}
          pagination={pagination}
          // onSelectionChange={selectable && selectable.onSelectionChange}
          selectedItems={selectable && selectable.selectedItems}
          items={items}
          itemName={itemName}
          tableId={tableIdRef.current}
          stickyHeader={stickyHeader}
          forwardedRef={actionsRef}
          indeterminate={instanceReactTable.getIsSomeRowsSelected()}
          checked={instanceReactTable.getIsAllRowsSelected()}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          onSelectionChange={instanceReactTable.getToggleAllRowsSelectedHandler()}
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
