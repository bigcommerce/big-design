import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { useEventCallback, useUniqueId } from '../../hooks';
import { MarginProps } from '../../mixins';
import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { PillTabs } from '../PillTabs';

import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { DragIconHeaderCell, HeaderCheckboxCell } from './HeaderCell/HeaderCell';
import { Row } from './Row';
import { Search } from './Search';
import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    actions,
    className,
    columns,
    emptyComponent,
    filters,
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
    search,
    ...rest
  } = props;

  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useUniqueId('table');
  const tableIdRef = useRef(id || uniqueTableId);
  const isSelectable = Boolean(selectable);
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
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
    },
    [onRowDrop],
  );

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
        {typeof onRowDrop === 'function' && <DragIconHeaderCell actionsRef={actionsRef} />}
        {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} actionsRef={actionsRef} />}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;

          return (
            <HeaderCell
              display={display}
              column={column}
              hide={hideHeader}
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

  const renderPillTabs = () => {
    if (!filters) {
      return;
    }

    return (
      <Box marginBottom={shouldRenderActions() && !search ? 'none' : 'medium'}>
        <PillTabs {...filters} />
      </Box>
    );
  };

  const renderSearch = () => {
    if (!search) {
      return;
    }

    return (
      <Box marginBottom={shouldRenderActions() ? 'none' : 'medium'}>
        <Search {...search} />
      </Box>
    );
  };

  return (
    <>
      {renderPillTabs()}
      {renderSearch()}
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
