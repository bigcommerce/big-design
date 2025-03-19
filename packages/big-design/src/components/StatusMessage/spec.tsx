import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { StatusMessage } from './index';
import { StatusMessageIcons } from './StatusMessageIcons';
import { StatusMessagePatterns } from './StatusMessagePatterns';

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

// variants

// renders default variant
test('renders with the default variant', () => {
  render(<StatusMessage message="Basic status message" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.primaryGradientStart} 0%, ${theme.colors.primaryGradientEnd} 100%)`,
  });
});


test('renders with the 404 variant', () => {
  render(<StatusMessage message="Basic status message" variant="404" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.primaryGradientStart} 0%, ${theme.colors.primaryGradientEnd} 100%)`,
  });
});


test('renders with the info variant', () => {
  render(<StatusMessage message="Basic status message" variant="info" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.primaryGradientStart} 0%, ${theme.colors.primaryGradientEnd} 100%)`,
  });
});

test('renders with the search variant', () => {
  render(<StatusMessage message="Basic status message" variant="search" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.primaryGradientStart} 0%, ${theme.colors.primaryGradientEnd} 100%)`,
  });
});

test('renders with the error variant', () => {
  render(<StatusMessage message="Basic status message" variant="error" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.dangerGradientStart} 0%, ${theme.colors.dangerGradientEnd} 100%)`,
  });
});

test('renders with the server-error variant', () => {
  render(<StatusMessage message="Basic status message" variant="server-error" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.dangerGradientStart} 0%, ${theme.colors.dangerGradientEnd} 100%)`,
  });
});

test('renders with the success variant', () => {
  render(<StatusMessage message="Basic status message" variant="success" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.successGradientStart} 0%, ${theme.colors.successGradientEnd} 100%)`,
  });
});

test('renders with the unauthorized variant', () => {
  render(<StatusMessage message="Basic status message" variant="unauthorized" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.warningGradientStart} 0%, ${theme.colors.warningGradientEnd} 100%)`,
  });
});

test('renders with the warning variant', () => {
  render(<StatusMessage message="Basic status message" variant="warning" />);

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toMatchSnapshot();
  expect(figure).toHaveStyle({
    backgroundImage: `radial-gradient(circle at center top, ${theme.colors.warningGradientStart} 0%, ${theme.colors.warningGradientEnd} 100%)`,
  });
});

test('renders with background pattern', () => {
  render(<StatusMessage message="Basic status message" variant="info" />);

  const figure = screen.getByRole('figure', { hidden: true });

  const pattern = figure.querySelector('svg');
  expect(pattern).toBeInTheDocument();
});

test('renders with background icon', () => {
  render(<StatusMessage message="Basic status message" variant="info" />);

  const figure = screen.getByRole('figure', { hidden: true });

  const patternAndIcon = figure.querySelectorAll('svg');
  const icon = patternAndIcon[1];
  expect(patternAndIcon).toHaveLength(2);
  expect(icon).toBeInTheDocument();
});

test('renders status message icon', () => {
  render(<StatusMessageIcons />);

  const icon = screen.getByRole('img', { hidden: true });

  expect(icon).toBeInTheDocument();
});

test('renders status message pattern', () => {
  render(<StatusMessagePatterns />);

  const icon = screen.getByRole('img', { hidden: true });

  expect(icon).toBeInTheDocument();
});

// renders the panel size
test('renders with the panel size', () => {
  const { container } = render(<StatusMessage message="Basic status message" size="panel" />);

  expect(container.firstChild).toHaveStyle({
    gap: theme.spacing.medium,
    paddingBlock: theme.spacing.large,
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
    paddingBlock: theme.spacing.xxxLarge,
  });

  const figure = screen.getByRole('figure', { hidden: true });

  expect(figure).toHaveStyle({
    transform: 'scale(1.5)',
    transformOrigin: 'bottom',
    marginBlockStart: theme.helpers.remCalc(60),
  });
}
);