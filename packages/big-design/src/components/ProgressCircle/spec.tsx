import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { ProgressCircle } from './ProgressCircle';

test('render determinant progress circle', () => {
  const { container } = render(<ProgressCircle variant="determinant" percent={50} />);

  expect(container).toMatchSnapshot();
});

test('render completed determinant progress circle', () => {
  const { container } = render(<ProgressCircle isComplete={true} variant="indeterminant" />);

  expect(container).toMatchSnapshot();
});

test('render error determinant progress circle', () => {
  const { container } = render(<ProgressCircle error={true} variant="indeterminant" />);

  expect(container).toMatchSnapshot();
});

test('render indeterminant progress bar', () => {
  const { container } = render(<ProgressCircle variant="indeterminant" />);

  expect(container).toMatchSnapshot();
});

test('render large progress circle', () => {
  const { container } = render(<ProgressCircle size="large" />);

  expect(container).toMatchSnapshot();
});

test('render medium progress circle', () => {
  const { container } = render(<ProgressCircle size="medium" />);

  expect(container).toMatchSnapshot();
});

test('render small progress circle', () => {
  const { container } = render(<ProgressCircle size="small" />);

  expect(container).toMatchSnapshot();
});

test('render xSmall progress circle', () => {
  const { container } = render(<ProgressCircle size="xSmall" />);

  expect(container).toMatchSnapshot();
});
