import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { Box } from './index';

test('box should have margin props', () => {
  const { container, rerender } = render(<Box />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Box margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});
