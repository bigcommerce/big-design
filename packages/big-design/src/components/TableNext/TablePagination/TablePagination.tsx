import React, { memo } from 'react';

import { Pagination } from '../../Pagination';
import { TablePaginationProps } from '../types';

import { StyledPaginationContainer } from './styled';

export const TablePagination: React.FC<TablePaginationProps> = memo(
  ({
    currentPage,
    itemsPerPage,
    itemsPerPageOptions,
    onItemsPerPageChange,
    onPageChange,
    totalItems,
    label,
    previousLabel,
    nextLabel,
    getRangeLabel,
  }) => {
    return (
      <StyledPaginationContainer flexShrink={0}>
        <Pagination
          currentPage={currentPage}
          getRangeLabel={getRangeLabel}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          label={label}
          nextLabel={nextLabel}
          onItemsPerPageChange={onItemsPerPageChange}
          onPageChange={onPageChange}
          previousLabel={previousLabel}
          totalItems={totalItems}
        />
      </StyledPaginationContainer>
    );
  },
);
