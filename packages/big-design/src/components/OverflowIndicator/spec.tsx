import React from 'react';
import { render } from '@testing-library/react';
import { OverflowIndicator } from './OverflowIndicator';

test('renders without overflowing', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2']} maxLength={25} />);
  expect(container).toMatchSnapshot();
});

test('renders with overflowing items', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2', 'item3', 'item4']} maxLength={10} />);
  expect(container).toMatchSnapshot();
});

test('renders with custom delimiter', () => {
  const { container } = render(<OverflowIndicator items={['item1', 'item2', 'item3']} maxLength={15} delimiter=" | " />);
  expect(container).toMatchSnapshot();
});

test('renders with no items', () => {
  const { container } = render(<OverflowIndicator items={[]} maxLength={25} />);
  expect(container).toMatchSnapshot();
});

test('renders with single long item', () => {
  const { container } = render(<OverflowIndicator items={['averylongitemthatexceedsthemaxlength']} maxLength={10} />);
  expect(container).toMatchSnapshot();
});
