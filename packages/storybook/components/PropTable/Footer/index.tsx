import React from 'react';

import { StyledTableHeader, StyledTableRow } from '../styled';

export const Footer: React.FC = () => {
  return (
    <StyledTableRow>
      <StyledTableHeader colSpan={4}>* Required properties</StyledTableHeader>
    </StyledTableRow>
  );
};
