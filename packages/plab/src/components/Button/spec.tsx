import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from './Button';

test('render default button', () => {
  const tree = renderer.create(<Button>Button</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('render disabled button', () => {
  const tree = renderer.create(<Button disabled>Button</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('render destructive button', () => {
  const tree = renderer.create(<Button actionType="destructive">Button</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('render destructive disabled button', () => {
  const tree = renderer
    .create(
      <Button actionType="destructive" disabled>
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render secondary button', () => {
  const tree = renderer.create(<Button variant="secondary">Button</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('render secondary disabled button', () => {
  const tree = renderer
    .create(
      <Button variant="secondary" disabled>
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render secondary destructive button', () => {
  const tree = renderer
    .create(
      <Button variant="secondary" actionType="destructive">
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render secondary destructive disabled button', () => {
  const tree = renderer
    .create(
      <Button variant="secondary" actionType="destructive" disabled>
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render subtle button', () => {
  const tree = renderer.create(<Button variant="subtle">Button</Button>).toJSON();

  expect(tree).toMatchSnapshot();
});

test('render subtle disabled button', () => {
  const tree = renderer
    .create(
      <Button variant="subtle" disabled>
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render subtle destructive button', () => {
  const tree = renderer
    .create(
      <Button variant="subtle" actionType="destructive">
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('render subtle destructive disabled button', () => {
  const tree = renderer
    .create(
      <Button variant="subtle" actionType="destructive" disabled>
        Button
      </Button>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
