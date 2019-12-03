import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Checkbox } from './index';
import { StyleableCheckbox } from './private';

describe('render Checkbox', () => {
  test('checked', () => {
    const { container } = render(<Checkbox label="Checked" checked={true} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('unchecked', () => {
    const { container } = render(<Checkbox label="Unchecked" checked={false} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('indeterminate', () => {
    const { container } = render(<Checkbox label="Unchecked" isIndeterminate={true} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });
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

test('has correct value for indeterminate', () => {
  const { getByTestId } = render(
    <Checkbox label="Checked" isIndeterminate checked={false} onChange={() => null} data-testid="checkbox" />,
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

  expect(onChange).toHaveBeenCalledTimes(2);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLInputElement>();

  const { container } = render(<Checkbox ref={ref} label="Checked" data-testid="checkbox" />);
  const input = container.querySelector('input');

  expect(input).toBe(ref.current);
});

test('does not forward styles', () => {
  const { container } = render(<Checkbox label="Checked" className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('private StyleableCheckbox forwards styles', () => {
  const { container } = render(<StyleableCheckbox label="Checked" className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('displays text greyed out when disabled', () => {
  const { container } = render(<Checkbox disabled label="Checked" className="test" />);

  const labels = container.querySelectorAll('label');

  expect(labels[1]).toHaveStyle('color: #B4BAD1');
});
