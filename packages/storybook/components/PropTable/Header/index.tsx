import React from 'react';

import { RequiredContext } from '../';
import { StyledTableHeader, StyledTableRow } from '../styled';

export const Header: React.FC = () => {
  return (
    <RequiredContext.Consumer>
      {(value: boolean) => (
        <StyledTableRow>
          <StyledTableHeader>Prop Name</StyledTableHeader>
          <StyledTableHeader>Type</StyledTableHeader>
          <StyledTableHeader>Default</StyledTableHeader>
          <StyledTableHeader>Description</StyledTableHeader>
          {value ? <StyledTableHeader>Required</StyledTableHeader> : null}
        </StyledTableRow>
      )}
    </RequiredContext.Consumer>
  );
};
