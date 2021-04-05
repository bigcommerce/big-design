import React, { createContext, memo, useCallback, useMemo } from 'react';

import { useStore } from '../../hooks';
import { Cell } from '../../types';

export interface UpdateItemsContextType {
  updateItems(items: Cell[], newValue: Array<Cell['value']>): void;
}

interface UpdateItemsProviderProps {
  items: any[]; //TODO: can we pass T type here?
}

interface UpdatedCell {
  cell: Cell;
  newValue: Cell['value'];
}

export const UpdateItemsContext = createContext<UpdateItemsContextType | null>(null);

export const UpdateItemsProvider: React.FC<UpdateItemsProviderProps> = memo(({ children, items }) => {
  const setRows = useStore((state) => state.setRows);
  const addEditedCells = useStore((state) => state.addEditedCells);

  const updateItems: UpdateItemsContextType['updateItems'] = useCallback(
    (cells, newValues) => {
      const newEditedCells = cells.reduce<UpdatedCell[]>(
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
});
