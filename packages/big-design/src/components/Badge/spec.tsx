import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

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

test('render primary Badge', () => {
  const { container } = render(<Badge label="Badge" variant="primary" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary40}`);
});

test('render subtle Badge', () => {
  const { container } = render(<Badge label="Badge" subtle variant="primary" />);

  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary30}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
});

test('falls back to the solid style when subtle is unsupported for the variant', () => {
  // @ts-expect-error subtle is only supported by the primary variant
  const { container } = render(<Badge label="Badge" subtle variant="danger" />);

  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger40}`);
});

test('render small Badge', () => {
  const { container } = render(<Badge label="1" size="small" />);

  expect(container.firstChild).toHaveStyle('font-size: 0.625rem');
  expect(container.firstChild).toHaveStyle('line-height: 1rem');
});

test("doesn't render if label prop is invalid", () => {
  // @ts-expect-error ignoring since label={Component} is not a valid prop
  const { container } = render(<Badge label={<p>Label</p>} />);

  expect(container).toBeEmptyDOMElement();
});
