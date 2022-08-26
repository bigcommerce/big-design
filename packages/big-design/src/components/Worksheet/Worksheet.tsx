import React, { createContext, createRef, useEffect, useMemo, useRef } from 'react';
import { StoreApi } from 'zustand';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { BaseState, createWorkSheetStore, useKeyEvents, useWorksheetStore } from './hooks';
import { WorksheetModal } from './Modal/Modal';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
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
    disabledRows,
    items,
    onChange,
    onErrors,
  }: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
    const tableRef = createRef<HTMLTableElement>();
    const shouldBeTriggeredOnChange = useRef(false);
    const { store, useStore } = useWorksheetStore();

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
      return expandableRows ? [{ hash: '', header: '', type: 'toggle' }, ...columns] : columns;
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
    useEffect(() => setExpandableRows(expandableRows || {}), [expandableRows, setExpandableRows]);
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

    const renderedHeaders = useMemo(
      () => (
        <thead>
          <tr>
            <Status />
            {expandedColumns.map((column, index) => (
              <Header columnType={column.type} key={index}>
                {column.header}
              </Header>
            ))}
          </tr>
        </thead>
      ),
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
        <Table onKeyDown={handleKeyDown} ref={tableRef} tabIndex={0}>
          {renderedHeaders}
          {renderedRows}
        </Table>
        {renderedModals}
      </UpdateItemsProvider>
    );
  },
);

export const WorksheetContext = createContext<StoreApi<BaseState<any>> | null>(null);

export const Worksheet = typedMemo(<T extends WorksheetItem>(props: WorksheetProps<T>) => {
  const store = createWorkSheetStore<T>();

  return (
    <WorksheetContext.Provider value={store}>
      <InternalWorksheet {...props} />
    </WorksheetContext.Provider>
  );
});
