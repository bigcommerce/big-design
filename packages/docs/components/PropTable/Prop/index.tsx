import { Link, Table } from '@bigcommerce/big-design';
import React from 'react';

import { Code } from '../../';

interface Props {
  name: string;
  defaults?: string;
  required?: boolean;
  types?: string | React.ReactElement | Array<React.ReactElement | string>;
}

export const Prop: React.FC<Props> = props => {
  const { children, defaults, name, required, types } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <Code primary>{name}</Code>
        {required ? <b> *</b> : null}
      </Table.Cell>
      <Table.Cell>
        <TypesData types={types} />
      </Table.Cell>
      <Table.Cell>
        <Code highlight={false}>{defaults}</Code>
      </Table.Cell>
      <Table.Cell>{children}</Table.Cell>
    </Table.Row>
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
          {type.type === Link ? <Code highlight={false}>{type}</Code> : <Code>{type}</Code>}
          {index < types.length - 1 ? ' | ' : null}
        </React.Fragment>
      );
    });
  }

  return types.type === Link ? <Code highlight={false}>{types}</Code> : <Code>{types}</Code>;
};
