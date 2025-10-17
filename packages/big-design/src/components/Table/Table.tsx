import React, { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { MarginProps } from '../../helpers';
import { useEventCallback } from '../../hooks';
import { typedMemo } from '../../utils';

import { Actions } from './Actions';
import { Body } from './Body';
import { discriminatePagination } from './discriminatePagination';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { DragIconHeaderCell, HeaderCheckboxCell } from './HeaderCell/HeaderCell';
import { Row } from './Row';
import { StyledTable, StyledTableFigure } from './styled';
import { Localization, TableColumn, TableItem, TableProps } from './types';

const defaultLocalization: Required<Localization> = {
  ascendingOrder: 'Ascending order',
  descendingOrder: 'Descending order',
  controlsLabel: 'Table Controls',
};

const InternalTable = <T extends TableItem>(
  props: TableProps<T>,
): React.ReactElement<TableProps<T>> => {
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
    localization: customLocalization,
    onRowDrop,
    pagination: undiscriminatedPagination,
    selectable,
    sortable,
    stickyHeader,
    style,
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
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
  const [headerCellWidths, setHeaderCellWidths] = useState<Array<number | string>>([]);
  const headerCellIconRef = useRef<HTMLTableCellElement>(null);
  const eventCallback = useEventCallback((item: T) => {
    if (!selectable || !item) {
      return;
    }

    const { onSelectionChange } = selectable;
    const nextIsSelected = !selectedItems.has(item);

    if (nextIsSelected) {
      onSelectionChange([...selectedItems, item]);
    } else {
      onSelectionChange([...selectedItems].filter((selectedItem) => selectedItem !== item));
    }
  });

  const selectableConditionalDep = selectable ? selectable.selectedItems : null;

  useEffect(() => {
    if (selectable) {
      setSelectedItems(new Set(selectable.selectedItems));
    }
  }, [selectable, selectableConditionalDep]);

  const onItemSelect = selectable ? eventCallback : undefined;

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
      <tr>
        {typeof onRowDrop === 'function' && (
          <DragIconHeaderCell actionsRef={actionsRef} headerCellIconRef={headerCellIconRef} />
        )}
        {isSelectable && <HeaderCheckboxCell actionsRef={actionsRef} stickyHeader={stickyHeader} />}

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
            const isSelected = selectedItems.has(item);

            return (
              <Draggable draggableId={String(key)} index={index} key={key}>
                {(provided, snapshot) => (
                  <Row
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    columns={columns}
                    headerCellWidths={headerCellWidths}
                    isSelectable={isSelectable}
                    isSelected={isSelected}
                    item={item}
                    onItemSelect={onItemSelect}
                    ref={provided.innerRef}
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
          forwardedRef={actionsRef}
          itemName={itemName}
          items={items}
          label={localization.controlsLabel}
          onSelectionChange={selectable?.onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          stickyHeader={stickyHeader}
          tableId={tableIdRef.current}
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
export const TableFigure: React.FC<{ children?: React.ReactNode } & MarginProps> = memo((props) => (
  <StyledTableFigure {...props} />
));
