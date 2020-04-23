import 'jest-styled-components';

import React from 'react';

import { render } from '@test/utils';

import { ProgressCircle } from './ProgressCircle';

test('render determinant progress circle', () => {
  const { container } = render(<ProgressCircle percent={50} />);

  expect(container).toMatchSnapshot();
});

test('render completed determinant progress circle', () => {
  const { container } = render(<ProgressCircle percent={100} />);

  expect(container).toMatchSnapshot();
});

test('render error determinant progress circle', () => {
  const { container } = render(<ProgressCircle error={true} percent={0} />);

  expect(container).toMatchSnapshot();
});

test('render indeterminant progress bar', () => {
  const { container } = render(<ProgressCircle />);

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
