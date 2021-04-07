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

export const UpdateItemsContext = createContext<UpdateItemsContextType | null>(null);

export const UpdateItemsProvider = typedMemo(
  <T extends Record<string, unknown>>({ children, items }: UpdateItemsProviderProps<T>) => {
    const setRows = useStore((state) => state.setRows);
    const addEditedCells = useStore((state) => state.addEditedCells);

    const updateItems: UpdateItemsContextType['updateItems'] = useCallback(
      (cells, newValues) => {
        setRows(
          cells.reduce((accum, cell, index) => {
            const { hash, rowIndex } = cell;

            // Don't change since value is the same
            if (cell.value === newValues[index]) {
              return accum;
            }

            const row = accum[rowIndex];
            const updatedRow = { ...row, [hash]: newValues[index] };
            accum[rowIndex] = updatedRow;

            return accum;
          }, items),
        );

        addEditedCells(
          cells.reduce<Cell<unknown>[]>((accum, cell, index) => {
            // Don't add since value is the same
            if (cell.value === newValues[index]) {
              return accum;
            }

            return accum.concat({ ...cell, value: newValues[index] });
          }, []),
        );
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
