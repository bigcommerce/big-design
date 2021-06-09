import { renderHook } from '@testing-library/react-hooks';

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

  test('navigations', () => {
    const { result } = renderHook(() => useNavigation(cell));

    result.current.navigate({ rowIndex: 1, columnIndex: 0 });

    const { result: useStateResult } = renderHook(() => useStore((state) => state.selectedCells));

    expect(useStateResult.current).toStrictEqual([
      { rowIndex: 1, columnIndex: 0, type: 'text', hash: 'productName', value: 'Two' },
    ]);
  });
});
