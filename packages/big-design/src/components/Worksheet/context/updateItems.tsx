import React, { createContext, useCallback, useMemo } from 'react';

export interface UpdateItemsContextType {
  updateItems(items: Cell[]): void;
}

interface UpdateItemsProviderProps<T> {
  items: T[];
  onChange(items: T[]): void;
}

interface Cell {
  value: any;
  hash: string;
  rowIndex: number;
}

export const UpdateItemsContext = createContext<UpdateItemsContextType | null>(null);

// TODO: fix type
export const UpdateItemsProvider: React.FC<UpdateItemsProviderProps<any>> = ({ children, items, onChange }) => {
  const updateItems = useCallback(
    (cells: Cell[]) => {
      const result = cells.reduce(
        (accum, cell) => {
          const index = cell.rowIndex;

          const row = accum[index];

          const newRow = { ...row, [cell.hash]: cell.value };

          accum[index] = newRow;

          return accum;
        },
        [...items],
      );

      onChange(result);
    },
    [items, onChange],
  );

  const providerValue = useMemo(
    () => ({
      updateItems,
    }),
    [updateItems],
  );

  return <UpdateItemsContext.Provider value={providerValue}>{children}</UpdateItemsContext.Provider>;
};
