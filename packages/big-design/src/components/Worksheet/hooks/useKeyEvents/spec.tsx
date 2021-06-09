import { renderHook } from '@testing-library/react-hooks';

import { useKeyEvents } from './useKeyEvents';

const mockNavigate = jest.fn();
jest.mock('../useNavigation', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

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
});
