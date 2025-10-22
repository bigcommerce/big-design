import { theme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { StatusMessage, StatusMessageProps } from './index';

const baseProps: StatusMessageProps = {
  message: 'Basic status message',
};

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
  render(<StatusMessage {...baseProps} />);

  expect(screen.getByText('Basic status message')).toBeInTheDocument();
});

it('renders heading when provided', () => {
  render(<StatusMessage heading="Heading text" {...baseProps} />);

  expect(screen.getByText('Heading text')).toBeInTheDocument();
});

it('does not render heading if empty', () => {
  render(<StatusMessage {...baseProps} heading="" />);

  expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument();
});

test('renders status message illustration', () => {
  render(<StatusMessage {...baseProps} />);

  expect(screen.getByRole('figure', { hidden: true })).toBeInTheDocument();
});

test('renders with custom actions', () => {
  render(
    <StatusMessage actions={<div data-testid="customAction">Test Action</div>} {...baseProps} />,
  );

  const customAction = screen.getByTestId('customAction');

  expect(customAction).toBeInTheDocument();
  expect(customAction).toBeVisible();
});

test.each(variants)('renders with the %p variant', (variant) => {
  const { container } = render(<StatusMessage message="Basic status message" variant={variant} />);

  // eslint-disable-next-line testing-library/no-node-access
  const statusMessage = container.firstChild;
  const figure = screen.getByRole('figure', { hidden: true });

  expect(statusMessage).toMatchSnapshot();

  expect(figure).toHaveStyleRule('background-image', expect.stringContaining('data:image/svg+xml'));
});

describe('when at "page" size', () => {
  it('uses <H1> when size is "page"', () => {
    render(<StatusMessage {...baseProps} heading="Full Page" size="page" />);

    const heading = screen.getByRole('heading', { name: 'Full Page' });

    expect(heading.tagName).toBe('H1');
  });

  test('renders with the page size', () => {
    const { container } = render(<StatusMessage message="Basic status message" size="page" />);

    // eslint-disable-next-line testing-library/no-node-access
    const statusMessage = container.firstChild;

    expect(statusMessage).toHaveStyle({
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
});

describe('when at "panel" size', () => {
  it('uses <H4> when size is "panel"', () => {
    render(<StatusMessage {...baseProps} heading="Panel" size="panel" />);

    const heading = screen.getByRole('heading', { name: 'Panel' });

    expect(heading.tagName).toBe('H4');
  });

  test('renders with the panel size', () => {
    const { container } = render(<StatusMessage message="Basic status message" size="panel" />);

    // eslint-disable-next-line testing-library/no-node-access
    const statusMessage = container.firstChild;

    expect(statusMessage).toHaveStyle({
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
});
