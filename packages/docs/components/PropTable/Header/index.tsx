import { Table } from '@bigcommerce/big-design';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <Table.Row>
      <Table.Cell>Prop Name</Table.Cell>
      <Table.Cell>Type</Table.Cell>
      <Table.Cell>Default</Table.Cell>
      <Table.Cell>Description</Table.Cell>
    </Table.Row>
  );
};
