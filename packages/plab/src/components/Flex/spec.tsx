import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

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
