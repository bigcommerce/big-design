import React from 'react';

import 'jest-styled-components';
import { render } from '@test/utils';

import { Link } from './Link';

test('render link', () => {
  const { container } = render(<Link href="#">Link</Link>);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders with external icon', () => {
  const { container } = render(
    <Link href="#" external target="_blank">
      Link
    </Link>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('forwards styles', () => {
  const { container } = render(
    <Link href="#" className="test" style={{ background: 'red' }}>
      Link
    </Link>,
  );

  expect(container.firstChild).toHaveClass('test');
  expect(container.firstChild).toHaveStyle('background: red');
});

test('render Link with ellipsis', () => {
  const { getByTestId } = render(
    <Link data-testid="link" ellipsis={true}>
      Test with ellipsis
    </Link>,
  );
  const link = getByTestId('link');

  expect(link).toHaveStyle(`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `);
});
