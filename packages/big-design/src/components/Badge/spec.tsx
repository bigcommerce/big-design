import { render, screen } from '@testing-library/react';
import React from 'react';

import { Badge } from './index';

test('has margin props', () => {
  const { rerender } = render(<Badge label="Badge" />);

  expect(screen.getByText('Badge')).not.toHaveClass('m-medium');

  rerender(<Badge label="Badge" margin="medium" />);

  expect(screen.getByText('Badge')).toHaveClass('m-medium');
});

test('render default Badge', () => {
  render(<Badge label="Badge" />);

  expect(screen.getByText('Badge')).toHaveClass('bg-secondary60');
});

test('render success Badge', () => {
  render(<Badge label="Badge" variant="success" />);

  expect(screen.getByText('Badge')).toHaveClass('bg-success50');
});

test('render danger Badge', () => {
  render(<Badge label="Badge" variant="danger" />);

  expect(screen.getByText('Badge')).toHaveClass('bg-danger40');
});

test('render warning Badge', () => {
  render(<Badge label="Badge" variant="warning" />);

  const badge = screen.getByText('Badge');

  expect(badge).toHaveClass('bg-warning40');
  expect(badge).toHaveClass('text-secondary70');
});

test('render secondary Badge', () => {
  render(<Badge label="Badge" variant="secondary" />);

  expect(screen.getByText('Badge')).toHaveClass('bg-secondary60');
});

test('render primary Badge', () => {
  render(<Badge label="Badge" variant="primary" />);

  expect(screen.getByText('Badge')).toHaveClass('bg-primary40');
});

test("doesn't render if label prop is invalid", () => {
  // @ts-expect-error ignoring since label={Component} is not a valid prop
  const { container } = render(<Badge label={<p>Label</p>} />);

  expect(container).toBeEmptyDOMElement();
});
