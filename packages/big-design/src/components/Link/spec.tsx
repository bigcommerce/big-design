import { render, screen } from '@testing-library/react';
import React from 'react';

import 'jest-styled-components';

import { Link } from './Link';

test('render link', () => {
  render(<Link href="#">Link</Link>);

  expect(screen.getByRole('link')).toMatchSnapshot();
});

test('renders with external icon', () => {
  render(
    <Link external href="#" target="_blank">
      Link
    </Link>,
  );

  expect(screen.getByRole('link')).toMatchSnapshot();
});

test('forwards styles', () => {
  render(
    <Link className="test" href="#" style={{ background: 'red' }}>
      Link
    </Link>,
  );

  expect(screen.getByRole('link')).toHaveClass('test');
  expect(screen.getByRole('link')).toHaveStyle('background: red');
});

test('render Link with ellipsis', () => {
  render(
    <Link data-testid="link" ellipsis={true}>
      Test with ellipsis
    </Link>,
  );

  const link = screen.getByTestId('link');

  expect(link).toHaveStyle(`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `);
});
