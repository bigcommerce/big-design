import React, { memo } from 'react';

import { Pagination } from '../../Pagination';
import { TablePaginationProps } from '../types';

import { StyledPaginationContainer } from './styled';

export const TablePagination: React.FC<TablePaginationProps> = memo(
  (props: TablePaginationProps) => {
    return (
      <StyledPaginationContainer flexShrink={0}>
        <Pagination {...props} />
      </StyledPaginationContainer>
    );
  },
);
