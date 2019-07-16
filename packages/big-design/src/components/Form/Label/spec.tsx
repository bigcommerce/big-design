import { render } from '@testing-library/react';
import React from 'react';

import { Label } from './index';

test('renders a label', () => {
  const { container } = render(<Label>This is a label</Label>);
  const label = container.querySelector('label');

  expect(label).toBeInTheDocument();
});

test('does not forward styles', () => {
  const { container } = render(<Label className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});
