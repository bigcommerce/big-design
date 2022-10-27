import React from 'react';
import 'jest-styled-components';

import { render, screen } from '@test/utils';

import { TableColumn } from '../types';

import { Row } from './Row';
import { useRowState } from './useRowState';

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
    <Row
      columns={defaultColumns}
      headerCellWidths={[]}
      isDraggable={false}
      item={item}
      parentRowIndex={0}
      selectedItems={{}}
    />,
  );

  const name = await screen.findByRole('row', { name: /Smith Journal 13/i });

  expect(name).toBeVisible();
});

test('row state callbacks execute argument callback', () => {
  const onExpandedRow = jest.fn();
  const onItemSelect = jest.fn();

  const { onChange, onExpandedChange } = useRowState({
    childrenRows: [],
    isParentRow: true,
    isSelected: false,
    onExpandedRow,
    onItemSelect,
    parentRowIndex: 0,
  });

  onChange();

  expect(onItemSelect).toHaveBeenCalled();

  onExpandedChange();

  expect(onExpandedRow).toHaveBeenCalled();
});
