// import {
//   createTable,
//   getCoreRowModel,
//   ReactTableGenerics,
//   TableGenerics,
//   useTableInstance,
// } from '@tanstack/react-table';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useEventCallback, useUniqueId } from '../../hooks';
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
  // TODO: check if this would be better to live outside. Had to put it inside the component because of TS (genetal T).
  // const table = createTable().setRowType<T>();
  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useUniqueId('table');
  const tableIdRef = useRef(id || uniqueTableId);
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
  const [headerCellWidths, setHeaderCellWidths] = useState<Array<number | string>>([]);
  const headerCellIconRef = useRef<HTMLTableCellElement>(null);
  // console.log('actionsRef:', actionsRef);
  // console.log('uniqueTableId:', uniqueTableId);
  // console.log('tableIdRef', tableIdRef);
  // console.log('isSelectable:', isSelectable);
  // console.log('selectedItems:', selectedItems);
  // console.log('selectable:', selectable);

  // console.log(columns, 'here the columns');

  // const columnsReactTable = useMemo(() => {
  //   return columns.map((column) => {
  //     return table.createDataColumn(column.hash, {
  //       header: column.header,
  //       cell: (info: any) => info.getValue(),
  //     } as any);
  //   });
  // }, [columns, table]);

  // TODO: check if we should use sorting react table functionality.
  // const instanceReactTable = useTableInstance(table, {
  //   data: items,
  //   columns: columnsReactTable,
  //   manualSorting: true,
  //   getCoreRowModel: getCoreRowModel(),
  //   debugTable: true,
  //   debugHeaders: true,
  //   debugColumns: true,
  // });

  // console.log(items, ' TABLE: here the items that are like data');
  // console.log(columnsReactTable, ' TABLE: here the columns');

  const eventCallback = useEventCallback((item: T) => {
    if (!selectable || !item) {
      return;
    }

    const { onSelectionChange } = selectable;
    const nextIsSelected = !selectedItems.has(item);
    // console.log('nextIsSelected:', nextIsSelected);
    // console.log('item', item);

    if (nextIsSelected) {
      onSelectionChange([...selectedItems, item]);
    } else {
      onSelectionChange([...selectedItems].filter((selectedItem) => selectedItem !== item));
    }
  });

  const selectableConditionalDep = selectable ? selectable.selectedItems : null;
  // console.log('selectableConditionalDep:', selectableConditionalDep);

  useEffect(() => {
    if (selectable) {
      setSelectedItems(new Set(selectable.selectedItems));
    }
  }, [selectable, selectableConditionalDep]);

  const onItemSelect = selectable ? eventCallback : undefined;
  // console.log('onItemSelect:', onItemSelect);

  const onSortClick = useCallback(
    (column: TableColumn<T>) => {
      if (!sortable || !column.isSortable) {
        // console.log('sortable:', sortable);
        // console.log('column.isSortable', column.isSortable);

        return;
      }

      const { hash } = column;
      const sortDirection = sortable.direction === 'ASC' ? 'DESC' : 'ASC';
      // console.log(sortable, 'here the sortable');
      // console.log(hash, 'here the hash');
      // console.log(sortDirection, 'here teh sordirection');
      // console.log('column:', column);

      if (typeof sortable.onSort === 'function') {
        sortable.onSort(hash, sortDirection, column);
      }
    },
    [sortable],
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      // console.log('destination:', destination);
      // console.log('source:', source);
      // console.log('result:', result);

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
  // console.log('shouldRenderActions', shouldRenderActions());

  const getItemKey = (item: T, index: number): string | number => {
    // console.log('keyField', keyField);
    // console.log('item[keyField]', item[keyField]);
    // console.log('index:', index);
    // console.log('item', item);
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  // console.log(instanceReactTable.getHeaderGroups()[0].headers, 'here in Table HEADER GROUP');

  //   <thead>
  //   {instance.getHeaderGroups().map(headerGroup => (
  //     <tr key={headerGroup.id}>
  //       {headerGroup.headers.map(header => (
  //         <th key={header.id} colSpan={header.colSpan}>
  //           {header.isPlaceholder ? null : header.renderHeader()}
  //         </th>
  //       ))}
  //     </tr>
  //   ))}
  // </thead>

  // console.log(columns, 'here the columns');

  // console.log(items, 'here the items');

  // const rerender = React.useReducer(() => ({}), {})[1];

  // const [sorting, setSorting] = React.useState<SortingState>([]);

  // console.log(isSelectable, 'here the is Selectable');

  const renderHeaders = () => (
    <Head hidden={headerless}>
      <tr>
        {typeof onRowDrop === 'function' && (
          <DragIconHeaderCell
            actionsRef={actionsRef}
            width={headerCellWidths.length ? headerCellWidths[0] : 'auto'}
            headerCellIconRef={headerCellIconRef}
          />
        )}
        {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} actionsRef={actionsRef} />}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader, width } = column;
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
              key={index}
              onSortClick={onSortClick}
              sortDirection={sortDirection}
              stickyHeader={stickyHeader}
              actionsRef={actionsRef}
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
        <Body withFirstRowBorder={headerless} ref={provided.innerRef} {...provided.droppableProps}>
          {items.map((item: T, index) => {
            const key = getItemKey(item, index);
            const isSelected = selectedItems.has(item);

            return (
              <Draggable key={key} draggableId={String(key)} index={index}>
                {(provided, snapshot) => (
                  <Row
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    columns={columns}
                    headerCellWidths={headerCellWidths}
                    isSelectable={isSelectable}
                    isSelected={isSelected}
                    item={item}
                    onItemSelect={onItemSelect}
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
          const isSelected = selectedItems.has(item);

          return (
            <Row
              columns={columns}
              headerCellWidths={headerCellWidths}
              isSelectable={isSelectable}
              isSelected={isSelected}
              item={item}
              key={key}
              onItemSelect={onItemSelect}
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
          pagination={pagination}
          onSelectionChange={selectable && selectable.onSelectionChange}
          selectedItems={selectedItems}
          items={items}
          itemName={itemName}
          tableId={tableIdRef.current}
          stickyHeader={stickyHeader}
          forwardedRef={actionsRef}
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

// {instanceReactTable.getHeaderGroups().map((headerGroup) => {
//   return (
//     <tr key={headerGroup.id}>
//       {typeof onRowDrop === 'function' && (
//         <DragIconHeaderCell
//           actionsRef={actionsRef}
//           width={headerCellWidths.length ? headerCellWidths[0] : 'auto'}
//           headerCellIconRef={headerCellIconRef}
//         />
//       )}
//       {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} actionsRef={actionsRef} />}

//       {headerGroup.headers.map((header, index) => {
//         const column = columns[index];
//         const { display, hash, header: headerColumn, isSortable, hideHeader, width } = column;
//         const isSorted = isSortable && sortable && hash === sortable.columnHash;
//         const sortDirection = sortable && sortable.direction;
//         const headerCellWidth = headerCellWidths[index + 1];
//         const widthColumn = headerCellWidth ?? width;

//         return (
//           <HeaderCell
//             display={display}
//             column={{ ...column, width: widthColumn }}
//             hide={hideHeader}
//             id={`header-cell-${index}`}
//             isSorted={isSorted}
//             key={header.id}
//             onSortClick={onSortClick}
//             sortDirection={sortDirection}
//             stickyHeader={stickyHeader}
//             actionsRef={actionsRef}
//           >
//             {header.renderHeader()}
//             here
//           </HeaderCell>
//         );
//       })}

//       {/* {columns.map((column, index) => {
//         const { display, hash, header, isSortable, hideHeader, width } = column;
//         const isSorted = isSortable && sortable && hash === sortable.columnHash;
//         const sortDirection = sortable && sortable.direction;
//         const headerCellWidth = headerCellWidths[index + 1];
//         const widthColumn = headerCellWidth ?? width;
//         // console.log(column, 'single column');

//         return (
//           <HeaderCell
//             display={display}
//             column={{ ...column, width: widthColumn }}
//             hide={hideHeader}
//             id={`header-cell-${index}`}
//             isSorted={isSorted}
//             key={index}
//             onSortClick={onSortClick}
//             sortDirection={sortDirection}
//             stickyHeader={stickyHeader}
//             actionsRef={actionsRef}
//           >
//             {header}
//           </HeaderCell>
//         );
//       })} */}
//     </tr>
//   );
// })}
