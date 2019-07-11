import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { ProgressCircle } from './ProgressCircle';

test('render determinant progress circle', () => {
  const { container } = render(<ProgressCircle state="incomplete" percent={50} />);

  expect(container).toMatchSnapshot();
});

test('render completed determinant progress circle', () => {
  const { container } = render(<ProgressCircle state="complete" />);

  expect(container).toMatchSnapshot();
});

test('render error determinant progress circle', () => {
  const { container } = render(<ProgressCircle state="error" />);

  expect(container).toMatchSnapshot();
});

test('render indeterminant progress bar', () => {
  const { container } = render(<ProgressCircle state="indeterminant" />);

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
