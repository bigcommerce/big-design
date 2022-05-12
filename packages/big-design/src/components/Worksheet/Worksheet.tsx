import React, { createRef, useEffect, useMemo } from 'react';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { createStore, Provider, useKeyEvents, useStore } from './hooks';
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
    items,
    onChange,
    onErrors,
  }: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
    const tableRef = createRef<HTMLTableElement>();

    const setRows = useStore((state) => state.setRows);
    const setColumns = useStore((state) => state.setColumns);
    const setExpandableRows = useStore((state) => state.setExpandableRows);
    const setTableRef = useStore((state) => state.setTableRef);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const rows = useStore(useMemo(() => (state) => state.rows, []));
    const editedCells = useStore(useMemo(() => (state) => state.editedCells, []));
    const invalidCells = useStore(useMemo(() => (state) => state.invalidCells, []));

    const { handleKeyDown } = useKeyEvents();

    // Add a column for the toggle components
    const expandedColumns: Array<InternalWorksheetColumn<T>> = useMemo(() => {
      return expandableRows ? [{ hash: '', header: '', type: 'toggle' }, ...columns] : columns;
    }, [columns, expandableRows]);

    // Create a new reference since state mutates rows to prevent unecessary rerendering
    useEffect(() => setRows([...items]), [items, setRows]);
    useEffect(() => setColumns(expandedColumns), [expandedColumns, setColumns]);
    useEffect(() => setExpandableRows(expandableRows || {}), [expandableRows, setExpandableRows]);
    useEffect(() => setTableRef(tableRef.current), [setTableRef, tableRef]);

    useEffect(() => {
      if (editedCells.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onChange(editedRows(editedCells, rows));
      }
    }, [editedCells, onChange, rows]);

    useEffect(() => {
      if (typeof onErrors === 'function' && invalidCells.length) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

export const Worksheet = typedMemo(<T extends WorksheetItem>(props: WorksheetProps<T>) => (
  <Provider createStore={createStore}>
    <InternalWorksheet {...props} />
  </Provider>
));
