import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { ProgressBar } from './ProgressBar';

test('render determinant progress bar', () => {
  const { container } = render(<ProgressBar state="incomplete" percent={50} />);

  expect(container).toMatchSnapshot();
});

test('render indeterminant progress bar', () => {
  const { container } = render(<ProgressBar state="indeterminant" />);

  expect(container).toMatchSnapshot();
});
