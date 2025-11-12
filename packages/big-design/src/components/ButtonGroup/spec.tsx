import { AddIcon } from '@bigcommerce/big-design-icons';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { ButtonGroup } from './ButtonGroup';

const originalPrototype = Object.getOwnPropertyDescriptors(window.HTMLElement.prototype);

beforeAll(() => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
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
  render(
    <ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }]} />,
  );

  // Prevents an act warning on component mount
  await act(() => Promise.resolve());

  expect(screen.getByRole('button', { name: /button 1/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /button 2/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /button 3/i })).toBeVisible();
});

test('renders dropdown if items do not fit', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
        { text: 'button 4' },
      ]}
    />,
  );

  expect(screen.getByText('button 4')).not.toBeVisible();

  await userEvent.click(screen.getByRole('button', { name: 'more' }));

  expect(await screen.findByRole('option', { name: /button 4/i })).toBeVisible();
});

test('renders dropdown if some of items have destructive type', async () => {
  render(
    <ButtonGroup
      actions={[
        { actionType: 'destructive', text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
      ]}
    />,
  );

  expect(screen.getByText('button 1')).not.toBeVisible();

  await userEvent.click(screen.getByRole('button', { name: 'more' }));

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

  expect(screen.queryByTitle('button 3 icon')).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'more' }));

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
      return Boolean(/button 4/i.exec(element.textContent ?? ''));
    },
    hidden: true,
  });

  await userEvent.click(screen.getByRole('button', { name: 'more' }));
  await userEvent.click(await screen.findByRole('option', { name: /button 4/i }));

  expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({ target: button }));
});

test('dropdown trigger is type button', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
        { text: 'button 4' },
      ]}
    />,
  );

  const trigger = await screen.findByRole('button', { name: 'more' });

  expect(trigger).toHaveAttribute('type', 'button');
});

test('renders localized labels', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
        { text: 'button 4' },
      ]}
      localization={{ more: 'mas' }}
    />,
  );

  const trigger = await screen.findByRole('button', { name: 'mas' });

  expect(trigger).toBeVisible();
});

test('hide overflowed buttons and show a "more" dropdown', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'A' },
        { text: 'B' },
        { text: 'C' },
        { text: 'D' },
        { text: 'E' },
        { text: 'F' },
      ]}
    />,
  );

  expect(await screen.findByRole('button', { name: /A/ })).toBeVisible();
  expect(screen.getByRole('button', { name: /B/ })).toBeVisible();
  expect(screen.getByRole('button', { name: /C/ })).toBeVisible();
  expect(screen.getByRole('button', { name: /more/ })).toBeVisible();

  expect(screen.queryByRole('button', { name: /D/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /E/ })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /F/ })).not.toBeInTheDocument();
});

test('handles window resize event', async () => {
  render(
    <ButtonGroup
      actions={[
        { text: 'button 1' },
        { text: 'button 2' },
        { text: 'button 3' },
        { text: 'button 4' },
      ]}
    />,
  );

  // Prevents an act warning on component mount
  await act(() => Promise.resolve());

  // Trigger window resize event
  await act(async () => {
    window.dispatchEvent(new Event('resize'));
    await Promise.resolve();
  });

  expect(screen.getByRole('button', { name: /button 1/i })).toBeVisible();
});

test('handles action with no offsetWidth', async () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    window.HTMLElement.prototype,
    'offsetWidth',
  );

  // Mock offsetWidth to return 0 for some items
  Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      if (this.dataset.testid === 'buttongroup-dropdown') {
        return 50;
      }

      if (this.dataset.testid === 'buttongroup-wrapper') {
        return 400;
      }

      // Return undefined for first button item to test the !actionWidth branch
      if (this.dataset.testid === 'buttongroup-item') {
        const text = this.textContent;

        if (text === 'button 1') {
          return 0;
        }

        return 100;
      }

      return 0;
    },
  });

  render(<ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }]} />);

  // Prevents an act warning on component mount
  await act(() => Promise.resolve());

  // Verify buttons are rendered despite offsetWidth being 0
  expect(screen.getByRole('button', { name: /button 1/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /button 2/i })).toBeInTheDocument();

  // Restore original descriptor
  if (originalDescriptor) {
    Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', originalDescriptor);
  }
});

test('renders null when actions array is empty', () => {
  const { container } = render(<ButtonGroup actions={[]} />);

  expect(container.querySelector('[data-testid="buttongroup-wrapper"]')).not.toBeInTheDocument();
});
