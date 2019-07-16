import React from 'react';

import { RequiredContext } from '../';
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
    <RequiredContext.Consumer>
      {(value: boolean) => (
        <StyledTableRow>
          <StyledTableData>
            <StyledCode>{name}</StyledCode>
          </StyledTableData>
          <StyledTableData>
            <TypesData types={types} />
          </StyledTableData>
          <StyledTableData>
            <code>{defaults}</code>
          </StyledTableData>
          <StyledTableData>{children}</StyledTableData>
          {value ? <StyledTableData>{required ? 'Yes' : null}</StyledTableData> : null}
        </StyledTableRow>
      )}
    </RequiredContext.Consumer>
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
        <>
          <StyledCode alt>{type}</StyledCode>
          {index < types.length - 1 ? ' | ' : null}
        </>
      );
    });
  }

  return <StyledCode alt>{types}</StyledCode>;
};
