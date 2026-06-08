import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

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

  test('with badge props', () => {
    const { container } = render(
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

    expect(container.firstChild).toBeInTheDocument();
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
  const { container } = render(
    <Checkbox checked={true} data-testid="checkbox" label="Checked" onChange={onChange} />,
  );

  const [labelWithText, labelWithoutText] = Array.from(container.querySelectorAll('label'));

  await userEvent.click(labelWithText);
  await userEvent.click(labelWithoutText);

  expect(onChange).toHaveBeenCalledTimes(2);
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

describe('img', () => {
  test('renders an image with the provided alt and src', () => {
    render(<Checkbox img={{ alt: 'Logo', src: '/logo.svg' }} label="With image" />);

    const image = screen.getByAltText('Logo');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/logo.svg');
  });

  test('defaults alt to an empty string', () => {
    const { container } = render(<Checkbox img={{ src: '/logo.svg' }} label="With image" />);

    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});

describe('collapseOptions', () => {
  const renderWithCollapse = (props: Partial<React.ComponentProps<typeof Checkbox>> = {}) =>
    render(
      <Checkbox
        checked={false}
        collapseOptions={{
          collapse: {},
          panel: { children: <span>Panel content</span> },
          trigger: { title: 'Show details' },
        }}
        label="With collapse"
        onChange={() => null}
        {...props}
      />,
    );

  test('renders the collapse trigger', () => {
    renderWithCollapse();

    expect(screen.getByRole('button', { name: /Show details/ })).toBeInTheDocument();
  });

  test('toggles the panel when clicking the trigger', async () => {
    renderWithCollapse();

    const trigger = screen.getByRole('button', { name: /Show details/ });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Panel content')).not.toBeVisible();

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Panel content')).toBeVisible();
  });

  test('disables the trigger when disableWhenUnchecked is set and the checkbox is unchecked', () => {
    renderWithCollapse({ checked: false, disableWhenUnchecked: true });

    expect(screen.getByRole('button', { name: /Show details/ })).toBeDisabled();
  });

  test('enables the trigger when disableWhenUnchecked is set and the checkbox is checked', () => {
    renderWithCollapse({ checked: true, disableWhenUnchecked: true });

    expect(screen.getByRole('button', { name: /Show details/ })).toBeEnabled();
  });
});
