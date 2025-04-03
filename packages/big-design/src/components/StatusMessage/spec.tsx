import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { Button } from '../Button';

import { StatusMessage } from './index';

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

// variants

// renders default variant
test('renders with the default variant', () => {
  render(<StatusMessage message="Basic status message" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%)`,
  });
});

test('renders with the 404 variant', () => {
  render(<StatusMessage message="Basic status message" variant="404" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%)`,
  });
});

test('renders with the info variant', () => {
  render(<StatusMessage message="Basic status message" variant="info" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%)`,
  });
});

test('renders with the search variant', () => {
  render(<StatusMessage message="Basic status message" variant="search" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #72d8db 0%, #d9f9fa 100%)`,
  });
});

test('renders with the error variant', () => {
  render(<StatusMessage message="Basic status message" variant="error" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #ebb2ca 0%, #eee8fa 100%)`,
  });
});

test('renders with the server-error variant', () => {
  render(<StatusMessage message="Basic status message" variant="server-error" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #ebb2ca 0%, #eee8fa 100%)`,
  });
});

test('renders with the success variant', () => {
  render(<StatusMessage message="Basic status message" variant="success" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #78e4a3 0%, #f3fdec 100%)`,
  });
});

test('renders with the unauthorized variant', () => {
  render(<StatusMessage message="Basic status message" variant="unauthorized" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #efc879 0%, #fefbf2 100%)`,
  });
});

test('renders with the warning variant', () => {
  render(<StatusMessage message="Basic status message" variant="warning" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, #efc879 0%, #fefbf2 100%)`,
  });
});

// test('renders with background pattern', () => {
//   render(<StatusMessage message="Basic status message" variant="info" />);

//   const figure = screen.getByRole('figure', { hidden: true });

//   const pattern = figure.querySelector('svg');

//   expect(pattern).toBeInTheDocument();
// });

// test('renders with background icon', () => {
//   render(<StatusMessage message="Basic status message" variant="info" />);

//   const figure = screen.getByRole('figure', { hidden: true });

//   const patternAndIcon = figure.querySelectorAll('svg');
//   const icon = patternAndIcon[1];

//   expect(patternAndIcon).toHaveLength(2);
//   expect(icon).toBeInTheDocument();
// });

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
