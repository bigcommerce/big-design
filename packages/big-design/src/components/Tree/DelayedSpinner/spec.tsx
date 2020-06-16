import { act, render } from '@testing-library/react';
import React from 'react';

import { DelayedSpinner } from './DelayedSpinner';

test('renders DelayedSpinner after 50ms', () => {
  jest.useFakeTimers();

  act(() => {
    const { container, queryByRole } = render(<DelayedSpinner />);

    expect(container.firstChild).toBe(null);

    jest.runAllTimers();

    expect(queryByRole('progressbar')).toBeInTheDocument();
  });
});
