import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useEventCallback, useUniqueId } from '../../hooks';
import { MarginProps } from '../../mixins';
import { typedMemo } from '../../utils';

import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { HeaderCheckboxCell } from './HeaderCell/HeaderCell';
import { Row } from './Row';
import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    className,
    columns,
    actions,
    draggable = false,
    emptyComponent,
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
        {isSelectable && <HeaderCheckboxCell stickyHeader={stickyHeader} actionsRef={actionsRef} />}

        {columns.map((column, index) => {
          const { hash, header, isSortable, hideHeader } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;

          return (
            <HeaderCell
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

  const renderItems = () => {
    console.log('draggable items', draggable);

    return draggable ? <Droppable droppableId="priority-droppable">
    {provided => (
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
                            />
                        )}
                    </Draggable>
                );
            })}
            {provided.placeholder}
        </Body>
    )}
</Droppable> : (
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
  };

  const renderEmptyState = () => {
    if (items.length === 0 && emptyComponent) {
      return emptyComponent;
    }

    return null;
  };
  
  console.log('draggable is', draggable);
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
        {
          draggable ?
            <DragDropContext onDragEnd={(a: any) => console.log(a)}>
              {renderHeaders()}
              {renderItems()}
            </DragDropContext>
           : <>
            {renderHeaders()}
            {renderItems()}
           </>
        }
      </StyledTable>

      {renderEmptyState()}
    </>
  );
};

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC<MarginProps> = memo((props) => <StyledTableFigure {...props} />);
