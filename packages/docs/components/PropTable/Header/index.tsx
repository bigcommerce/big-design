import React from 'react';

import { StyledTableHeader, StyledTableRow } from '../styled';

export const Header: React.FC = () => {
  return (
    <StyledTableRow>
      <StyledTableHeader>Prop Name</StyledTableHeader>
      <StyledTableHeader>Type</StyledTableHeader>
      <StyledTableHeader>Default</StyledTableHeader>
      <StyledTableHeader>Description</StyledTableHeader>
    </StyledTableRow>
  );
};
