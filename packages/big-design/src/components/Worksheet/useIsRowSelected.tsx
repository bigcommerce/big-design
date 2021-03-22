import { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

export const useIsRowSelected = (rowIndex: number) => {
  const { rowSelected } = useStoreon('rowSelected');
  const [isRowSelected, setIsRowSelected] = useState(false);

  useEffect(() => {
    if (rowSelected === rowIndex) {
      setIsRowSelected(true);
    } else {
      setIsRowSelected(false);
    }
  }, [rowIndex, rowSelected]);

  console.log(isRowSelected, rowIndex, rowSelected);

  return useMemo(
    () => ({
      isRowSelected,
    }),
    [isRowSelected],
  );
};
