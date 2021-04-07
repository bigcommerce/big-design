import React, { createContext, ReactNode, useCallback, useMemo } from 'react';

import { typedMemo } from '../../../../utils';
import { useStore } from '../../hooks';
import { Cell } from '../../types';

export interface UpdateItemsContextType {
  updateItems(items: Cell<unknown>[], newValue: Array<unknown>): void;
}

interface UpdateItemsProviderProps<T> {
  children: ReactNode;
  items: T[];
}

interface UpdatedCell {
  cell: Cell<unknown>;
  newValue: unknown;
}

export const UpdateItemsContext = createContext<UpdateItemsContextType | null>(null);

export const UpdateItemsProvider = typedMemo(
  <T extends Record<string, unknown>>({ children, items }: UpdateItemsProviderProps<T>) => {
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
  },
);
