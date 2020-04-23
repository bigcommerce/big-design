import { H2, Link, Small, Table, TableFigure, Text } from '@bigcommerce/big-design';
import React, { FC, ReactNode } from 'react';

import { Code } from '../Code';
import { Collapsible } from '../Collapsible';

interface TypesDataProps {
  types: any;
}

export interface Prop {
  name: ReactNode;
  types: ReactNode | ReactNode[];
  defaultValue?: ReactNode;
  description: ReactNode;
  required?: boolean;
}

export interface PropTableProps {
  collapsible?: boolean;
  id?: string;
  title: string;
  propList: Prop[];
}

export type PropTableWrapper = Partial<PropTableProps>;

export const PropTable: FC<PropTableProps> = (props) => {
  const { collapsible, id, propList: items, title } = props;

  const renderTable = () => (
    <TableFigure>
      <Table
        columns={[
          {
            header: 'Prop Name',
            hash: 'propName',
            render: ({ name, required }) => (
              <>
                <Code primary>{name}</Code>
                {required ? <b> *</b> : null}
              </>
            ),
          },
          {
            header: 'Type',
            hash: 'type',
            render: ({ types }) => <TypesData types={types} />,
          },
          {
            header: 'Default',
            hash: 'default',
            render: ({ defaultValue }) => <Code highlight={false}>{defaultValue}</Code>,
          },
          {
            header: 'Description',
            hash: 'description',
            width: '50%',
            render: ({ description }) => <Text>{description}</Text>,
          },
        ]}
        items={items}
      />

      <Small marginTop="xSmall">Props ending with * are required</Small>
    </TableFigure>
  );

  return collapsible ? (
    <Collapsible title={`${title} Props`}>{renderTable()}</Collapsible>
  ) : (
    <>
      <H2 id={id}>{title}</H2>
      {renderTable()}
    </>
  );
};

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
