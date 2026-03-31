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
  WorksheetMultilineTextColumn,
  WorksheetProps,
} from './types';
import { editedRows, invalidRows } from './utils';

// Syncs the virtualizer scroll position to the selected cell.
// Isolated in its own component so selectedCells changes don't re-render InternalWorksheet.
const VirtualScrollSync = ({
  scrollToIndex,
  visibleRowIndices,
}: {
  scrollToIndex: (index: number) => void;
  visibleRowIndices: number[];
}) => {
  const { store, useStore } = useWorksheetStore();
  const selectedCells = useStore(
    store,
    useShallow((state) => state.selectedCells),
  );

  useEffect(() => {
    if (selectedCells.length > 0) {
      const rowIndex = selectedCells[0].rowIndex;
      const virtualIndex = visibleRowIndices.indexOf(rowIndex);

      if (virtualIndex !== -1) {
        scrollToIndex(virtualIndex);
      }
    }
  }, [scrollToIndex, selectedCells, visibleRowIndices]);

  return null;
};

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
    height,
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

    const { handleKeyDown, handleKeyUp } = useKeyEvents();

    // Virtualization is opt-in: only active when `height` is explicitly provided.
    const isVirtualized = height !== undefined;

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

    const hiddenRowsSet = useMemo(() => new Set(hiddenRows), [hiddenRows]);

    // Only virtualise rows that are visible (non-hidden child rows are excluded)
    const visibleRowIndices = useMemo(
      () =>
        rows.reduce<number[]>((acc, row, index) => {
          if (!(childIds.has(row.id) && hiddenRowsSet.has(row.id))) {
            acc.push(index);
          }

          return acc;
        }, []),
      [rows, childIds, hiddenRowsSet],
    );

    // When height is a number use it as a JSDOM fallback (getBoundingClientRect returns 0 in tests).
    const fallbackHeight = typeof height === 'number' ? height : 0;

    const virtualizer = useVirtualizer({
      count: isVirtualized ? visibleRowIndices.length : 0,
      estimateSize: () => 44,
      getScrollElement: () => scrollContainerRef.current,
      observeElementRect: (instance, cb) => {
        const el = instance.scrollElement!;

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

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
      },
      overscan: 5,
    });

    const scrollToIndex = useCallback(
      (index: number) => virtualizer.scrollToIndex(index, { behavior: 'auto' }),
      [virtualizer],
    );

    const virtualItems = virtualizer.getVirtualItems();

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

    const renderedRows = (
      <tbody>
        {isVirtualized ? (
          <>
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
          </>
        ) : (
          rows.map((_, rowIndex) => (
            <Row columns={expandedColumns} key={rowIndex} rowIndex={rowIndex} />
          ))
        )}
      </tbody>
    );

    const renderedModals = useMemo(() => {
      const modalColumns: Array<WorksheetModalColumn<T> | WorksheetMultilineTextColumn<T>> =
        expandedColumns.filter(
          (column): column is WorksheetModalColumn<T> | WorksheetMultilineTextColumn<T> =>
            column.type === 'modal' || column.type === 'multilineText',
        );

      // Create synthetic multilineText columns for typeOverride-capable columns
      const overrideColumns: Array<WorksheetMultilineTextColumn<T>> = expandedColumns
        .filter(
          (column) =>
            column.type !== 'multilineText' &&
            column.typeOverride !== undefined &&
            column.typeOverrideConfig?.multilineText !== undefined,
        )
        .map((column) => {
          const { formatting, ...config } = column.typeOverrideConfig!.multilineText!;

          return {
            hash: column.hash,
            header: column.header,
            type: 'multilineText' as const,
            config,
            formatting,
          };
        });

      return [...modalColumns, ...overrideColumns].map((column, index) => (
        <WorksheetModal column={column} key={index} />
      ));
    }, [expandedColumns]);

    return (
      <UpdateItemsProvider items={rows}>
        <StyledBox containerHeight={isVirtualized ? height : undefined} ref={scrollContainerRef}>
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
        {isVirtualized && (
          <VirtualScrollSync scrollToIndex={scrollToIndex} visibleRowIndices={visibleRowIndices} />
        )}
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
