import React, { useEffect, useMemo } from 'react';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { useStore } from './hooks';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { WorksheetItem, Worksheet as WorksheetProps } from './types';
import { editedRows, invalidRows } from './utils';

const InternalWorksheet = <T extends WorksheetItem>({
  columns,
  items,
  onChange,
  onErrors,
}: WorksheetProps<T>): React.ReactElement<WorksheetProps<T>> => {
  const rows = useStore(useMemo(() => (state) => state.rows, []));
  const setRows = useStore((state) => state.setRows);

  const editedCells = useStore(useMemo(() => (state) => state.editedCells, []));
  const invalidCells = useStore(useMemo(() => (state) => state.invalidCells, []));

  // Create a new reference since state mutates rows to prevent unecessary rerendering
  useEffect(() => setRows([...items]), [items, setRows]);

  useEffect(() => {
    if (editedCells.length) {
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

  return (
    <UpdateItemsProvider items={rows}>
      <Table>
        {renderedHeaders}
        {renderedRows}
      </Table>
    </UpdateItemsProvider>
  );
};

export const Worksheet = typedMemo(InternalWorksheet);
