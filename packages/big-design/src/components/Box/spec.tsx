import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { Box } from './index';

test('has margin props', () => {
  const { container, rerender } = render(<Box />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Box margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('has padding props', () => {
  const { container, rerender } = render(<Box />);

  expect(container.firstChild).not.toHaveStyle('padding: 1rem');

  rerender(<Box padding="medium" />);

  expect(container.firstChild).toHaveStyle('padding: 1rem');
});

test('has backgroundColor props', () => {
  const { container, rerender } = render(<Box />);

  expect(container.firstChild).not.toHaveStyle('background-color: #fff');

  rerender(<Box backgroundColor="white" />);

  expect(container.firstChild).toHaveStyle('background-color: #fff');
});

test('has borderRadius props', () => {
  const { container, rerender } = render(<Box />);

  expect(container.firstChild).not.toHaveStyle('border-radius: 50%');

  rerender(<Box borderRadius="circle" />);

  expect(container.firstChild).toHaveStyle('border-radius: 50%');
});

test('has border props', () => {
  const { container } = render(<Box border="box" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has individual border props', () => {
  const { container } = render(<Box borderBottom="box" borderRight="box" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has elevation props', () => {
  const { container } = render(<Box elevation="floating" />);

  expect(container.firstChild).toMatchSnapshot();
});
