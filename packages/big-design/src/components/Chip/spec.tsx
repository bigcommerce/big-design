import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render } from '@test/utils';
import 'jest-styled-components';

import { Chip } from './index';

test('renders the label', () => {
  const label = 'Test';

  render(<Chip label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('renders without close button', () => {
  render(<Chip label="Test" />);

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.getByText(/test/i).parentElement).toMatchSnapshot();
});

test('renders with close button if onRemove is present', () => {
  render(<Chip label="Test" onDelete={jest.fn()} />);

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByText(/test/i).parentElement).toMatchSnapshot();
});

test('onDelete is called when close button is clicked', () => {
  const onDelete = jest.fn();

  render(<Chip label="Test" onDelete={onDelete} />);

  userEvent.click(screen.getByRole('button'));

  expect(onDelete).toHaveBeenCalled();
});

test('accepts custom margin props', () => {
  render(<Chip label="Test" margin="large" onDelete={jest.fn()} />);

  const chipParent = screen.getByText(/test/i).parentElement;

  expect(chipParent).toHaveStyle('margin: 1.25rem');
});
