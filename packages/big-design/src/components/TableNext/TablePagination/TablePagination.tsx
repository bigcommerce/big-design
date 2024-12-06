import React, { memo } from 'react';

import { OffsetPagination } from '../../OffsetPagination';
import { StatelessPagination } from '../../StatelessPagination';
import { DiscriminatedTablePaginationProps } from '../types';

import { StyledPaginationContainer } from './styled';

export const TablePagination: React.FC<DiscriminatedTablePaginationProps> = memo((props) => {
  return (
    <StyledPaginationContainer flexShrink={0}>
      {props.type === 'offset' ? (
        <OffsetPagination {...props} />
      ) : (
        <StatelessPagination {...props} />
      )}
    </StyledPaginationContainer>
  );
});
