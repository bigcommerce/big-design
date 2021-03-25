import React, { createContext, useCallback, useMemo } from 'react';

import { Cell } from '../types';
import { useStore } from '../Worksheet';

export interface UpdateItemsContextType {
  updateItems(items: Cell[], newValue: Array<string | number>): void;
}

interface UpdateItemsProviderProps<T> {
  items: T[];
}

interface CellsWithNewValues {
  cell: Cell;
  newValue: string | number;
}

export const UpdateItemsContext = createContext<UpdateItemsContextType | null>(null);

// TODO: fix type
export const UpdateItemsProvider: React.FC<UpdateItemsProviderProps<any>> = ({ children, items }) => {
  const setRows = useStore((state) => state.setRows);
  const addEditedCells = useStore((state) => state.addEditedCells);

  const updateItems: UpdateItemsContextType['updateItems'] = useCallback(
    (cells, newValues) => {
      const newEditedCells = cells.reduce<CellsWithNewValues[]>(
        (accum, cell, index) =>
          cell.value !== newValues[index] ? accum.concat({ cell, newValue: newValues[index] }) : accum,
        [],
      );

      const updatedRows = newEditedCells.reduce((accum, { cell, newValue }) => {
        const { rowIndex, hash } = cell;

        const row = accum[rowIndex];
        const updatedRow = { ...row, [hash]: newValue };
        accum[rowIndex] = updatedRow;

        return accum;
      }, items);

      setRows(updatedRows);
      addEditedCells(newEditedCells.map(({ cell, newValue }) => ({ ...cell, value: newValue })));
    },
    [addEditedCells, items, setRows],
  );

  const providerValue = useMemo(
    () => ({
      updateItems,
    }),
    [updateItems],
  );

  return <UpdateItemsContext.Provider value={providerValue}>{children}</UpdateItemsContext.Provider>;
};
