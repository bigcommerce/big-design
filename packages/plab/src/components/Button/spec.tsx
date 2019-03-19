import 'jest-styled-components';
import React from 'react';
import { cleanup, render } from 'react-testing-library';

import { Button } from './Button';

afterEach(cleanup);

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
