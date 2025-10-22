import { render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import 'jest-styled-components';

import { Flex, FlexItem } from './index';

test('render flex', () => {
  render(<Flex data-testid="flex">Flex</Flex>);

  const flex = screen.getByTestId('flex');

  expect(flex).toMatchSnapshot();
});

test('has display flex', () => {
  render(<Flex data-testid="flex">Flex</Flex>);

  const flex = screen.getByTestId('flex');

  expect(flex).toHaveStyle('display: flex');
});

test('has gap properties', () => {
  const { rerender } = render(
    <Flex data-testid="flex" flexGap="3rem">
      Flex
    </Flex>,
  );
  const flex = screen.getByTestId('flex');

  expect(flex).toHaveStyle('gap: 3rem');

  rerender(
    <Flex data-testid="flex" flexColumnGap="1rem" flexRowGap="2rem">
      Flex
    </Flex>,
  );

  expect(flex).toHaveStyle({ 'row-gap': '2rem', 'column-gap': '1rem' });
});

test('forwards styles', () => {
  render(
    <Flex className="test" data-testid="flex" style={{ background: 'red' }}>
      Flex
    </Flex>,
  );

  const flex = screen.getByTestId('flex');

  expect(flex).toHaveClass('test');
  expect(flex).toHaveStyle('background: red');
});

test('Flex Item forwards styles', () => {
  render(
    <FlexItem className="test" data-testid="flex-item" style={{ background: 'red' }}>
      Flex
    </FlexItem>,
  );

  const flexItem = screen.getByTestId('flex-item');

  expect(flexItem).toHaveClass('test');
  expect(flexItem).toHaveStyle('background: red');
});

test('rendering as another element retains inherited props and styles', () => {
  render(<Flex as="section" data-testid="flex" margin="medium" />);

  const flex = screen.getByTestId('flex');

  expect(flex.tagName).toBe('SECTION');
  expect(flex).toHaveStyle(`margin: 1rem`);
});

test('Flex Item should handle falsy values (0)', () => {
  render(<FlexItem data-testid="flex" flexShrink={0} />);

  const flex = screen.getByTestId('flex');

  expect(flex).toHaveStyle('flex-shrink: 0');
});

test('Flex forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <Flex data-testid="flex" ref={ref}>
      Hello
    </Flex>,
  );

  const div = screen.getByTestId('flex');

  expect(div).toBe(ref.current);
});

test('FlexItem forwards ref', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <FlexItem data-testid="flex-item" ref={ref}>
      Hello
    </FlexItem>,
  );

  const div = screen.getByTestId('flex-item');

  expect(div).toBe(ref.current);
});
