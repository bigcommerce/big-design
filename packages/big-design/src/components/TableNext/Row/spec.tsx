import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import type { TableColumn } from '../types';

import { Row } from './Row';

interface Item {
  sku: string;
  name: string;
  stock: number;
  children?: Item[];
}

const item = { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 };

const defaultColumns: Array<TableColumn<Item>> = [
  { hash: 'sku', header: 'Sku', render: ({ sku }) => sku },
  { hash: 'name', header: 'Name', render: ({ name }) => name },
  { hash: 'stock', header: 'Stock', render: ({ stock }) => stock },
];

test('renders a table row', async () => {
  render(
    <table>
      <tbody>
        <Row
          childrenRowsIds={[]}
          columns={defaultColumns}
          index={0}
          isDraggable={false}
          item={item}
          itemCount={1}
          onItemSelect={() => jest.fn}
          parentRowId="0"
          selectedItems={{}}
          tableId="test-table"
        />
      </tbody>
    </table>,
  );

  const name = await screen.findByRole('row', { name: /Smith Journal 13/i });

  expect(name).toBeVisible();
});
