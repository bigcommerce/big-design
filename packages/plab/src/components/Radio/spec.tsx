import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Radio } from './Radio';

test('render Radio (checked)', () => {
  const { container } = render(<Radio label="Checked" name="test-group" checked={true} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Radio (unchecked)', () => {
  const { container } = render(<Radio label="Unchecked" name="test-group" checked={false} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has correct value when checked', () => {
  const { getByTestId } = render(<Radio label="Checked" checked={true} onChange={() => null} data-testid="radio" />);
  const radio = getByTestId('radio') as HTMLInputElement;

  expect(radio.checked).toBe(true);
});

test('has correct value when unchecked', () => {
  const { getByTestId } = render(<Radio label="Unchecked" checked={false} onChange={() => null} data-testid="radio" />);
  const radio = getByTestId('radio') as HTMLInputElement;

  expect(radio.checked).toBe(false);
});

test('triggers onChange when clicking the radio button', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Radio label="Checked" checked={false} onChange={onChange} data-testid="radio" />);
  const radio = getByTestId('radio') as HTMLInputElement;

  fireEvent.click(radio);

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', () => {
  const onChange = jest.fn();
  const { container } = render(<Radio label="Checked" checked={false} onChange={onChange} />);

  const labels = container.querySelectorAll('label');

  labels.forEach(label => fireEvent.click(label));

  expect(onChange.mock.calls.length).toBe(2);
});
