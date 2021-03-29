import React, { useEffect, useMemo } from 'react';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { useStore } from './hooks';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { WorksheetProps } from './types';

const InternalWorksheet = <T extends unknown>({ columns, items, onChange, onErrors }: WorksheetProps<T>) => {
  const setRows = useStore((state) => state.setRows);
  const editedCells = useStore((state) => state.editedCells);
  const invalidCells = useStore((state) => state.invalidCells);

  console.log('invalid cells', invalidCells);

  useEffect(() => setRows(items), [items, setRows]);

  useEffect(() => {
    if (editedCells.length) {
      onChange(editedCells);
    }
  }, [editedCells, onChange]);

  useEffect(() => {
    // TODO: being called twice
    if (invalidCells.length && typeof onErrors === 'function') {
      onErrors(invalidCells);
    }
  }, [invalidCells, onErrors]);

  const rows = useStore((state) => state.rows);

  const renderHeaders = useMemo(
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

  const renderRows = useMemo(
    () => (
      <tbody>
        {rows.map((
          row, //TODO: fix
          rowIndex,
        ) => (
          <Row key={rowIndex} columns={columns} rowIndex={rowIndex} />
        ))}
      </tbody>
    ),
    [columns, rows],
  );

  return (
    <UpdateItemsProvider items={rows}>
      <Table>
        {renderHeaders}
        {renderRows}
      </Table>
    </UpdateItemsProvider>
  );
};

export const Worksheet = typedMemo(InternalWorksheet);
