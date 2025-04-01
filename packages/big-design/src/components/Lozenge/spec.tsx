import { theme } from '@bigcommerce/big-design-theme';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { Lozenge } from './index';

test('render default Lozenge', () => {
  const { container } = render(<Lozenge label="Lozenge" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
});

test('render alpha Lozenge', () => {
  const { container } = render(<Lozenge label="Alpha" variant="alpha" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.warning20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
});

test('render beta Lozenge', () => {
  const { container } = render(<Lozenge label="Beta" variant="beta" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.primary20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.primary50}`);
});

test('render deprecated Lozenge', () => {
  const { container } = render(<Lozenge label="Deprecated" variant="deprecated" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.danger20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.danger70}`);
});

test('render legacy Lozenge', () => {
  const { container } = render(<Lozenge label="Legacy" variant="legacy" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.secondary30}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.secondary70}`);
});

test('render new Lozenge', () => {
  const { container } = render(<Lozenge label="New" variant="new" />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.firstChild).toHaveStyle(`background-color: ${theme.colors.success20}`);
  expect(container.firstChild).toHaveStyle(`color: ${theme.colors.success70}`);
});

test('render Lozenge with tooltip', async () => {
  render(<Lozenge label="Lozenge" tooltipContent="Tooltip content" />);

  const lozenge = screen.getByText('Lozenge');

  userEvent.hover(lozenge);

  const tooltip = await screen.findByText('Tooltip content');

  expect(tooltip).toBeVisible();

  userEvent.unhover(lozenge);

  await waitFor(() => expect(tooltip).not.toBeVisible());
});
