import { TableColumn } from '../types';

import { calculateColSpan } from './helpers';

interface Item {
  sku: string;
  name: string;
  stock: number;
  children?: Item[];
}

const columns: Array<TableColumn<Item>> = [
  { hash: 'sku', header: 'Sku', render: ({ sku }) => sku },
  { hash: 'name', header: 'Name', render: ({ name }) => name },
  { hash: 'stock', header: 'Stock', render: ({ stock }) => stock },
];

test('should increment for draggable row', () => {
  const totalColSpans = calculateColSpan({
    columns,
    isExpandable: false,
    isDraggable: true,
    isSelectable: false,
  });

  expect(totalColSpans).toBe(4);
});

test('should increment for expandable row', () => {
  const totalColSpans = calculateColSpan({
    columns,
    isExpandable: true,
    isDraggable: false,
    isSelectable: false,
  });

  expect(totalColSpans).toBe(4);
});

test('should increment for selectable row', () => {
  const totalColSpans = calculateColSpan({
    columns,
    isExpandable: false,
    isDraggable: false,
    isSelectable: true,
  });

  expect(totalColSpans).toBe(4);
});
