import React, { memo, useContext } from 'react';

import { Checkbox } from '../../Checkbox';
import { TableSectionContext } from '../context';
import { Cell } from '../Cell/Cell';

import { StyledTableItem } from './styled';

export interface ItemProps extends React.TableHTMLAttributes<HTMLTableRowElement> {
  isSelectable: boolean;
  selected?: boolean;
  onItemSelect?(nextValue: boolean): void;
}

export const Item: React.FC<ItemProps> = memo(({ children, isSelectable, selected = false, onItemSelect }) => {
  const tableSectionContext = useContext(TableSectionContext);

  const handleSelect = () => {
    if (typeof onItemSelect === 'function') {
      onItemSelect(!selected);
    }
  };

  return (
    <StyledTableItem selected={selected}>
      {isSelectable ? (
        <Cell isCheckbox>
          {tableSectionContext === 'tbody' ? <Checkbox checked={selected} onChange={handleSelect} /> : null}
        </Cell>
      ) : null}
      {children}
    </StyledTableItem>
  );
});
