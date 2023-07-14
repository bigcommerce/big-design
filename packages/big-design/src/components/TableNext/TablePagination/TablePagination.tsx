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
    localization,
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
          localization={localization}
          onItemsPerPageChange={onItemsPerPageChange}
          onPageChange={onPageChange}
          totalItems={totalItems}
        />
      </StyledPaginationContainer>
    );
  },
);
