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
  }) => {
    return (
      <StyledPaginationContainer flexShrink={0}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={onItemsPerPageChange}
          onPageChange={onPageChange}
          totalItems={totalItems}
        />
      </StyledPaginationContainer>
    );
  },
);
