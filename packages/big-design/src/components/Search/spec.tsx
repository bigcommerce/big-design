import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Search } from './Search';

test('renders the search component', () => {
  render(<Search onChange={jest.fn()} onSubmit={jest.fn()} value="Product" />);

  const input = screen.getByLabelText('Search');

  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  expect(input.value).toBe('Product');
});

test('call onChange when user change value in the input', () => {
  const onChange = jest.fn();

  render(<Search onChange={onChange} onSubmit={jest.fn()} value="" />);

  const input = screen.getByLabelText('Search');

  fireEvent.change(input, { target: { value: 'Product' } });

  expect(onChange).toHaveBeenCalled();
});

test('call onSubmit when user click to the Search button', () => {
  const onSubmit = jest.fn();

  render(<Search onChange={jest.fn()} onSubmit={onSubmit} value="submit" />);

  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(onSubmit).toHaveBeenCalled();
});

test('Search input has autocomplete=off', async () => {
  render(<Search onChange={jest.fn()} onSubmit={jest.fn()} value="" />);

  const input = await screen.findByPlaceholderText('Search');

  expect(input.getAttribute('autocomplete')).toBe('off');
});
