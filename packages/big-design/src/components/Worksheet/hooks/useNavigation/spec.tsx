import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { Cell, WorksheetColumn } from '../../types';
import { useStore } from '../useStore';

import { useNavigation } from './useNavigation';

interface Product {
  id: number;
  productName: string;
  visibleOnStorefront: boolean;
  otherField: string;
}

const columns: WorksheetColumn<Product>[] = [
  { hash: 'productName', header: 'Product name', validation: (value: string) => !!value },
  { hash: 'visibleOnStorefront', header: 'Visible on storefront', type: 'checkbox' },
  { hash: 'otherField', header: 'Other field' },
];

const items: Product[] = [
  {
    id: 1,
    productName: 'One',
    visibleOnStorefront: true,
    otherField: 'Text',
  },
  {
    id: 2,
    productName: 'Two',
    visibleOnStorefront: true,
    otherField: 'Text',
  },
  {
    id: 3,
    productName: 'Three',
    visibleOnStorefront: false,
    otherField: 'Text',
  },
];

const initialStoreState = useStore.getState();

beforeEach(() => {
  useStore.setState({ ...initialStoreState, rows: items, columns }, true);
});

describe('useNavigation', () => {
  const cell: Cell<Product> = { rowIndex: 0, columnIndex: 0, type: 'text', hash: 'productName', value: 'One' };

  test('navigates', () => {
    const { result: hook } = renderHook(() => useNavigation(cell));
    const { result: store } = renderHook(() => useStore());

    act(() => {
      hook.current.navigate({ rowIndex: 1, columnIndex: 0 });
    });

    expect(store.current.selectedCells).toStrictEqual([
      { rowIndex: 1, columnIndex: 0, type: 'text', hash: 'productName', value: 'Two' },
    ]);
  });

  test('navigates only on valid position', () => {
    const { result: hook } = renderHook(() => useNavigation(cell));
    const { result: store } = renderHook(() => useStore());

    act(() => {
      hook.current.navigate({ rowIndex: 0, columnIndex: -1 });
    });

    expect(store.current.selectedCells).toStrictEqual([]);
  });
});
