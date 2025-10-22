import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Badge } from './index';

test('has margin props', () => {
  const { rerender } = render(<Badge label="Badge" />);
  const badge = screen.getByText('Badge');

  expect(badge).not.toHaveStyle('margin: 1rem');

  rerender(<Badge label="Badge" margin="medium" />);

  expect(badge).toHaveStyle('margin: 1rem');
});

test('render default Badge', () => {
  render(<Badge label="Badge" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test('render success Badge', () => {
  render(<Badge label="Badge" variant="success" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.success50}`);
});

test('render danger Badge', () => {
  render(<Badge label="Badge" variant="danger" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.danger40}`);
});

test('render warning Badge', () => {
  render(<Badge label="Badge" variant="warning" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.warning40}`);
});

test('render secondary Badge', () => {
  render(<Badge label="Badge" variant="secondary" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test('render primary Badge', () => {
  render(<Badge label="Badge" variant="primary" />);

  const badge = screen.getByText('Badge');

  expect(badge).toMatchSnapshot();
  expect(badge).toHaveStyle(`background-color: ${theme.colors.primary40}`);
});

test("doesn't render if label prop is invalid", () => {
  // @ts-expect-error ignoring since label={Component} is not a valid prop
  const { container } = render(<Badge label={<p>Label</p>} />);

  expect(container).toBeEmptyDOMElement();
});
