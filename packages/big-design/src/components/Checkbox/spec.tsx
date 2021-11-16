import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

import { warning } from '../../utils';

import { CheckboxLabel } from './Label';

import { Checkbox } from './index';

describe('render Checkbox', () => {
  test('checked', () => {
    render(<Checkbox label="Checked" checked={true} onChange={() => null} />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('unchecked', () => {
    render(<Checkbox label="Unchecked" checked={false} onChange={() => null} />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('with description object', () => {
    render(
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

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('with description string', () => {
    render(
      <Checkbox
        label="Unchecked"
        description="description text"
        name="test-group"
        checked={false}
        onChange={() => null}
      />,
    );

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('indeterminate', () => {
    render(<Checkbox label="Unchecked" isIndeterminate={true} onChange={() => null} />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('disabled checked', () => {
    render(<Checkbox label="Checked" checked={true} onChange={() => null} disabled />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('disabled unchecked', () => {
    render(<Checkbox label="Checked" checked={false} onChange={() => null} disabled />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });

  test('disabled indeterminate', () => {
    render(<Checkbox label="Unchecked" isIndeterminate={true} onChange={() => null} disabled />);

    expect(screen.getByRole('checkbox').parentElement).toMatchSnapshot();
  });
});

test('has correct value for checked', () => {
  render(<Checkbox label="Checked" checked={true} onChange={() => null} />);

  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('has correct value for unchecked', () => {
  render(<Checkbox label="Checked" checked={false} onChange={() => null} />);

  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

test('has correct value for indeterminate', () => {
  render(<Checkbox label="Checked" isIndeterminate checked={false} onChange={() => null} />);

  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

test('triggers onChange when clicking the checkbox', () => {
  const onChange = jest.fn();

  render(<Checkbox label="Checked" checked={true} onChange={onChange} />);

  userEvent.click(screen.getByRole('checkbox'));

  expect(onChange).toHaveBeenCalled();
});

test('triggers onChange when clicking styled and text label', () => {
  const onChange = jest.fn();

  render(<Checkbox label="Checked" checked={true} onChange={onChange} />);

  const labels = screen.getByRole<HTMLInputElement>('checkbox').parentElement!.querySelectorAll('label');

  labels.forEach((label) => userEvent.click(label));

  expect(onChange).toHaveBeenCalledTimes(2);
});

test('accepts valid CheckboxLabel component', () => {
  const label = <CheckboxLabel>Label</CheckboxLabel>;

  render(<Checkbox label={label} />);

  expect(screen.getByText(/label/i)).toBeInTheDocument();
});

test('does not accept invalid label component', () => {
  const label = <div>Label</div>;

  render(<Checkbox label={label} />);

  expect(warning).toBeCalledTimes(1);
  expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
});

test('forwards ref', () => {
  const ref = createRef<HTMLInputElement>();

  render(<Checkbox ref={ref} label="Checked" />);

  expect(screen.getByRole('checkbox')).toBe(ref.current);
});

test('does not forward styles', () => {
  const { container } = render(<Checkbox label="Checked" className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(screen.getByRole('checkbox').parentElement).not.toHaveStyle('background: red');
});
