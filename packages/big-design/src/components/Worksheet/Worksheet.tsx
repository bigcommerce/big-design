import React, { useEffect, useMemo } from 'react';

import { typedMemo } from '../../utils';

import { UpdateItemsProvider } from './context';
import { useStore } from './hooks';
import { Row } from './Row';
import { Status } from './RowStatus/styled';
import { Header, Table } from './styled';
import { WorksheetProps } from './types';

const InternalWorksheet = <T extends unknown>({ columns, items, onChange, onErrors }: WorksheetProps<T>) => {
  const rows = useStore((state) => state.rows);
  const setRows = useStore((state) => state.setRows);

  useEffect(() => setRows(items), [items, setRows]);

  const editedCells = useStore((state) => state.editedCells);
  const invalidCells = useStore((state) => state.invalidCells);

  useEffect(() => {
    if (editedCells.length) {
      onChange(editedCells);
    }
  }, [editedCells, onChange]);

  useEffect(() => {
    if (typeof onErrors === 'function' && invalidCells.length) {
      onErrors(invalidCells);
    }
  }, [invalidCells, onErrors]);

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
