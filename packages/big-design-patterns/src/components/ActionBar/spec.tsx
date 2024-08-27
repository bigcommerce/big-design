import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { warning } from '../../utils';

import { ActionBar } from './ActionBar';

test('renders basic action bar', () => {
  render(
    <ActionBar
      actions={[
        {
          text: 'Main action',
          variant: 'primary',
        },
      ]}
    />,
  );

  expect(screen.getByRole('group')).toBeInTheDocument();
});

test('renders with button actions', () => {
  render(
    <ActionBar
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'secondary', onClick: jest.fn() },
      ]}
    />,
  );

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
});

test('renders with dropdown action', async () => {
  const dropdownItemCallback = jest.fn();

  render(
    <ActionBar
      actions={[
        {
          items: [{ content: 'Action 1', onItemClick: dropdownItemCallback }],
          toggle: { text: 'Open menu', variant: 'primary' },
        },
      ]}
    />,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  await userEvent.click(screen.getByRole('option', { name: 'Action 1' }));

  expect(dropdownItemCallback).toHaveBeenCalled();
});

test('renders with both button and dropdown actions', () => {
  render(
    <ActionBar
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        {
          items: [{ content: 'Action 2', onItemClick: jest.fn() }],
          toggle: { text: 'Open menu', variant: 'secondary' },
        },
      ]}
    />,
  );

  expect(screen.getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
});

test('does not render when no actions are provided', () => {
  render(<ActionBar actions={[]} />);

  expect(screen.queryByRole('group')).not.toBeInTheDocument();
});

test('warns when more than 3 actions are provided', () => {
  render(
    <ActionBar
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'secondary', onClick: jest.fn() },
        { text: 'Action 3', variant: 'secondary', onClick: jest.fn() },
        { text: 'Action 4', variant: 'secondary', onClick: jest.fn() },
      ]}
    />,
  );

  expect(warning).toHaveBeenCalledWith('Action bar should not have more than 3 actions.');
});

test('warns when more than 1 primary action is provided', () => {
  render(
    <ActionBar
      actions={[
        { text: 'Action 1', variant: 'primary', onClick: jest.fn() },
        { text: 'Action 2', variant: 'primary', onClick: jest.fn() },
      ]}
    />,
  );

  expect(warning).toHaveBeenCalledWith('Action bar should not have more than 1 primary action.');
});
