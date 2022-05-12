import React, { createContext, ReactNode, useCallback, useMemo } from 'react';

import { typedMemo } from '../../../../utils';
import { useStore } from '../../hooks';
import { Cell, WorksheetItem } from '../../types';

export interface UpdateItemsContextType<T> {
  updateItems(items: Array<Cell<T>>, newValue: unknown[]): void;
}

interface UpdateItemsProviderProps<Item> {
  children: ReactNode;
  items: Item[];
}

export const UpdateItemsContext = createContext<UpdateItemsContextType<unknown> | null>(null);

export const UpdateItemsProvider = typedMemo(
  <T extends WorksheetItem>({ children, items }: UpdateItemsProviderProps<T>) => {
    const setRows = useStore((state) => state.setRows);
    const addEditedCells = useStore((state) => state.addEditedCells);

    const updateItems: UpdateItemsContextType<T>['updateItems'] = useCallback(
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cells.reduce<Array<Cell<any>>>((accum, cell, index) => {
            // Don't add since value is the same
            if (cell.value === newValues[index]) {
              return accum;
            }

            return [...accum, { ...cell, value: newValues[index] }];
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

    return (
      <UpdateItemsContext.Provider value={providerValue}>{children}</UpdateItemsContext.Provider>
    );
  },
);
