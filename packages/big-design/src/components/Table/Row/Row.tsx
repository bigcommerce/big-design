import React, { memo, useContext } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableSectionContext } from '../context';
import { Cell } from '../Cell/Cell';

import { StyledTableRow } from './styled';

export interface RowProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  isSelectable: boolean;
  selected?: boolean;
  onItemSelect?(nextValue: boolean): void;
}

export const Row: React.FC<RowProps> = memo(({ children, isSelectable, selected = false, onItemSelect }) => {
  const tableSectionContext = useContext(TableSectionContext);

  const handleSelect = () => {
    if (typeof onItemSelect === 'function') {
      onItemSelect(!selected);
    }
  };

  return (
    <StyledTableRow selected={selected}>
      {isSelectable ? (
        <Cell isCheckbox>
          {tableSectionContext === 'tbody' ? <Checkbox checked={selected} onChange={handleSelect} /> : null}
        </Cell>
      ) : null}
      {children}
    </StyledTableRow>
  );
});
