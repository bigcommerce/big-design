import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-test-renderer';

import { Cell } from '../types';

import { useEditableCell } from './useEditableCell';

let mockUpdateItems = jest.fn();
jest.mock('./useUpdateItems', () => ({
  useUpdateItems: () => ({
    updateItems: mockUpdateItems,
  }),
}));

describe('useEditableCells', () => {
  const cell: Cell<unknown> = { rowIndex: 0, columnIndex: 0, type: 'text', hash: 'category', value: 'Text' };

  let preventDefault: () => void;
  let stopPropagation: () => void;

  beforeEach(() => {
    mockUpdateItems = jest.fn();
    preventDefault = jest.fn();
    stopPropagation = jest.fn();
  });

  // afterAll(() => jest.unmock('./useUpdateItems'));

  test('double click', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => result.current.handleDoubleClick());

    expect(result.current.isEditing).toBe(true);
  });

  test('blur', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleDoubleClick();
      result.current.handleBlur();
    });

    expect(result.current.isEditing).toBe(false);
  });

  test('enter', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleDoubleClick();
      result.current.handleKeyDown(
        ({
          currentTarget: 1,
          target: 1,
          key: 'Enter',
          preventDefault,
          stopPropagation,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(mockUpdateItems).toHaveBeenCalledWith([cell], ['New Value']);
    expect(result.current.isEditing).toBe(false);
  });

  test('escape', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleDoubleClick();
      result.current.handleKeyDown(
        ({
          currentTarget: 1,
          target: 1,
          key: 'Escape',
          preventDefault,
          stopPropagation,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(result.current.isEditing).toBe(false);
  });
});
