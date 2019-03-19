import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Checkbox } from './Checkbox';

test('render Checkbox (checked)', () => {
  const { container } = render(<Checkbox label="Checked" checked={true} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Checkbox (unchecked)', () => {
  const { container } = render(<Checkbox label="Unchecked" checked={false} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has correct value for checked', () => {
  const { getByTestId } = render(
    <Checkbox label="Checked" checked={true} onChange={() => null} data-testid="checkbox" />,
  );
  const input = getByTestId('checkbox') as HTMLInputElement;

  expect(input.checked).toBe(true);
});

test('has correct value for unchecked', () => {
  const { getByTestId } = render(
    <Checkbox label="Checked" checked={false} onChange={() => null} data-testid="checkbox" />,
  );
  const input = getByTestId('checkbox') as HTMLInputElement;

  expect(input.checked).toBe(false);
});

test('triggers onChange when clicking the checkbox', () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <Checkbox label="Checked" checked={true} onChange={onChange} data-testid="checkbox" />,
  );
  const checkbox = getByTestId('checkbox') as HTMLInputElement;

  fireEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', () => {
  const onChange = jest.fn();
  const { container } = render(<Checkbox label="Checked" checked={true} onChange={onChange} data-testid="checkbox" />);

  const labels = container.querySelectorAll('label');

  labels.forEach(label => fireEvent.click(label));

  expect(onChange.mock.calls.length).toBe(2);
});
