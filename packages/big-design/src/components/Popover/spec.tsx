import { theme } from '@bigcommerce/big-design-theme';
import React, { useState } from 'react';

import { fireEvent, render, screen, waitForElement } from '@test/utils';

import { Popover } from './Popover';

import { PopoverProps } from '.';

const TestComponent: React.FC<Partial<PopoverProps>> = ({ isOpen = false, ...rest }) => {
  const [open, setOpen] = useState(isOpen);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <button ref={setButtonRef} onClick={() => setOpen((s) => !s)}>
        Test Button
      </button>
      <Popover anchorElement={buttonRef} isOpen={open} label="Test Label" {...rest} onClose={() => setOpen(false)}>
        Some Content
      </Popover>
    </>
  );
};

test('it should not render popover content when not open', () => {
  render(<TestComponent isOpen={false} />);

  expect(screen.queryByText(/some content/i)).not.toBeInTheDocument();
});

test('it renders the popover content when open', async () => {
  render(<TestComponent isOpen={true} />);

  await waitForElement(() => screen.getByText(/some content/i));
});

test('toggles between open and closed', async () => {
  render(<TestComponent isOpen={false} />);

  expect(screen.queryByText(/some content/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));

  await waitForElement(() => screen.getByText(/some content/i));
});

test('accepts Box props', async () => {
  render(<TestComponent isOpen={true} padding="medium" />);

  const getPopover = () => screen.getByText(/some content/i);

  await waitForElement(getPopover);

  expect(getPopover()).toHaveStyle(`padding: ${theme.spacing.medium}`);
});

test('does not accept margin props', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  render(<TestComponent isOpen={true} padding="medium" margin="medium" />);

  const getPopover = () => screen.getByText(/some content/i);

  await waitForElement(getPopover);

  expect(getPopover()).toHaveStyle(`padding: ${theme.spacing.medium}`);
  expect(getPopover()).not.toHaveStyle(`margin: ${theme.spacing.medium}`);
});

test('sets basic aria attributes', async () => {
  render(<TestComponent isOpen={true} />);

  const getPopover = () => screen.getByText(/some content/i);

  await waitForElement(getPopover);

  const popover = getPopover();
  const popoverId = popover.id;
  const anchorButton = screen.getByRole('button');

  expect(anchorButton).toHaveAttribute('aria-controls', popoverId);
  expect(anchorButton).toHaveAttribute('aria-expanded', 'true');
  expect(anchorButton).toHaveAttribute('aria-haspopup', 'dialog');
  expect(popover).toHaveAttribute('aria-label', 'Test Label');
});

test('close on Escape by default', async () => {
  render(<TestComponent isOpen={true} />);

  const getPopover = () => screen.queryByText(/some content/i);

  await waitForElement(getPopover);

  fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });

  expect(getPopover()).not.toBeInTheDocument();
});

test('does not close on Escape when closeOnEscKey is false', async () => {
  render(<TestComponent isOpen={true} closeOnEscKey={false} />);

  const getPopover = () => screen.queryByText(/some content/i);

  await waitForElement(getPopover);

  fireEvent.keyDown(screen.getByText(/some content/i), { key: 'Escape' });

  expect(getPopover()).toBeInTheDocument();
});

test('close on click outisde by default', async () => {
  render(
    <>
      <p>Outside Content</p>
      <TestComponent isOpen={true} />
    </>,
  );

  const getPopover = () => screen.queryByText(/some content/i);

  await waitForElement(getPopover);

  fireEvent.click(screen.getByText(/outside/i));

  expect(getPopover()).not.toBeInTheDocument();
});

test('does not close when clicking inside the popover', async () => {
  render(
    <>
      <p>Outside Content</p>
      <TestComponent isOpen={true} />
    </>,
  );

  const getPopover = () => screen.queryByText(/some content/i);

  await waitForElement(getPopover);

  fireEvent.click(screen.getByText(/some content/i));

  expect(getPopover()).toBeInTheDocument();
});

test('does not close on click outisde when closeOnClickOutside is set to false', async () => {
  render(
    <>
      <p>Outside Content</p>
      <TestComponent isOpen={true} closeOnClickOutside={false} />
    </>,
  );

  const getPopover = () => screen.queryByText(/some content/i);

  await waitForElement(getPopover);

  fireEvent.click(screen.getByText(/outside/i));

  expect(getPopover()).toBeInTheDocument();
});
