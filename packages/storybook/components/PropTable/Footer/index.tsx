import { Small } from '@bigcommerce/big-design';
import React from 'react';

import { StyledTableHeader, StyledTableRow } from '../styled';

export const Footer: React.FC = () => {
  return (
    <StyledTableRow>
      <StyledTableHeader colSpan={4}>
        <Small>Props ending with * are required</Small>
      </StyledTableHeader>
    </StyledTableRow>
  );
};
