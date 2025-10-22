import { fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { warning } from '../../utils';

import { Radio, RadioLabel } from './index';

test('render Radio (checked)', () => {
  render(<Radio checked={true} label="Checked" name="test-group" onChange={() => null} />);

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('render Radio (unchecked)', () => {
  render(<Radio checked={false} label="Unchecked" name="test-group" onChange={() => null} />);

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('render Radio (unchecked + description object)', () => {
  render(
    <Radio
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

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('render Radio (unchecked + description text)', () => {
  render(
    <Radio
      checked={false}
      description="description"
      label="Unchecked"
      name="test-group"
      onChange={() => null}
    />,
  );

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('render Radio (checked + disabled)', () => {
  render(<Radio checked={true} disabled label="Checked" name="test-group" onChange={() => null} />);

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('render Radio (unchecked + disabled)', () => {
  render(
    <Radio checked={false} disabled label="Unchecked" name="test-group" onChange={() => null} />,
  );

  expect(screen.getByRole('radio')).toMatchSnapshot();
});

test('has correct value when checked', async () => {
  render(<Radio checked={true} data-testid="radio" label="Checked" onChange={() => null} />);

  const radio = await screen.findByTestId<HTMLInputElement>('radio');

  expect(radio).toBeChecked();
});

test('has correct value when unchecked', async () => {
  render(<Radio checked={false} data-testid="radio" label="Unchecked" onChange={() => null} />);

  const radio = await screen.findByTestId<HTMLInputElement>('radio');

  expect(radio).not.toBeChecked();
});

test('triggers onChange when clicking the radio button', async () => {
  const onChange = jest.fn();

  render(<Radio checked={false} data-testid="radio" label="Checked" onChange={onChange} />);

  const radio = await screen.findByTestId<HTMLInputElement>('radio');

  fireEvent.click(radio);

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', () => {
  const onChange = jest.fn();

  const { container } = render(<Radio checked={false} label="Checked" onChange={onChange} />);

  // Click the styled radio (visual element)
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const styledRadio = container.querySelector('label[aria-hidden="true"]');

  if (styledRadio) {
    fireEvent.click(styledRadio);
  }

  // Click the text label
  const textLabel = screen.getByText('Checked');

  fireEvent.click(textLabel);

  expect(onChange).toHaveBeenCalledTimes(2);
});

test('accepts valid RadioLabel component', () => {
  const testId = 'test';
  const label = <RadioLabel data-testid={testId}>Label</RadioLabel>;

  render(<Radio label={label} />);

  expect(screen.getByTestId(testId)).toBeInTheDocument();
});

test('does not accept invalid label component', () => {
  const testId = 'test';
  const label = <div data-testid={testId}>Label</div>;

  render(<Radio label={label} />);

  expect(warning).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  render(<Radio data-testid="radio" label="Checked" ref={ref} />);

  expect(screen.getByTestId('radio')).toBe(ref.current);
});

test('does not forward styles', () => {
  render(<Radio className="test" label="Checked" />);

  expect(screen.queryByRole('radio', { name: /test/i })).not.toBeInTheDocument();
});
