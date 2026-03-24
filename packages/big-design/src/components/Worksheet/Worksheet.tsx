import { BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, {
  createContext,
  createRef,
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { StoreApi } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { Tooltip } from '../Tooltip';

import { UpdateItemsProvider } from './context';
import { BaseState, createWorksheetStore, useKeyEvents, useWorksheetStore } from './hooks';
import { useCopyPasteHandler } from './hooks/useCopyPaste';
import { WorksheetModal } from './Modal';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, StyledBox, Table } from './styled';
import {
  InternalTableInterface,
  InternalWorksheetColumn,
  WorksheetItem,
  WorksheetLocalization,
  WorksheetModalColumn,
  WorksheetProps,
} from './types';
import { editedRows, invalidRows } from './utils';

const InternalTable = ({
  hasExpandableRows,
  hasStaticWidth,
  minWidth,
  onKeyDown,
  onKeyUp,
  tableRef,
  children,
}: PropsWithChildren<InternalTableInterface>) => {
  useCopyPasteHandler();

  return (
    <Table
      hasExpandableRows={hasExpandableRows}
      hasStaticWidth={hasStaticWidth}
      minWidth={minWidth}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      ref={tableRef}
      tabIndex={0}
    >
      {children}
    </Table>
  );
};

const InternalWorksheet = typedMemo(
  <T extends WorksheetItem>({
    columns,
    expandableRows,
    defaultExpandedRows,
    disabledRows,
    height = 600,
    items,
    minWidth,
    onChange,
    onErrors,
  }: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
    const tableRef = createRef<HTMLTableElement>();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const shouldBeTriggeredOnChange = useRef(false);
    const { store, useStore } = useWorksheetStore();
    const tooltipId = useId();

    const setRows = useStore(
      store,
      useShallow((state) => state.setRows),
    );
    const setColumns = useStore(
      store,
      useShallow((state) => state.setColumns),
    );
    const setExpandableRows = useStore(
      store,
      useShallow((state) => state.setExpandableRows),
    );
    const setDisabledRows = useStore(
      store,
      useShallow((state) => state.setDisabledRows),
    );
    const setTableRef = useStore(
      store,
      useShallow((state) => state.setTableRef),
    );
    const resetInvalidCells = useStore(
      store,
      useShallow((state) => state.resetInvalidCells),
    );

    const rows = useStore(
      store,
      useShallow((state) => state.rows),
    );
    const editedCells = useStore(
      store,
      useShallow((state) => state.editedCells),
    );
    const invalidCells = useStore(
      store,
      useShallow((state) => state.invalidCells),
    );
    const hiddenRows = useStore(
      store,
      useShallow((state) => state.hiddenRows),
    );
    const selectedCells = useStore(
      store,
      useShallow((state) => state.selectedCells),
    );

    const { handleKeyDown, handleKeyUp } = useKeyEvents();

    // Add a column for the toggle components
    const expandedColumns: Array<InternalWorksheetColumn<T>> = useMemo(() => {
      return expandableRows
        ? [{ hash: '', header: '', type: 'toggle', width: 32 }, ...columns]
        : columns;
    }, [columns, expandableRows]);

    // Compute which rows are children (for virtualization filtering)
    const childIds = useMemo(
      () => new Set(Object.values(expandableRows || {}).flat()),
      [expandableRows],
    );

    // Only virtualise rows that are visible (non-hidden child rows are excluded)
    const visibleRowIndices = useMemo(
      () =>
        rows.reduce<number[]>((acc, row, index) => {
          if (!(childIds.has(row.id) && hiddenRows.includes(row.id))) {
            acc.push(index);
          }

          return acc;
        }, []),
      [rows, childIds, hiddenRows],
    );

    const fallbackHeight = typeof height === 'number' ? height : 600;

    const virtualizer = useVirtualizer({
      count: visibleRowIndices.length,
      estimateSize: () => 44,
      getScrollElement: () => scrollContainerRef.current,
      observeElementRect: (instance, cb) => {
        const el = instance.scrollElement;

        if (!el) {
          return;
        }

        const measure = () => {
          const rect = el.getBoundingClientRect();

          cb({ height: rect.height || fallbackHeight, width: rect.width });
        };

        measure();

        if (typeof ResizeObserver !== 'undefined') {
          const ro = new ResizeObserver(measure);

          ro.observe(el);

          return () => ro.disconnect();
        }
      },
      overscan: 5,
    });

    const virtualItems = virtualizer.getVirtualItems();

    // Scroll the virtualised list to keep the keyboard-selected row in view
    useEffect(() => {
      if (selectedCells.length > 0) {
        const rowIndex = selectedCells[0].rowIndex;
        const virtualIndex = visibleRowIndices.indexOf(rowIndex);

        if (virtualIndex !== -1) {
          virtualizer.scrollToIndex(virtualIndex, { behavior: 'auto' });
        }
      }
    }, [selectedCells, visibleRowIndices, virtualizer]);

    useEffect(() => {
      shouldBeTriggeredOnChange.current = editedCells.length > 0;
    }, [editedCells]);

    // Create a new reference since state mutates rows to prevent unnecessary rerendering
    useEffect(() => {
      shouldBeTriggeredOnChange.current = false;

      resetInvalidCells();
      setRows([...items]);
    }, [items, resetInvalidCells, setRows]);
    useEffect(() => setColumns(expandedColumns), [expandedColumns, setColumns]);
    useEffect(
      () => setExpandableRows(expandableRows || {}, defaultExpandedRows || []),
      [expandableRows, defaultExpandedRows, setExpandableRows],
    );
    useEffect(() => setDisabledRows(disabledRows || []), [disabledRows, setDisabledRows]);
    useEffect(() => setTableRef(tableRef.current), [setTableRef, tableRef]);

    useEffect(() => {
      if (editedCells.length && shouldBeTriggeredOnChange.current) {
        onChange(editedRows(editedCells, rows));
      }
    }, [editedCells, onChange, rows]);

    useEffect(() => {
      if (typeof onErrors === 'function' && invalidCells.length) {
        onErrors(invalidRows(invalidCells, rows));
      }
    }, [invalidCells, onErrors, rows]);

    const getRenderedTooltip = useCallback(
      (tooltip?: string) => {
        if (typeof tooltip === 'string' && tooltip.length > 0) {
          return (
            <Tooltip
              id={tooltipId}
              placement="right"
              trigger={
                <Box as="span" marginLeft="xxSmall">
                  <BaselineHelpIcon
                    aria-describedby={tooltipId}
                    size="medium"
                    title="Hover or focus for additional context."
                  />
                </Box>
              }
            >
              {tooltip}
            </Tooltip>
          );
        }

        return null;
      },
      [tooltipId],
    );

    const renderedHeaders = useMemo(
      () => (
        <thead>
          <tr>
            <Status />
            {expandedColumns.map((column, index) => (
              <Header columnType={column.type} columnWidth={column.width || 'auto'} key={index}>
                {column.header} {getRenderedTooltip(column.tooltip)}
              </Header>
            ))}
          </tr>
        </thead>
      ),
      [expandedColumns, getRenderedTooltip],
    );

    const tableHasStaticWidth = useMemo(
      () => expandedColumns.every((column) => column.width && typeof column.width === 'number'),
      [expandedColumns],
    );

    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const paddingBottom =
      virtualItems.length > 0
        ? virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end
        : 0;

    const renderedRows = useMemo(
      () => (
        <tbody>
          {paddingTop > 0 && (
            <tr aria-hidden="true">
              <td
                colSpan={expandedColumns.length + 1}
                style={{ border: 'none', height: paddingTop, padding: 0 }}
              />
            </tr>
          )}
          {virtualItems.map((virtualItem) => {
            const rowIndex = visibleRowIndices[virtualItem.index];

            return <Row columns={expandedColumns} key={rowIndex} rowIndex={rowIndex} />;
          })}
          {paddingBottom > 0 && (
            <tr aria-hidden="true">
              <td
                colSpan={expandedColumns.length + 1}
                style={{ border: 'none', height: paddingBottom, padding: 0 }}
              />
            </tr>
          )}
        </tbody>
      ),
      [expandedColumns, virtualItems, visibleRowIndices, paddingTop, paddingBottom],
    );

    const renderedModals = useMemo(
      () =>
        expandedColumns
          .filter((column): column is WorksheetModalColumn<T> => column.type === 'modal')
          .map((column, index) => <WorksheetModal column={column} key={index} />),
      [expandedColumns],
    );

    return (
      <UpdateItemsProvider items={rows}>
        <StyledBox containerHeight={height} ref={scrollContainerRef}>
          <InternalTable
            hasExpandableRows={Boolean(expandableRows)}
            hasStaticWidth={tableHasStaticWidth}
            minWidth={minWidth}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tableRef={tableRef}
          >
            {renderedHeaders}
            {renderedRows}
          </InternalTable>
        </StyledBox>
        {renderedModals}
      </UpdateItemsProvider>
    );
  },
);

export const WorksheetContext = createContext<StoreApi<BaseState<any>> | null>(null);

export const WorksheetLocalizationContext = createContext<WorksheetLocalization>({
  toggleRowExpanded: 'toggle row expanded',
});

const defaultLocalization = {
  toggleRowExpanded: 'toggle row expanded',
};

export const Worksheet = typedMemo(
  <T extends WorksheetItem>({
    localization = defaultLocalization,
    ...props
  }: WorksheetProps<T>) => {
    const store = useMemo(() => createWorksheetStore<T>(), []);

    return (
      <WorksheetContext.Provider value={store}>
        <WorksheetLocalizationContext.Provider value={localization}>
          <InternalWorksheet {...props} />
        </WorksheetLocalizationContext.Provider>
      </WorksheetContext.Provider>
    );
  },
);
