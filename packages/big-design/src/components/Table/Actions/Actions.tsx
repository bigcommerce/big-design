import React, { useContext, useState } from 'react';

import { Checkbox } from '../../Checkbox';
import { FlexProps } from '../../Flex';
import { TableContext } from '../context';

import { StyledActions, StyledActionItem } from './styled';

export interface TableActionsProps extends FlexProps {
  [k: string]: any;
  selectable?: boolean;
  tableId?: string;
  onSelectAll?(isSelected: boolean): any;
  onSelectAllClick?(isSelected: boolean): any;
}

export const TableActions: React.FC<TableActionsProps> = ({
  children,
  className,
  onSelectAll,
  onSelectAllClick,
  selectable,
  style,
  tableId,
  ...props
}) => {
  const tableContext = useContext(TableContext);
  const [selectAll, setSelectAll] = useState(false);
  const noop = () => {}; // tslint:disable-line

  const handleSelectAllClick = () => {
    const isSelected = !selectAll;

    setSelectAll(isSelected);

    if (typeof onSelectAll === 'function') {
      onSelectAll(isSelected);
    }

    if (typeof onSelectAllClick === 'function') {
      onSelectAllClick(isSelected);
    }
  };

  return (
    <TableContext.Provider value={{ ...tableContext, selectAll }}>
      <StyledActions paddingHorizontal="medium" paddingVertical="small" aria-controls={tableId} {...props}>
        {selectable ? (
          <StyledActionItem>
            <Checkbox label={false} checked={selectAll} onClick={handleSelectAllClick} onChange={noop} />
          </StyledActionItem>
        ) : null}
        {children}
        {/* <StyledActionItem>Bulk Actions</StyledActionItem> */}
        {/* <StyledActionItem>Pagination</StyledActionItem> */}
      </StyledActions>
    </TableContext.Provider>
  );
};
