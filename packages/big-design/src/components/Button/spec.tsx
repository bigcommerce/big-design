import { AddIcon } from '@bigcommerce/big-design-icons';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { StyleableButton } from './private';

import { Button } from './index';

test('render default button', () => {
  render(<Button>Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render disabled button', () => {
  render(<Button disabled>Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render destructive button', () => {
  render(<Button actionType="destructive">Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render destructive disabled button', () => {
  render(
    <Button actionType="destructive" disabled>
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render secondary button', () => {
  render(<Button variant="secondary">Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render secondary disabled button', () => {
  render(
    <Button disabled variant="secondary">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render secondary destructive button', () => {
  render(
    <Button actionType="destructive" variant="secondary">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render secondary destructive disabled button', () => {
  render(
    <Button actionType="destructive" disabled variant="secondary">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render subtle button', () => {
  render(<Button variant="subtle">Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render subtle disabled button', () => {
  render(
    <Button disabled variant="subtle">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render subtle destructive button', () => {
  render(
    <Button actionType="destructive" variant="subtle">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render subtle destructive disabled button', () => {
  render(
    <Button actionType="destructive" disabled variant="subtle">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render utility button', () => {
  render(<Button variant="utility">Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render utility disabled button', () => {
  render(
    <Button disabled variant="utility">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render utility destructive button', () => {
  render(
    <Button actionType="destructive" variant="utility">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render utility destructive disabled button', () => {
  render(
    <Button actionType="destructive" disabled variant="utility">
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render icon only button', () => {
  render(<Button iconOnly={<AddIcon />}>Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render icon left button', () => {
  render(<Button iconLeft={<AddIcon />}>Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render icon right button', () => {
  render(<Button iconRight={<AddIcon />}>Button</Button>);

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('render icon left and right button', () => {
  render(
    <Button iconLeft={<AddIcon />} iconRight={<AddIcon />}>
      Button
    </Button>,
  );

  expect(screen.getByRole('button')).toMatchSnapshot();
});

test('forwards ref', () => {
  const ref = createRef<HTMLButtonElement>();

  render(<Button ref={ref} />);

  expect(screen.getByRole('button')).toBe(ref.current);
});

test('triggers onClick', async () => {
  const onClick = jest.fn();

  render(<Button onClick={onClick} />);

  await userEvent.click(screen.getByRole<HTMLButtonElement>('button'));

  expect(onClick).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(<Button className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('private StyleableButton forwards styles', () => {
  const { container } = render(<StyleableButton className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test')).toHaveLength(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('render only icon only with left and right icons button', () => {
  const plusIcon = <AddIcon data-testid="icon-only" />;

  render(
    <Button iconLeft={plusIcon} iconOnly={plusIcon} iconRight={plusIcon}>
      Button
    </Button>,
  );

  expect(screen.getAllByTestId('icon-only')).toHaveLength(1);
});

describe('isLoading', () => {
  test('render loading button', () => {
    render(<Button isLoading={true}>Button</Button>);

    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  test('prevents on click', async () => {
    const mockClickHandler = jest.fn();

    render(
      <Button isLoading={true} onClick={mockClickHandler}>
        Button
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'), { pointerEventsCheck: 0 });

    expect(mockClickHandler).not.toHaveBeenCalled();
  });

  test('disables the button', () => {
    render(<Button isLoading={true}>Button</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('hides content', () => {
    const plusIcon = <AddIcon aria-hidden="false" role="icon" />;
    const { rerender } = render(
      <Button iconLeft={plusIcon} isLoading={false}>
        Foo
      </Button>,
    );
    const visibleContent = screen.getByRole('icon');

    expect(visibleContent).toBeInTheDocument();

    rerender(<Button isLoading={true}>Foo</Button>);

    const hiddenContent = screen.queryByRole('icon');

    expect(hiddenContent).not.toBeInTheDocument();
  });
});
