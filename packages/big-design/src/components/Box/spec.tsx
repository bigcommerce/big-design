import { theme } from '@bigcommerce/big-design-theme';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

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

test('has shadow props', () => {
  const { container } = render(<Box shadow="floating" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has clearfix prop', () => {
  const { container } = render(<Box clearfix />);

  expect(container.firstChild).toMatchSnapshot();
});

test('has zIndex props', () => {
  const { container, rerender } = render(<Box zIndex="sticky" />);

  expect(container.firstChild).toHaveStyle(`z-index: ${theme.zIndex.sticky}`);

  rerender(<Box zIndex="popover" />);

  expect(container.firstChild).toHaveStyle(`z-index: ${theme.zIndex.popover}`);
});

test('renders as a different tag', () => {
  const { getByTestId } = render(<Box data-testid="box" as="section" />);
  const tag = getByTestId('box').tagName;

  expect(tag).toBe('SECTION');
});

test('box forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  const { container } = render(<Box ref={ref}>Hello</Box>);
  const div = container.querySelector('div');

  expect(div).toBe(ref.current);
});
