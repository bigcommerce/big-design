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
    onRowDrop,
    pagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    ...rest
  } = props;

  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useUniqueId('table');
  const tableIdRef = useRef(id || uniqueTableId);
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
  const eventCallback = useEventCallback((item: T | null) => {
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
    },
    [onRowDrop],
  );

  const shouldRenderActions = () => {
    return Boolean(actions) || Boolean(pagination) || Boolean(selectable) || Boolean(itemName);
  };

  const getItemKey = (
    item: { [x: string]: string | number | undefined },
    index: number,
  ): string | number => {
    if (item[keyField] !== undefined) {
      // @ts-expect-error if statement check prevents undefined
      return item[keyField];
    }

    return index;
  };

  const renderHeaders = () => (
    <Head hidden={headerless}>
      <tr>
        {typeof onRowDrop === 'function' && <DragIconHeaderCell actionsRef={actionsRef} />}
        {isSelectable && <HeaderCheckboxCell actionsRef={actionsRef} stickyHeader={stickyHeader} />}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;

          return (
            <HeaderCell
              actionsRef={actionsRef}
              column={column}
              display={display}
              hide={hideHeader}
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
            const isSelected = selectedItems.has(item);

            return (
              <Draggable draggableId={String(key)} index={index} key={key}>
                {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                {(provided, snapshot) => (
                  <Row
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    // @ts-expect-error refactor table types
                    columns={columns}
                    isSelectable={isSelectable}
                    isSelected={isSelected}
                    item={item}
                    // @ts-expect-error refactor table types
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
              // @ts-expect-error refactor table types
              columns={columns}
              isSelectable={isSelectable}
              isSelected={isSelected}
              item={item}
              key={key}
              // @ts-expect-error refactor table types
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
          onSelectionChange={selectable && selectable.onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          stickyHeader={stickyHeader}
          tableId={tableIdRef.current}
        />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {onRowDrop ? (
          <DragDropContext onDragEnd={onDragEnd}>
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
