import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
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
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test('render success Badge', () => {
  const { container } = render(<Badge variant="success">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success50}`);
});

test('render danger Badge', () => {
  const { container } = render(<Badge variant="danger">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger40}`);
});

test('render warning Badge', () => {
  const { container } = render(<Badge variant="warning">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning40}`);
});

test('render secondary Badge', () => {
  const { container } = render(<Badge variant="secondary">Badge</Badge>);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary60}`);
});

test('theme prop overrides default theme', () => {
  const customTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      secondary60: 'red',
    },
  };
  const { container } = render(
    <Badge variant="secondary" theme={customTheme}>
      Badge
    </Badge>,
  );

  expect(container.firstChild).toHaveStyle(`background-color: red`);
});
