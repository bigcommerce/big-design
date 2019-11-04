import { ArrowDownwardIcon, ArrowUpwardIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { typedMemo } from '../../../utils';
import { Flex } from '../../Flex';
import { TableColumn, TableItem } from '../types';

import { StyledTableHeaderCell, StyledTableHeaderCheckbox } from './styled';

export interface HeaderCellProps<T> extends React.TableHTMLAttributes<HTMLTableCellElement> {
  column: TableColumn<T>;
  isSorted?: boolean;
  sortDirection?: 'ASC' | 'DESC';
  stickyHeader?: boolean;
  onSortClick?(column: TableColumn<T>): void;
}

export interface HeaderCheckboxCellProps {
  stickyHeader?: boolean;
}

const InternalHeaderCell = <T extends TableItem>({
  children,
  column,
  isSorted,
  onSortClick,
  sortDirection,
  stickyHeader,
}: HeaderCellProps<T>) => {
  const { align, isSortable, width } = column;

  const renderSortIcon = () => {
    if (!isSorted) {
      return null;
    }

    return sortDirection === 'ASC' ? (
      <ArrowUpwardIcon size="medium" data-testid="asc-icon" title="Ascending order" />
    ) : (
      <ArrowDownwardIcon size="medium" data-testid="desc-icon" title="Descending order" />
    );
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isSortable && typeof onSortClick === 'function') {
      onSortClick(column);
    }
  };

  return (
    <StyledTableHeaderCell isSortable={isSortable} stickyHeader={stickyHeader} onClick={handleClick} width={width}>
      <Flex alignItems="center" flexDirection="row" justifyContent={align}>
        {children}
        {renderSortIcon()}
      </Flex>
    </StyledTableHeaderCell>
  );
};

export const HeaderCheckboxCell: React.FC<HeaderCheckboxCellProps> = memo(({ stickyHeader }) => (
  <StyledTableHeaderCheckbox stickyHeader={stickyHeader} />
));

export const HeaderCell = typedMemo(InternalHeaderCell);
