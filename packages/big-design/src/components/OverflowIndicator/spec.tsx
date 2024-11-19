import React from 'react';
import { render, screen } from '@testing-library/react';
import { OverflowIndicator } from './OverflowIndicator';

test('renders without overflowing', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2']} maxLength={25} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('item1, item2')).toBeInTheDocument();
});

test('renders with overflowing items', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2', 'item3', 'item4']} maxLength={10} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('item1')).toBeInTheDocument();
  expect(screen.getByText('+3')).toBeInTheDocument();
});

test('renders with custom delimiter', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2', 'item3']} maxLength={15} delimiter=" | " />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('item1 | item2')).toBeInTheDocument();
  expect(screen.getByText('+1')).toBeInTheDocument();
});

test('renders with no items', () => {
  const { container } = render(<OverflowIndicator items={[]} maxLength={25} />);
  expect(container).toMatchSnapshot();
  expect(screen.queryByText(/./)).not.toBeInTheDocument();
});

test('renders with single long item', () => {
  const { container } = render(<OverflowIndicator items={['averylongitemthatexceedsthemaxlength']} maxLength={10} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('averylongi...')).toBeInTheDocument();
});

test('renders with multiple long items', () => {
  const { container } = render(<OverflowIndicator items={['averylongitemthatexceedsthemaxlength', 'anotherlongitem']} maxLength={10} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('averylongi...')).toBeInTheDocument();
  expect(screen.getByText('+2')).toBeInTheDocument();
});

test('renders with exact maxLength', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2']} maxLength={12} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('item1, item2')).toBeInTheDocument();
});
