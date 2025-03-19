import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { StatusMessage } from './index';

test('renders basic status message', () => {
  render(<StatusMessage message='Basic status message' />);

  expect(screen.getByText('Basic status message')).toBeInTheDocument();
});

// a test that checks for an aria-hidden figure element
test('renders status message illustration', () => {
  render(<StatusMessage message='Basic status message' />);

  expect(screen.getByRole('figure', { hidden: true })).toBeInTheDocument();
});

test('renders panel status message', () => {
  render(<StatusMessage message='Basic status message' heading="Panel heading" />);

  expect(screen.getByRole('heading', { level: 4, name: 'Panel heading' })).toBeInTheDocument();
});

test('renders page status message', () => {
  render(<StatusMessage message='Basic status message' size='page' heading='Page heading' />);

  expect(screen.getByRole('heading', { level: 1, name: 'Page heading' })).toBeInTheDocument();
});

test('renders with button actions', () => {
  render(
    <StatusMessage
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'secondary', onClick: jest.fn() },
      ]}
      message="Basic status message"
    />,
  );

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
});

// a test that confirms a specific variant as been rendered
test('renders with the correct variant', () => {
  render(<StatusMessage message='Basic status message' variant='warning' />);

  expect(screen.getByRole('figure', { hidden: true })).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.warningGradient.start} 0%, ${theme.colors.warningGradient.end} 100%)`,
  });
});
