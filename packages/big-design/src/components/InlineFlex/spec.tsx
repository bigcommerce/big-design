import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';

import { InlineFlex } from './index';

test('render inline flex', () => {
  const { container } = render(<InlineFlex>Flex</InlineFlex>);

  expect(container.firstChild).toMatchSnapshot();
});

test('has display flex', () => {
  const { container } = render(<InlineFlex>Flex</InlineFlex>);

  expect(container.firstChild).toHaveStyle('display: inline-flex');
});

test('forwards styles', () => {
  const { container } = render(
    <InlineFlex className="test" style={{ background: 'red' }}>
      Flex
    </InlineFlex>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('Flex Item forwards styles', () => {
  const { container } = render(
    <InlineFlex.Item className="test" style={{ background: 'red' }}>
      Flex
    </InlineFlex.Item>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});
