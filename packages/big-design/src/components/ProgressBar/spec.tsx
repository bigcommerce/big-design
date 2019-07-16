import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { ProgressBar } from './ProgressBar';

test('render determinant progress bar', () => {
  const { container } = render(<ProgressBar percent={50} />);

  expect(container).toMatchSnapshot();
});

test('render indeterminant progress bar', () => {
  const { container } = render(<ProgressBar />);

  expect(container).toMatchSnapshot();
});
