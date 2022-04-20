import { AddIcon } from '@bigcommerce/big-design-icons';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ButtonGroup } from './ButtonGroup';

const originalPrototype = Object.getOwnPropertyDescriptors(window.HTMLElement.prototype);

beforeAll(() => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
        if (this.dataset.testid === 'buttongroup-dropdown') {
          return 50;
        }

        if (this.dataset.testid === 'buttongroup-item') {
          return 100;
        }

        if (this.dataset.testid === 'buttongroup-wrapper') {
          return 400;
        }

        return 0;
      },
    },
  });
});

afterAll(() => Object.defineProperties(window.HTMLElement.prototype, originalPrototype));

test('renders given actions', async () => {
  render(<ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }]} />);

  // Prevents an act warning on component mount
  await act(() => Promise.resolve());

  expect(screen.getByRole('button', { name: /button 1/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /button 2/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /button 3/i })).toBeVisible();
});

test('renders dropdown if items do not fit', async () => {
  render(
    <ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }, { text: 'button 4' }]} />,
  );

  expect(screen.getByText('button 4')).not.toBeVisible();

  await userEvent.click(screen.getByTitle('more'));

  expect(await screen.findByRole('option', { name: /button 4/i })).toBeVisible();
});

test('renders dropdown if some of items have destructive type', async () => {
  render(
    <ButtonGroup
      actions={[{ actionType: 'destructive', text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }]}
    />,
  );

  expect(screen.getByText('button 1')).not.toBeVisible();

  await userEvent.click(screen.getByTitle('more'));

  expect(await screen.findByRole('option', { name: /button 1/i })).toBeVisible();
});

test('renders icon only with dropdown item', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3', icon: <AddIcon title="button 3 icon" /> },
        { text: 'button 4', icon: <AddIcon title="button 4 icon" /> },
      ]}
    />,
  );

  expect(screen.queryByTitle('button 3 icon')).toBeNull();

  await userEvent.click(screen.getByTitle('more'));

  expect(await screen.findByTitle('button 4 icon')).toBeInTheDocument();
});

test('dropdown item on click callback receives synthetic event', async () => {
  const mockOnClick = jest.fn();

  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
        { text: 'button 4', onClick: mockOnClick },
      ]}
    />,
  );

  // Accroding to https://www.w3.org/TR/accname-1.1/#step2A the
  // accessibility name is an empty string if the element is hidden
  const button = await screen.findByRole('button', {
    name: (_, element) => {
      return Boolean(element.textContent?.match(/button 4/i));
    },
    hidden: true,
  });

  await userEvent.click(screen.getByTitle('more'));
  await userEvent.click(await screen.findByRole('option', { name: /button 4/i }));

  expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
});
