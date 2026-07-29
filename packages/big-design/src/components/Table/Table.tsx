import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import {
  announce,
  cleanup as cleanupLiveRegion,
} from '@atlaskit/pragmatic-drag-and-drop-live-region';
import React, { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

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
import { TableColumn, TableItem, TableProps } from './types';

interface Localization {
  ascendingOrder: string;
  descendingOrder: string;
}

const defaultLocalization: Localization = {
  ascendingOrder: 'Ascending order',
  descendingOrder: 'Descending order',
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
    localization = defaultLocalization,
    onRowDrop,
    pagination: undiscriminatedPagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    ...rest
  } = props;

  const pagination = useMemo(
    () => undiscriminatedPagination && discriminatePagination(undiscriminatedPagination),
    [undiscriminatedPagination],
  );
  const actionsRef = useRef<HTMLDivElement>(null);
  const uniqueTableId = useId();
  const tableIdRef = useRef(id || uniqueTableId);
  const tableId = tableIdRef.current;
  const isSelectable = Boolean(selectable);
  const isDraggable = typeof onRowDrop === 'function';
  const [selectedItems, setSelectedItems] = useState<Set<T>>(new Set());
  const [phantom, setPhantom] = useState<{ insertIndex: number; sourceIndex: number } | null>(null);
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

  // Pointer-based reordering: a single monitor per table resolves the source and
  // closest-edge drop target into a `from`/`to` pair. While dragging, it also tracks
  // where a phantom placeholder row should render (`onDrag`). Keyboard reordering is
  // handled directly on each row's drag handle (see Row). Both paths announce via the
  // live region.
  useEffect(() => {
    if (typeof onRowDrop !== 'function') {
      return;
    }

    /* istanbul ignore next -- monitor callbacks only run during a real browser drag */
    const stopMonitoring = monitorForElements({
      canMonitor: ({ source }) => source.data.tableId === tableId,
      onDrag: ({ location, source }) => {
        const target = location.current.dropTargets[0];

        if (!target) {
          setPhantom(null);

          return;
        }

        const sourceIndex = Number(source.data.index);
        const indexOfTarget = Number(target.data.index);
        const closestEdgeOfTarget = extractClosestEdge(target.data);
        const finishIndex = getReorderDestinationIndex({
          axis: 'vertical',
          closestEdgeOfTarget,
          indexOfTarget,
          startIndex: sourceIndex,
        });

        // No visible move: don't render a phantom that sits next to the source row.
        if (finishIndex === sourceIndex) {
          setPhantom(null);

          return;
        }

        const insertIndex = closestEdgeOfTarget === 'bottom' ? indexOfTarget + 1 : indexOfTarget;

        setPhantom((current) =>
          current?.insertIndex === insertIndex && current.sourceIndex === sourceIndex
            ? current
            : { insertIndex, sourceIndex },
        );
      },
      onDrop: ({ location, source }) => {
        setPhantom(null);

        const target = location.current.dropTargets[0];

        if (!target) {
          return;
        }

        const startIndex = Number(source.data.index);
        const indexOfTarget = Number(target.data.index);
        const finishIndex = getReorderDestinationIndex({
          axis: 'vertical',
          closestEdgeOfTarget: extractClosestEdge(target.data),
          indexOfTarget,
          startIndex,
        });

        if (finishIndex === startIndex) {
          return;
        }

        onRowDrop(startIndex, finishIndex);
        announce(`Moved row from position ${startIndex + 1} to ${finishIndex + 1}.`);
      },
    });

    return () => {
      stopMonitoring();
      cleanupLiveRegion();
    };
  }, [onRowDrop, tableId]);

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
        {isDraggable && <DragIconHeaderCell actionsRef={actionsRef} />}
        {isSelectable && <HeaderCheckboxCell actionsRef={actionsRef} stickyHeader={stickyHeader} />}

        {columns.map((column, index) => {
          const { display, hash, header, isSortable, hideHeader, width } = column;
          const isSorted = isSortable && hash === sortable?.columnHash;
          const sortDirection = sortable?.direction;

          return (
            <HeaderCell
              actionsRef={actionsRef}
              column={{ ...column, width }}
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

  const renderItems = () => {
    const rows = items.map((item: T, index) => {
      const key = getItemKey(item, index);

      return (
        <Row
          columns={columns}
          index={index}
          isHidden={phantom?.sourceIndex === index}
          isSelectable={isSelectable}
          isSelected={selectedItems.has(item)}
          item={item}
          itemCount={items.length}
          key={key}
          onItemSelect={onItemSelect}
          onRowDrop={onRowDrop}
          showDragIcon={isDraggable}
          tableId={tableId}
        />
      );
    });

    /* istanbul ignore next -- the phantom row only renders during a real browser drag */
    if (phantom && phantom.sourceIndex < items.length) {
      rows.splice(
        phantom.insertIndex,
        0,
        <Row
          columns={columns}
          index={phantom.sourceIndex}
          isPhantom
          isSelectable={isSelectable}
          item={items[phantom.sourceIndex]}
          itemCount={items.length}
          key="bd-drag-phantom"
          showDragIcon={isDraggable}
          tableId={tableId}
        />,
      );
    }

    return <Body withFirstRowBorder={headerless}>{rows}</Body>;
  };

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
          onSelectionChange={selectable?.onSelectionChange}
          pagination={pagination}
          selectedItems={selectedItems}
          stickyHeader={stickyHeader}
          tableId={tableId}
        />
      )}
      <StyledTable {...rest} id={tableId}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>

      {renderEmptyState()}
    </>
  );
};

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC<{ children?: React.ReactNode } & MarginProps> = memo((props) => (
  <StyledTableFigure {...props} />
));
