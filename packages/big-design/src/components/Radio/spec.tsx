import React, { createRef } from 'react';
import 'jest-styled-components';

import { fireEvent, render } from '@test/utils';

import { warning } from '../../utils';

import { Radio, RadioLabel } from './index';

test('render Radio (checked)', () => {
  const { container } = render(<Radio label="Checked" name="test-group" checked={true} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Radio (unchecked)', () => {
  const { container } = render(<Radio label="Unchecked" name="test-group" checked={false} onChange={() => null} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Radio (unchecked + description object)', () => {
  const { container } = render(
    <Radio
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

test('render Radio (unchecked + description text)', () => {
  const { container } = render(
    <Radio label="Unchecked" description="description" name="test-group" checked={false} onChange={() => null} />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render Radio (checked + disabled)', () => {
  const { container } = render(
    <Radio label="Checked" name="test-group" checked={true} onChange={() => null} disabled />,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render Radio (unchecked + disabled)', () => {
  const { container } = render(
    <Radio label="Unchecked" name="test-group" checked={false} onChange={() => null} disabled />,
  );

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

  labels.forEach((label) => fireEvent.click(label));

  expect(onChange).toHaveBeenCalledTimes(2);
});

test('accepts valid RadioLabel component', () => {
  const testId = 'test';
  const label = <RadioLabel data-testid={testId}>Label</RadioLabel>;

  const { queryByTestId } = render(<Radio label={label} />);

  expect(queryByTestId(testId)).toBeInTheDocument();
});

test('does not accept invalid label component', () => {
  const testId = 'test';
  const label = <div data-testid={testId}>Label</div>;

  const { queryByTestId } = render(<Radio label={label} />);

  expect(warning).toBeCalledTimes(1);
  expect(queryByTestId(testId)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  const { container } = render(<Radio ref={ref} label="Checked" />);
  const input = container.querySelector('input');

  expect(input).toBe(ref.current);
});

test('does not forward styles', () => {
  const { container } = render(<Radio label="Checked" className="test" />);

  expect(container.getElementsByClassName('test').length).toBe(0);
});
