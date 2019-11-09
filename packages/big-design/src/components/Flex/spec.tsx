import { render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Flex } from './index';

test('render flex', () => {
  const { container } = render(<Flex>Flex</Flex>);

  expect(container.firstChild).toMatchSnapshot();
});

test('has display flex', () => {
  const { container } = render(<Flex>Flex</Flex>);

  expect(container.firstChild).toHaveStyle('display: flex');
});

test('forwards styles', () => {
  const { container } = render(
    <Flex className="test" style={{ background: 'red' }}>
      Flex
    </Flex>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('Flex Item forwards styles', () => {
  const { container } = render(
    <Flex.Item className="test" style={{ background: 'red' }}>
      Flex
    </Flex.Item>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('rendering as another element retains inherited props and styles', () => {
  const { getByTestId } = render(<Flex as="section" margin="medium" data-testid="flex" />);

  const grid = getByTestId('flex');

  expect(grid.tagName).toBe('SECTION');
  expect(grid).toHaveStyle(`margin: 1rem`);
});
