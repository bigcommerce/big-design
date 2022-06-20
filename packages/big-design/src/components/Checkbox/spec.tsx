import React, { createRef } from 'react';
import 'jest-styled-components';

import { fireEvent, render, screen } from '@test/utils';

import { warning } from '../../utils';

import { CheckboxLabel } from './Label';

import { Checkbox } from './index';

describe('render Checkbox', () => {
  test('checked', () => {
    const { container } = render(<Checkbox checked={true} label="Checked" onChange={() => null} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('unchecked', () => {
    const { container } = render(
      <Checkbox checked={false} label="Unchecked" onChange={() => null} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with description object', () => {
    const { container } = render(
      <Checkbox
        checked={false}
        description={{
          text: 'description',
          link: {
            text: 'learn more',
            target: 'foo',
            href: 'bar',
          },
        }}
        label="Unchecked"
        name="test-group"
        onChange={() => null}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with description string', () => {
    const { container } = render(
      <Checkbox
        checked={false}
        description="description text"
        label="Unchecked"
        name="test-group"
        onChange={() => null}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('indeterminate', () => {
    const { container } = render(
      <Checkbox isIndeterminate={true} label="Unchecked" onChange={() => null} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled checked', () => {
    const { container } = render(
      <Checkbox checked={true} disabled label="Checked" onChange={() => null} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    const { container } = render(
      <Checkbox checked={false} disabled label="Checked" onChange={() => null} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled indeterminate', () => {
    const { container } = render(
      <Checkbox disabled isIndeterminate={true} label="Unchecked" onChange={() => null} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

test('has correct value for checked', async () => {
  render(<Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={() => null} />);

  const input = await screen.findByTestId<HTMLInputElement>('checkbox');

  expect(input.checked).toBe(true);
});

test('has correct value for unchecked', async () => {
  render(<Checkbox checked={false} data-testid="checkbox" label="Checked" onChange={() => null} />);

  const input = await screen.findByTestId<HTMLInputElement>('checkbox');

  expect(input.checked).toBe(false);
});

test('has correct value for indeterminate', async () => {
  render(
    <Checkbox
      checked={false}
      data-testid="checkbox"
      isIndeterminate
      label="Checked"
      onChange={() => null}
    />,
  );

  const input = await screen.findByTestId<HTMLInputElement>('checkbox');

  expect(input.checked).toBe(false);
});

test('triggers onChange when clicking the checkbox', async () => {
  const onChange = jest.fn();

  render(<Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={onChange} />);

  const checkbox = await screen.findByTestId<HTMLInputElement>('checkbox');

  fireEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', () => {
  const onChange = jest.fn();
  const { container } = render(
    <Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={onChange} />,
  );

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

  expect(warning).toHaveBeenCalledTimes(1);
  expect(queryByTestId(testId)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  const { container } = render(<Checkbox data-testid="checkbox" label="Checked" ref={ref} />);
  const input = container.querySelector('input');

  expect(input).toBe(ref.current);
});

test('does not forward styles', () => {
  const { container } = render(
    <Checkbox className="test" label="Checked" style={{ background: 'red' }} />,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});
