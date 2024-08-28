import { render, screen } from '@testing-library/react';
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
