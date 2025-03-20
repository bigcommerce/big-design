import { theme } from '@bigcommerce/big-design-theme';
import { render } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Lozenge } from './index';

test('has margin props', () => {
  const { container, rerender } = render(<Lozenge label="Lozenge" />);

  expect(container.firstChild).not.toHaveStyle('margin: 1rem');

  rerender(<Lozenge label="Lozenge" margin="medium" />);

  expect(container.firstChild).toHaveStyle('margin: 1rem');
});

test('render default Lozenge', () => {
  const { container } = render(<Lozenge label="Lozenge" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
});

test('render alpha Lozenge', () => {
  const { container } = render(<Lozenge label="Alpha" variant="alpha" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning20}`);
});

test('render beta Lozenge', () => {
  const { container } = render(<Lozenge label="Beta" variant="beta" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary20}`);
});

test('render deprecated Lozenge', () => {
  const { container } = render(<Lozenge label="Deprecated" variant="deprecated" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger20}`);
});

test('render legacy Lozenge', () => {
  const { container } = render(<Lozenge label="Legacy" variant="legacy" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary30}`);
});

test('render new Lozenge', () => {
  const { container } = render(<Lozenge label="New" variant="new" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
});

test("doesn't render if label prop is invalid", () => {
  // @ts-expect-error ignoring since label={Component} is not a valid prop
  const { container } = render(<Lozenge label={<p>Label</p>} />);

  expect(container.firstChild).toBeNull();
});

// add a test to check if the tooltipIcon prop is working
test('render Lozenge with tooltipIcon', () => {
  const { container } = render(<Lozenge label="Lozenge" tooltipIcon={true} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(
    `padding-inline: ${theme.spacing.small} ${theme.spacing.xxSmall}`,
  );
});
