import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

import { Badge } from './index';

test('has margin props', () => {
  const { container, rerender } = render(<Badge label="Badge" />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Badge label="Badge" margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default Badge', () => {
  const { container } = render(<Badge label="Badge" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test('render success Badge', () => {
  const { container } = render(<Badge label="Badge" variant="success" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success50}`);
});

test('render danger Badge', () => {
  const { container } = render(<Badge label="Badge" variant="danger" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger40}`);
});

test('render warning Badge', () => {
  const { container } = render(<Badge label="Badge" variant="warning" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning40}`);
});

test('render secondary Badge', () => {
  const { container } = render(<Badge label="Badge" variant="secondary" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test("doesn't render if label prop is invalid", () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { container } = render(<Badge label={<p>Label</p>} />);

  expect(container.firstChild).toBe(null);
});
