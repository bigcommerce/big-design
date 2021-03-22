import React, { memo, useMemo } from 'react';

import { useStore } from '../Worksheet';

import { Status } from './styled';

export interface RowStatusProps {
  rowIndex: number;
}

export const RowStatus: React.FC<RowStatusProps> = memo(({ rowIndex }) => {
  const isSelected = useStore(useMemo(() => (state) => state.selectedRows.includes(rowIndex), [rowIndex]));

  return <Status isSelected={isSelected} />;
});
