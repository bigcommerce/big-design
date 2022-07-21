import { BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import React, {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { StoreApi } from 'zustand';

import { typedMemo } from '../../utils';
import { Box } from '../Box';
import { Tooltip } from '../Tooltip';

import { UpdateItemsProvider } from './context';
import { BaseState, createWorksheetStore, useKeyEvents, useWorksheetStore } from './hooks';
import { WorksheetModal } from './Modal/Modal';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, StyledBox, Table } from './styled';
import {
  InternalWorksheetColumn,
  WorksheetItem,
  WorksheetModalColumn,
  WorksheetProps,
} from './types';
import { editedRows, invalidRows } from './utils';

const InternalWorksheet = typedMemo(
  <T extends WorksheetItem>({
    columns,
    expandableRows,
    defaultExpandedRows,
    disabledRows,
    items,
    minWidth,
    onChange,
    onErrors,
  }: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
    const tableRef = createRef<HTMLTableElement>();
    const shouldBeTriggeredOnChange = useRef(false);
    const { store, useStore } = useWorksheetStore();
    const tooltipId = useId();

    const setRows = useStore(store, (state) => state.setRows);
    const setColumns = useStore(store, (state) => state.setColumns);
    const setExpandableRows = useStore(store, (state) => state.setExpandableRows);
    const setDisabledRows = useStore(store, (state) => state.setDisabledRows);
    const setTableRef = useStore(store, (state) => state.setTableRef);

    const rows = useStore(
      store,
      useMemo(() => (state) => state.rows, []),
    );
    const editedCells = useStore(
      store,
      useMemo(() => (state) => state.editedCells, []),
    );
    const invalidCells = useStore(
      store,
      useMemo(() => (state) => state.invalidCells, []),
    );

    const { handleKeyDown } = useKeyEvents();

    // Add a column for the toggle components
    const expandedColumns: Array<InternalWorksheetColumn<T>> = useMemo(() => {
      return expandableRows
        ? [{ hash: '', header: '', type: 'toggle', width: 32 }, ...columns]
        : columns;
    }, [columns, expandableRows]);

    useEffect(() => {
      shouldBeTriggeredOnChange.current = editedCells.length > 0;
    }, [editedCells]);

    // Create a new reference since state mutates rows to prevent unecessary rerendering
    useEffect(() => {
      shouldBeTriggeredOnChange.current = false;
      setRows([...items]);
    }, [items, setRows]);
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
      if (typeof onErrors === 'function' && shouldBeTriggeredOnChange.current) {
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

    const renderedRows = useMemo(
      () => (
        <tbody>
          {rows.map((_row, rowIndex) => (
            <Row columns={expandedColumns} key={rowIndex} rowIndex={rowIndex} />
          ))}
        </tbody>
      ),
      [expandedColumns, rows],
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
        <StyledBox>
          <Table
            hasExpandableRows={Boolean(expandableRows)}
            hasStaticWidth={tableHasStaticWidth}
            minWidth={minWidth}
            onKeyDown={handleKeyDown}
            ref={tableRef}
            tabIndex={0}
          >
            {renderedHeaders}
            {renderedRows}
          </Table>
        </StyledBox>
        {renderedModals}
      </UpdateItemsProvider>
    );
  },
);

export const WorksheetContext = createContext<StoreApi<BaseState<any>> | null>(null);

export const Worksheet = typedMemo(<T extends WorksheetItem>(props: WorksheetProps<T>) => {
  const store = useMemo(() => createWorksheetStore<T>(), []);

  return (
    <WorksheetContext.Provider value={store}>
      <InternalWorksheet {...props} />
    </WorksheetContext.Provider>
  );
});
