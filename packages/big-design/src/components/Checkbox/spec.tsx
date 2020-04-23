import React, { createRef } from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { warning } from '../../utils';

import { CheckboxLabel } from './Label';

import { Checkbox } from './index';

describe('render Checkbox', () => {
  test('checked', () => {
    const { container } = render(<Checkbox label="Checked" checked={true} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('unchecked', () => {
    const { container } = render(<Checkbox label="Unchecked" checked={false} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with description object', () => {
    const { container } = render(
      <Checkbox
        label="Unchecked"
        description={{
          text: 'description',
          link: {
            text: 'learn more',
            target: 'foo',
            href: 'bar',
          },
        }}
        name="test-group"
        checked={false}
        onChange={() => null}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with description string', () => {
    const { container } = render(
      <Checkbox
        label="Unchecked"
        description="description text"
        name="test-group"
        checked={false}
        onChange={() => null}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('indeterminate', () => {
    const { container } = render(<Checkbox label="Unchecked" isIndeterminate={true} onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled checked', () => {
    const { container } = render(<Checkbox label="Checked" checked={true} onChange={() => null} disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    const { container } = render(<Checkbox label="Checked" checked={false} onChange={() => null} disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled indeterminate', () => {
    const { container } = render(<Checkbox label="Unchecked" isIndeterminate={true} onChange={() => null} disabled />);

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

  labels.forEach((label) => fireEvent.click(label));

  expect(onChange).toHaveBeenCalledTimes(2);
});

test('accepts valid CheckboxLabel component', () => {
  const testId = 'test';
  const label = <CheckboxLabel data-testid={testId}>Label</CheckboxLabel>;

  const { queryByTestId } = render(<Checkbox label={label} />);

  expect(queryByTestId(testId)).toBeInTheDocument();
});

test('does not accept invalid label component', () => {
  const testId = 'test';
  const label = <div data-testid={testId}>Label</div>;

  const { queryByTestId } = render(<Checkbox label={label} />);

  expect(warning).toBeCalledTimes(1);
  expect(queryByTestId(testId)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  const { container } = render(<Checkbox ref={ref} label="Checked" data-testid="checkbox" />);
  const input = container.querySelector('input');

  expect(input).toBe(ref.current);
});

test('does not forward styles', () => {
  const { container } = render(<Checkbox label="Checked" className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});
