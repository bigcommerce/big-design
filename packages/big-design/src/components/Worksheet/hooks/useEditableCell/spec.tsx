import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { act } from 'react-test-renderer';

import { Cell } from '../../types';

import { useEditableCell } from './useEditableCell';

let mockUpdateItems = jest.fn();
jest.mock('../useUpdateItems', () => ({
  useUpdateItems: () => ({
    updateItems: mockUpdateItems,
  }),
}));

const mockNavigate = jest.fn();
jest.mock('../useNavigation', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

interface Product {
  category: string;
}

describe('useEditableCells', () => {
  const cell: Cell<Product> = { rowIndex: 0, columnIndex: 0, type: 'text', hash: 'category', value: 'Text' };

  let preventDefault: () => void;

  beforeEach(() => {
    mockUpdateItems = jest.fn();
    preventDefault = jest.fn();
  });

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
          key: 'Enter',
          preventDefault,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(mockUpdateItems).toHaveBeenCalledWith([cell], ['New Value']);
    expect(result.current.isEditing).toBe(false);
  });

  test('enter only updates if it has new values', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleDoubleClick();
      result.current.handleKeyDown(
        ({
          key: 'Enter',
          preventDefault,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'Text',
      );
    });

    expect(mockUpdateItems).not.toHaveBeenCalled();
  });

  test('tab', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleKeyDown(
        ({
          key: 'Tab',
          preventDefault,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith({ columnIndex: 1, rowIndex: 0 });

    act(() => {
      result.current.handleKeyDown(
        ({
          key: 'Tab',
          preventDefault,
          shiftKey: true,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith({ columnIndex: -1, rowIndex: 0 });

    expect(result.current.isEditing).toBe(false);
  });

  test('modal and select do not trigger a navigation', () => {
    const { result } = renderHook(() => useEditableCell({ ...cell, type: 'select' }));

    act(() => {
      result.current.handleKeyDown(
        ({
          key: 'Enter',
          preventDefault,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('escape', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleDoubleClick();
      result.current.handleKeyDown(
        ({
          key: 'Escape',
          preventDefault,
        } as unknown) as React.KeyboardEvent<HTMLInputElement>,
        'New Value',
      );
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(result.current.isEditing).toBe(false);
  });

  test('on change', () => {
    const { result } = renderHook(() => useEditableCell(cell));

    act(() => {
      result.current.handleChange('New Value');
    });

    expect(mockUpdateItems).toHaveBeenCalledWith([cell], ['New Value']);
  });
});
