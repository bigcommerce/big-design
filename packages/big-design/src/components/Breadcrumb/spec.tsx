import React from 'react';

import 'jest-styled-components';
import { render } from '@test/utils';

import { Breadcrumb } from './Breadcrumb';

test('render Breadcrumb', () => {
  const { container } = render(<Breadcrumb href="#">Breadcrumb</Breadcrumb>);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders with external icon', () => {
  const { container } = render(
    <Breadcrumb external href="#" target="_blank">
      Breadcrumb
    </Breadcrumb>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('forwards styles', () => {
  const { container } = render(
    <Breadcrumb className="test" href="#" style={{ background: 'red' }}>
      Breadcrumb
    </Breadcrumb>,
  );

  expect(container.firstChild).toHaveClass('test');
  expect(container.firstChild).toHaveStyle('background: red');
});
