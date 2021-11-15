import { theme } from '@bigcommerce/big-design-theme';
import { screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

import { Box } from './index';

test('has margin props', () => {
  const { rerender } = render(<Box>test</Box>);

  expect(screen.getByText('test')).not.toHaveStyle('margin: 1rem');

  rerender(<Box margin="medium">test</Box>);

  expect(screen.getByText('test')).toHaveStyle('margin: 1rem');
});

test('has padding props', () => {
  const { rerender } = render(<Box>test</Box>);

  expect(screen.getByText('test')).not.toHaveStyle('padding: 1rem');

  rerender(<Box padding="medium">test</Box>);

  expect(screen.getByText('test')).toHaveStyle('padding: 1rem');
});

test('has backgroundColor props', () => {
  const { rerender } = render(<Box>test</Box>);

  expect(screen.getByText('test')).not.toHaveStyle('background-color: #fff');

  rerender(<Box backgroundColor="white">test</Box>);

  expect(screen.getByText('test')).toHaveStyle('background-color: #fff');
});

test('has borderRadius props', () => {
  const { rerender } = render(<Box>test</Box>);

  expect(screen.getByText('test')).not.toHaveStyle('border-radius: 50%');

  rerender(<Box borderRadius="circle">test</Box>);

  expect(screen.getByText('test')).toHaveStyle('border-radius: 50%');
});

test('has border props', () => {
  render(<Box border="box">test</Box>);

  expect(screen.getByText('test')).toMatchSnapshot();
});

test('has individual border props', () => {
  render(
    <Box borderBottom="box" borderRight="box">
      test
    </Box>,
  );

  expect(screen.getByText('test')).toMatchSnapshot();
});

test('has shadow props', () => {
  render(<Box shadow="floating">test</Box>);

  expect(screen.getByText('test')).toMatchSnapshot();
});

test('has clearfix prop', () => {
  render(<Box clearfix>test</Box>);

  expect(screen.getByText('test')).toMatchSnapshot();
});

test('has zIndex props', () => {
  const { rerender } = render(<Box zIndex="sticky">test</Box>);

  expect(screen.getByText('test')).toHaveStyle(`z-index: ${theme.zIndex.sticky}`);

  rerender(<Box zIndex="popover">test</Box>);

  expect(screen.getByText('test')).toHaveStyle(`z-index: ${theme.zIndex.popover}`);
});

test('renders as a different tag', () => {
  render(<Box as="section">test</Box>);

  expect(screen.getByText('test').tagName).toBe('SECTION');
});

test('box forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(<Box ref={ref}>test</Box>);

  expect(screen.getByText('test')).toBe(ref.current);
});
