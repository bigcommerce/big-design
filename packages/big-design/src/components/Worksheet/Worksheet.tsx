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
import { Header, Table, VirtualContainer } from './styled';
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
    height,
    items,
    minWidth,
    onChange,
    onErrors,
  }: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
    const tableRef = createRef<HTMLTableElement>();
    const containerRef = useRef<HTMLDivElement>(null);
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

    const setScrollToRow = useStore(
      store,
      useShallow((state) => state.setScrollToRow),
    );

    const { handleKeyDown, handleKeyUp } = useKeyEvents();

    // Add a column for the toggle components
    const expandedColumns: Array<InternalWorksheetColumn<T>> = useMemo(() => {
      return expandableRows
        ? [{ hash: '', header: '', type: 'toggle', width: 32 }, ...columns]
        : columns;
    }, [columns, expandableRows]);

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

    const virtualizer = useVirtualizer({
      count: height ? rows.length : 0,
      getScrollElement: () => containerRef.current,
      estimateSize: () => 52,
      overscan: 10,
    });

    useEffect(() => {
      if (!height) {
        return;
      }

      setScrollToRow((index) => virtualizer.scrollToIndex(index, { align: 'auto' }));

      return () => setScrollToRow(null);
    }, [height, setScrollToRow, virtualizer]);

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

    const virtualItems = height ? virtualizer.getVirtualItems() : null;

    const renderedRows = useMemo(() => {
      if (virtualItems) {
        const paddingTop = virtualItems.length > 0 ? (virtualItems[0].start ?? 0) : 0;
        const lastItem = virtualItems[virtualItems.length - 1];
        const paddingBottom = lastItem ? virtualizer.getTotalSize() - lastItem.end : 0;

        return (
          <tbody>
            {paddingTop > 0 && (
              <tr aria-hidden="true">
                <td
                  colSpan={expandedColumns.length + 1}
                  style={{ height: paddingTop, padding: 0, border: 'none' }}
                />
              </tr>
            )}
            {virtualItems.map((virtualRow) => (
              <Row columns={expandedColumns} key={virtualRow.key} rowIndex={virtualRow.index} />
            ))}
            {paddingBottom > 0 && (
              <tr aria-hidden="true">
                <td
                  colSpan={expandedColumns.length + 1}
                  style={{ height: paddingBottom, padding: 0, border: 'none' }}
                />
              </tr>
            )}
          </tbody>
        );
      }

      return (
        <tbody>
          {rows.map((_row, rowIndex) => (
            <Row columns={expandedColumns} key={rowIndex} rowIndex={rowIndex} />
          ))}
        </tbody>
      );
    }, [expandedColumns, rows, virtualItems, virtualizer]);

    const renderedModals = useMemo(
      () =>
        expandedColumns
          .filter((column): column is WorksheetModalColumn<T> => column.type === 'modal')
          .map((column, index) => <WorksheetModal column={column} key={index} />),
      [expandedColumns],
    );

    return (
      <UpdateItemsProvider items={rows}>
        <VirtualContainer height={height} ref={containerRef}>
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
        </VirtualContainer>
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
