import React, { createRef, useEffect, useMemo } from 'react';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { useKeyEvents, useStore } from './hooks';
import { WorksheetModal } from './Modal/Modal';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { WorksheetItem, WorksheetModalColumn, WorksheetProps } from './types';
import { editedRows, invalidRows } from './utils';

const InternalWorksheet = <T extends WorksheetItem>({
  columns,
  items,
  onChange,
  onErrors,
}: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
  const tableRef = createRef<HTMLTableElement>();

  const setRows = useStore((state) => state.setRows);
  const setColumns = useStore((state) => state.setColumns);
  const setTableRef = useStore((state) => state.setTableRef);

  const rows = useStore(useMemo(() => (state) => state.rows, []));
  const editedCells = useStore(useMemo(() => (state) => state.editedCells, []));
  const invalidCells = useStore(useMemo(() => (state) => state.invalidCells, []));

  const { handleKeyDown } = useKeyEvents();

  // Create a new reference since state mutates rows to prevent unecessary rerendering
  useEffect(() => setRows([...items]), [items, setRows]);

  // Save columns to use in navigation
  useEffect(() => setColumns(columns), [columns, setColumns]);

  // Save ref to focus table when necessary
  useEffect(() => setTableRef(tableRef.current), [setTableRef, tableRef]);

  // Call onChange when a cell is edited
  useEffect(() => {
    if (editedCells.length) {
      onChange(editedRows(editedCells, rows));
    }
  }, [editedCells, onChange, rows]);

  // Call onErrors when a cell becomes invalid
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
          {columns.map((column, index) => (
            <Header key={index}>{column.header}</Header>
          ))}
        </tr>
      </thead>
    ),
    [columns],
  );

  const renderedRows = useMemo(
    () => (
      <tbody>
        {rows.map((_row, rowIndex) => (
          <Row key={rowIndex} columns={columns} rowIndex={rowIndex} />
        ))}
      </tbody>
    ),
    [columns, rows],
  );

  const renderedModals = useMemo(
    () =>
      columns
        .filter((column): column is WorksheetModalColumn<T> => column.type === 'modal')
        .map((column, index) => <WorksheetModal column={column} key={index} />),
    [columns],
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
};

export const Worksheet = typedMemo(InternalWorksheet);
