import { render } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { FormControlLabel } from './index';

test('renders a label', () => {
  const { container } = render(<FormControlLabel>This is a label</FormControlLabel>);
  const label = container.querySelector('label');

  expect(label).toBeInTheDocument();
});

test('does not forward styles', () => {
  const { container } = render(<FormControlLabel className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('appends * text when required', () => {
  const { container } = render(<FormControlLabel required>This is a label</FormControlLabel>);
  const label = container.querySelector('label');

  expect(label).toHaveTextContent('This is a label *');
});
