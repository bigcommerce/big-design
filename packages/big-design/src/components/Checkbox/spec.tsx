import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { warning } from '../../utils';

import { CheckboxLabel } from './Label';

import { Checkbox } from './index';

describe('render Checkbox', () => {
  test('checked', () => {
    render(<Checkbox checked={true} label="Checked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('unchecked', () => {
    render(<Checkbox checked={false} label="Unchecked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('with description object', () => {
    render(
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

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('with badge props', () => {
    render(
      <Checkbox
        badge={{
          label: 'Badge',
          variant: 'secondary',
        }}
        description="description text"
        label="Unchecked"
        name="test-group"
        onChange={() => null}
      />,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('with description string', () => {
    render(
      <Checkbox
        checked={false}
        description="description text"
        label="Unchecked"
        name="test-group"
        onChange={() => null}
      />,
    );

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('indeterminate', () => {
    render(<Checkbox isIndeterminate={true} label="Unchecked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('disabled checked', () => {
    render(<Checkbox checked={true} disabled label="Checked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    render(<Checkbox checked={false} disabled label="Checked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });

  test('disabled indeterminate', () => {
    render(<Checkbox disabled isIndeterminate={true} label="Unchecked" onChange={() => null} />);

    expect(screen.getByRole('checkbox')).toMatchSnapshot();
  });
});

test('has correct value for checked', async () => {
  render(<Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={() => null} />);

  const input = await screen.findByTestId<HTMLInputElement>('checkbox');

  expect(input).toBeChecked();
});

test('has correct value for unchecked', async () => {
  render(<Checkbox checked={false} data-testid="checkbox" label="Checked" onChange={() => null} />);

  const input = await screen.findByTestId<HTMLInputElement>('checkbox');

  expect(input).not.toBeChecked();
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

  expect(input).not.toBeChecked();
});

test('triggers onChange when clicking the checkbox', async () => {
  const onChange = jest.fn();

  render(<Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={onChange} />);

  const checkbox = await screen.findByTestId<HTMLInputElement>('checkbox');

  await userEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', async () => {
  const onChange = jest.fn();

  render(<Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={onChange} />);

  const labels = screen.getAllByText('Checked');

  await userEvent.click(labels[0]);

  expect(onChange).toHaveBeenCalled();
});

test('accepts valid CheckboxLabel component', () => {
  const testId = 'test';
  const label = <CheckboxLabel data-testid={testId}>Label</CheckboxLabel>;

  render(<Checkbox label={label} />);

  expect(screen.getByTestId(testId)).toBeInTheDocument();
});

test('does not accept invalid label component', () => {
  const testId = 'test';
  const label = <div data-testid={testId}>Label</div>;

  render(<Checkbox label={label} />);

  expect(warning).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  render(<Checkbox data-testid="checkbox" label="Checked" ref={ref} />);

  const input = screen.getByTestId('checkbox');

  expect(input).toBe(ref.current);
});

test('does not forward styles', () => {
  render(<Checkbox className="test" label="Checked" style={{ background: 'red' }} />);

  expect(screen.queryByRole('checkbox', { name: /test/i })).not.toBeInTheDocument();
  expect(screen.getByRole('checkbox')).not.toHaveStyle('background: red');
});
