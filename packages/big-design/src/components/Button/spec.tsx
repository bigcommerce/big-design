import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { PlusIcon } from '../Icons';

import { Button } from './index';
import { StyleableButton } from './private';

test('render default button', () => {
  const { container } = render(<Button>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render disabled button', () => {
  const { container } = render(<Button disabled>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render destructive button', () => {
  const { container } = render(<Button actionType="destructive">Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render destructive disabled button', () => {
  const { container } = render(
    <Button actionType="destructive" disabled>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render secondary button', () => {
  const { container } = render(<Button variant="secondary">Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render secondary disabled button', () => {
  const { container } = render(
    <Button variant="secondary" disabled>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render secondary destructive button', () => {
  const { container } = render(
    <Button variant="secondary" actionType="destructive">
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render secondary destructive disabled button', () => {
  const { container } = render(
    <Button variant="secondary" actionType="destructive" disabled>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render subtle button', () => {
  const { container } = render(<Button variant="subtle">Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render subtle disabled button', () => {
  const { container } = render(
    <Button variant="subtle" disabled>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render subtle destructive button', () => {
  const { container } = render(
    <Button variant="subtle" actionType="destructive">
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render subtle destructive disabled button', () => {
  const { container } = render(
    <Button variant="subtle" actionType="destructive" disabled>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('render loading button', () => {
  const { container } = render(<Button isLoading={true}>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render icon only button', () => {
  const { container } = render(<Button iconOnly={<PlusIcon />}>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render icon left button', () => {
  const { container } = render(<Button iconLeft={<PlusIcon />}>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render icon right button', () => {
  const { container } = render(<Button iconRight={<PlusIcon />}>Button</Button>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render icon left and right button', () => {
  const { container } = render(
    <Button iconLeft={<PlusIcon />} iconRight={<PlusIcon />}>
      Button
    </Button>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();

  const { container } = render(<Button ref={ref} />);
  const button = container.querySelector('button');

  expect(button).toBe(ref.current);
});

test('triggers onClick', () => {
  const onClick = jest.fn();

  const { container } = render(<Button onClick={onClick} />);
  const button = container.firstChild as HTMLElement;

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalled();
});

test('does not forward styles', () => {
  const { container } = render(<Button className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('private StyleableButton forwards styles', () => {
  const { container } = render(<StyleableButton className="test" style={{ background: 'red' }} />);

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('render only icon only with left and right icons button', () => {
  const plusIcon = <PlusIcon data-testid="icon-only" />;
  const { getAllByTestId } = render(
    <Button iconLeft={plusIcon} iconOnly={plusIcon} iconRight={plusIcon}>
      Button
    </Button>,
  );

  expect(getAllByTestId('icon-only').length).toBe(1);
});
