import React from 'react';

import 'jest-styled-components';
import { render } from '@test/utils';

import { FormControlLabel } from './index';

test('renders a label', () => {
  const { container } = render(<FormControlLabel>This is a label</FormControlLabel>);
  const label = container.querySelector('label');

  expect(label).toBeInTheDocument();
});

test('does not forward styles', () => {
  const { container } = render(<FormControlLabel className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('appends (optional) text when renderOptional', () => {
  const { container } = render(<FormControlLabel renderOptional>This is a label</FormControlLabel>);
  const label = container.querySelector('label');

  expect(label).toHaveStyleRule('content', "' (optional)'", { modifier: '::after' });
});
