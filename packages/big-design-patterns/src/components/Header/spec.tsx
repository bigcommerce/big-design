import { render, screen } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

test('renders basic header', () => {
  render(<Header title="Page heading" />);

  expect(screen.getByRole('heading', { level: 1, name: 'Page heading' })).toBeInTheDocument();
});
