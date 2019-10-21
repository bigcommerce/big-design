import { ArrowDownwardIcon, ArrowUpwardIcon } from '@bigcommerce/big-design-icons';
import React, { memo } from 'react';

import { Flex } from '../../Flex';

import { StyledTableHeaderCell, StyledTableHeaderCheckbox } from './styled';

export interface HeaderCellProps extends React.TableHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  isCheckbox?: boolean;
  isSortable?: boolean;
  isSorted?: boolean;
  sortDirection?: 'ASC' | 'DESC';
  stickyHeader?: boolean;
  width?: number | string;
  onSortClick?(): void;
}

export const HeaderCell: React.FC<HeaderCellProps> = memo(
  ({
    align,
    children,
    isCheckbox,
    isSortable,
    isSorted,
    onSortClick,
    sortDirection,
    stickyHeader,
    width,
  }: HeaderCellProps) => {
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
        onSortClick();
      }
    };

    return isCheckbox ? (
      <StyledTableHeaderCheckbox stickyHeader={stickyHeader} align={align} width={width} />
    ) : (
      <StyledTableHeaderCell
        align={align}
        isSortable={isSortable}
        stickyHeader={stickyHeader}
        onClick={handleClick}
        width={width}
      >
        <Flex alignItems="center" flexDirection="row">
          {children}
          {renderSortIcon()}
        </Flex>
      </StyledTableHeaderCell>
    );
  },
);
