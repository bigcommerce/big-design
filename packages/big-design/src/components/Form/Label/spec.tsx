import { render, screen } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FormControlLabel } from './index';

test('renders a label', () => {
  render(<FormControlLabel htmlFor="test-id">This is a label</FormControlLabel>);

  expect(screen.getByText('This is a label')).toBeInTheDocument();
});

test('does not forward styles', () => {
  render(
    <FormControlLabel className="test" htmlFor="test-id" style={{ background: 'red' }}>
      Label
    </FormControlLabel>,
  );

  expect(screen.queryByText('test')).not.toBeInTheDocument();
  expect(screen.getByText('Label')).not.toHaveStyle('background: red');
});

test('appends * text when required', () => {
  render(
    <FormControlLabel htmlFor="test-id" required>
      This is a label
    </FormControlLabel>,
  );

  expect(screen.getByText('This is a label')).toBeInTheDocument();
  expect(screen.getByText('*')).toBeInTheDocument();
});
