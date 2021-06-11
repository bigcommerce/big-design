import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { useStore } from '../useStore';

import { useKeyEvents } from './useKeyEvents';

const mockNavigate = jest.fn();
jest.mock('../useNavigation', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const initialStoreState = useStore.getState();

beforeEach(() => {
  useStore.setState(
    {
      ...initialStoreState,
      selectedCells: [{ rowIndex: 0, columnIndex: 0, type: 'text', hash: 'productName', value: 'One' }],
    },
    true,
  );
});

describe('useKeyEvents', () => {
  test('navigates with keys', () => {
    const { result } = renderHook(() => useKeyEvents());

    let event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: -1, columnIndex: 0 });

    event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: 1, columnIndex: 0 });

    event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: 0, columnIndex: 1 });

    event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: 0, columnIndex: -1 });
  });

  test('navigates with tab', () => {
    const { result } = renderHook(() => useKeyEvents());

    let event = new KeyboardEvent('keydown', { key: 'Tab' });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: 0, columnIndex: 1 });

    event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
    result.current.handleKeyDown(event);

    expect(mockNavigate).toHaveBeenCalledWith({ rowIndex: 0, columnIndex: -1 });
  });

  test('ignores navigation if isEditing', () => {
    const { result: hook } = renderHook(() => useKeyEvents());
    const { result: store } = renderHook(() => useStore());

    act(() => {
      store.current.setEditingCell({
        rowIndex: 0,
        columnIndex: 0,
        type: 'text',
        hash: 'productName',
        value: 'One',
      });
    });

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    hook.current.handleKeyDown(event);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('enter triggers cell edit', () => {
    const { result: hook } = renderHook(() => useKeyEvents());
    const { result: store } = renderHook(() => useStore());

    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    act(() => {
      hook.current.handleKeyDown(event);
    });

    expect(store.current.editingCell).toStrictEqual({
      rowIndex: 0,
      columnIndex: 0,
      type: 'text',
      hash: 'productName',
      value: 'One',
    });
  });

  test('enter does not trigger cell edit if selected cell is missing', () => {
    const { result: hook } = renderHook(() => useKeyEvents());
    const { result: store } = renderHook(() => useStore());

    act(() => {
      store.current.setSelectedCells([]);
    });

    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    act(() => {
      hook.current.handleKeyDown(event);
    });

    expect(store.current.editingCell).toStrictEqual(null);
  });
});
