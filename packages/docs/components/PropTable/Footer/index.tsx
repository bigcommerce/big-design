import { Small, Table } from '@bigcommerce/big-design';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <Table.Row>
      <Table.Cell colSpan={4}>
        <Small>Props ending with * are required</Small>
      </Table.Cell>
    </Table.Row>
  );
};
