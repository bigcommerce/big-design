import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Search } from './Search';

test('renders the search component', () => {
  render(<Search value="Product" onChange={jest.fn()} onSubmit={jest.fn()} />);

  const input = screen.getByLabelText('Search') as HTMLInputElement;

  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  expect(input.value).toBe('Product');
});

test('call onChange when user change value in the input', () => {
  const onChange = jest.fn();

  render(<Search value="" onChange={onChange} onSubmit={jest.fn()} />);

  const input = screen.getByLabelText('Search') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'Product' } });

  expect(onChange).toHaveBeenCalled();
});

test('call onSubmit when user click to the Search button', () => {
  const onSubmit = jest.fn();

  render(<Search value="submit" onChange={jest.fn()} onSubmit={onSubmit} />);

  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  expect(onSubmit).toHaveBeenCalled();
});
