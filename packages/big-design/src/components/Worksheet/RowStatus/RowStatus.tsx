import React, { memo } from 'react';
import { useShallow } from 'zustand/shallow';

import { useWorksheetStore } from '../hooks';

import { Status } from './styled';

interface RowStatusProps {
  rowIndex: number;
}

export const RowStatus: React.FC<RowStatusProps> = memo(({ rowIndex }) => {
  const { store, useStore } = useWorksheetStore();

  const isSelected: boolean = useStore(
    store,
    useShallow((state) => !!state.selectedRowsMap[rowIndex]),
  );

  const isInvalid = useStore(
    store,
    useShallow((state) => !!state.invalidRowsMap[rowIndex]),
  );

  return <Status isInvalid={isInvalid} isSelected={isSelected} />;
});
