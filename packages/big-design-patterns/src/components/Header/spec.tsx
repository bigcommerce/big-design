import { H1, Text } from '@bigcommerce/big-design';
import { AddIcon } from '@bigcommerce/big-design-icons';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { warning } from '../../utils';

import { Header } from './Header';

test('renders basic header', () => {
  render(<Header title="Page heading" />);

  expect(screen.getByRole('heading', { level: 1, name: 'Page heading' })).toBeInTheDocument();
});

test('renders with back link', () => {
  render(<Header backLink={{ text: 'Back', href: '/back' }} title="Page heading" />);

  const backLink = screen.getByRole('link', { name: 'Back' });

  expect(backLink).toBeInTheDocument();
  expect(backLink).toHaveAttribute('href', '/back');
});

test('renders with button actions', () => {
  render(
    <Header
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'secondary', onClick: jest.fn() },
      ]}
      title="Page heading"
    />,
  );

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
});

test('renders with dropdown action', async () => {
  const dropdownItemCallback = jest.fn();

  render(
    <Header
      actions={[
        {
          items: [{ content: 'Action 1', onItemClick: dropdownItemCallback }],
          toggle: { text: 'Open menu', variant: 'primary' },
        },
      ]}
      backLink={{ text: 'Back', href: '/back' }}
      title="Page heading"
    />,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  await userEvent.click(screen.getByRole('option', { name: 'Action 1' }));

  expect(dropdownItemCallback).toHaveBeenCalled();
});

test('renders with both button and dropdown actions', () => {
  render(
    <Header
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        {
          items: [{ content: 'Action 2', onItemClick: jest.fn() }],
          toggle: { text: 'Open menu', variant: 'secondary' },
        },
      ]}
      title="Page heading"
    />,
  );

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
});

test('renders header with badge', () => {
  render(<Header badge={{ label: 'Beta', variant: 'primary' }} title="Page heading" />);

  expect(screen.getByText('Beta')).toBeInTheDocument();
});

test('warns when more than 3 actions are provided', () => {
  render(
    <Header
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'secondary', onClick: jest.fn() },
        { text: 'Action 3', variant: 'secondary', onClick: jest.fn() },
        { text: 'Action 4', variant: 'secondary', onClick: jest.fn() },
      ]}
      title="Page heading"
    />,
  );

  expect(warning).toHaveBeenCalledWith('Header should not have more than 3 actions.');
});

test('warns when more than 1 primary action is provided', () => {
  render(
    <Header
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'primary', onClick: jest.fn() },
      ]}
      title="Page heading"
    />,
  );

  expect(warning).toHaveBeenCalledWith('Header should not have more than 1 primary action.');
});

test('renders with icon', () => {
  render(<Header icon={<AddIcon data-testid="header-icon" />} title="Page heading" />);

  expect(screen.getByTestId('header-icon')).toBeInTheDocument();
});

test('renders with description', () => {
  render(<Header description="Page description" title="Page heading" />);

  expect(screen.getByText('Page description')).toBeInTheDocument();
});

test('renders a custom Text component for the description', () => {
  render(
    <Header
      description={<Text data-testid="test-text">Page description</Text>}
      title="Page heading"
    />,
  );

  expect(screen.getByTestId('test-text')).toBeInTheDocument();
});

test('does not render a description if incorrect component type is used', () => {
  render(<Header description={<H1>Page description</H1>} title="Page heading" />);

  expect(screen.queryByRole('heading', { name: 'Page description' })).not.toBeInTheDocument();
});
