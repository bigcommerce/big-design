import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Button } from '../Button';

import { StatusMessage } from './index';

const variants = [
  'info',
  'error',
  'success',
  'warning',
  'unauthorized',
  'search',
  'server-error',
  '404',
] as const;

test('renders basic status message', () => {
  render(<StatusMessage message="Basic status message" />);

  expect(screen.getByText('Basic status message')).toBeInTheDocument();
});

test('renders status message illustration', () => {
  render(<StatusMessage message="Basic status message" />);

  expect(screen.getByRole('figure', { hidden: true })).toBeInTheDocument();
});

test('renders panel status message', () => {
  render(<StatusMessage heading="Panel heading" message="Basic status message" />);

  expect(screen.getByRole('heading', { level: 4, name: 'Panel heading' })).toBeInTheDocument();
});

test('renders page status message', () => {
  render(<StatusMessage heading="Page heading" message="Basic status message" size="page" />);

  expect(screen.getByRole('heading', { level: 1, name: 'Page heading' })).toBeInTheDocument();
});

test('renders with button actions', () => {
  render(<StatusMessage actions={<Button>Action 1</Button>} message="Basic status message" />);

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
});

test.each(variants)('renders with the %p variant', (variant) => {
  const { container } = render(<StatusMessage message="Basic status message" variant={variant} />);

  expect(container.firstChild).toMatchSnapshot();
});

// renders the panel size
test('renders with the panel size', () => {
  const { container } = render(<StatusMessage message="Basic status message" size="panel" />);

  expect(container.firstChild).toHaveStyle({
    gap: theme.spacing.medium,
    paddingTop: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  });

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).not.toHaveStyle({
    transform: 'scale(1.5)',
    transformOrigin: 'bottom',
    marginBlockStart: theme.helpers.remCalc(60),
  });
});

test('renders with the page size', () => {
  const { container } = render(<StatusMessage message="Basic status message" size="page" />);

  expect(container.firstChild).toHaveStyle({
    gap: theme.spacing.xLarge,
    paddingTop: theme.spacing.xxxLarge,
    paddingBottom: theme.spacing.xxxLarge,
  });

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    transform: 'scale(1.5)',
    transformOrigin: 'bottom',
    marginBlockStart: theme.helpers.remCalc(60),
  });
});
