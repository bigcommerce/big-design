import { AddIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Badge } from './index';

test('has margin props', () => {
  const { container, rerender } = render(<Badge />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Badge margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default Badge', () => {
  const { container } = render(<Badge>Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render success Badge', () => {
  const { container } = render(<Badge variant="success">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render danger Badge', () => {
  const { container } = render(<Badge variant="danger">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render warning Badge', () => {
  const { container } = render(<Badge variant="warning">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
});

test('render secondary Badge', () => {
  const { container } = render(<Badge variant="secondary">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
});
