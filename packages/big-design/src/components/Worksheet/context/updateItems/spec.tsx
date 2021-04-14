import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-test-renderer';

import { useStore, useUpdateItems } from '../../hooks';

import { UpdateItemsProvider } from './updateItems';

const items = [
  {
    productName: 'Shoes Name One',
    categories: 'Shoes',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 1,
  },

  {
    productName: 'Shoes Name Two',
    categories: 'Shoes',
    otherField: 'Text',
    otherField2: 'Field',
    otherField3: 2,
  },
];

describe('UpdateItemsProvider', () => {
  test('updates items', () => {
    const wrapper: React.FC = ({ children }) => <UpdateItemsProvider items={items}>{children}</UpdateItemsProvider>;

    const { result: hook } = renderHook(() => useUpdateItems(), { wrapper });
    const { result: store } = renderHook(() => useStore());

    act(() =>
      hook.current.updateItems(
        [
          { rowIndex: 1, columnIndex: 0, hash: 'productName', type: 'text', value: 'Shoes Name Two' },
          { rowIndex: 1, columnIndex: 1, hash: 'categories', type: 'text', value: 'Shoes' },
        ],
        ['Clothes Name One', 'Clothes'],
      ),
    );

    expect(store.current.rows).toEqual([
      {
        productName: 'Shoes Name One',
        categories: 'Shoes',
        otherField: 'Text',
        otherField2: 'Field',
        otherField3: 1,
      },
      {
        productName: 'Clothes Name One',
        categories: 'Clothes',
        otherField: 'Text',
        otherField2: 'Field',
        otherField3: 2,
      },
    ]);
  });
});
