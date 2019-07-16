import React from 'react';

import { StyledCode, StyledTableData, StyledTableRow } from '../styled';

interface Props {
  name: string;
  defaults?: string;
  required?: boolean;
  types?: string | string[] | React.ReactElement;
}

export const Prop: React.FC<Props> = props => {
  const { children, defaults, name, required, types } = props;

  return (
    <StyledTableRow>
      <StyledTableData>
        <StyledCode>{name}</StyledCode>
        {required ? <b> *</b> : null}
      </StyledTableData>
      <StyledTableData>
        <TypesData types={types} />
      </StyledTableData>
      <StyledTableData>
        <code>{defaults}</code>
      </StyledTableData>
      <StyledTableData>{children}</StyledTableData>
    </StyledTableRow>
  );
};

interface TypesDataProps {
  types: any;
}

const TypesData: React.FC<TypesDataProps> = (props): any => {
  const { types } = props;

  if (Array.isArray(types)) {
    return types.map((type, index) => {
      return (
        <React.Fragment key={type}>
          <StyledCode altColor>{type}</StyledCode>
          {index < types.length - 1 ? ' | ' : null}
        </React.Fragment>
      );
    });
  }

  return <StyledCode altColor>{types}</StyledCode>;
};
