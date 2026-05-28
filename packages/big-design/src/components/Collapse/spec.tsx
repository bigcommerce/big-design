import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import 'jest-styled-components';

import { Text } from '../Typography';

import { Collapse } from './Collapse';

const handleChange = jest.fn();

beforeEach(() => {
  handleChange.mockClear();
});

const CollapseWithStaticTitleMock = (
  <Collapse onCollapseChange={handleChange}>
    <Collapse.Trigger title="title" />
    <Collapse.Panel>
      <Text>Content</Text>
    </Collapse.Panel>
  </Collapse>
);

const CollapseWithVisiblePanelMock = (
  <Collapse defaultOpen>
    <Collapse.Trigger title="show more" />
    <Collapse.Panel>
      <Text>Content</Text>
    </Collapse.Panel>
  </Collapse>
);

test('renders with title button', () => {
  render(CollapseWithStaticTitleMock);

  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('renders with provided title', () => {
  render(CollapseWithStaticTitleMock);

  expect(screen.getAllByText('title')).toHaveLength(2);
});

test('renders with panel', () => {
  render(CollapseWithVisiblePanelMock);

  expect(screen.getByRole('region')).toBeInTheDocument();
});

test('title button has id', () => {
  render(CollapseWithStaticTitleMock);

  expect(screen.getByRole('button').id).toBeDefined();
});

test('title button has aria-controls', () => {
  render(CollapseWithStaticTitleMock);

  const button = screen.getByRole('button');
  const panelId = screen.getByRole('region', { hidden: true }).id;

  expect(button).toHaveAttribute('aria-controls', panelId);
});

test('title button has icon', () => {
  render(CollapseWithStaticTitleMock);

  const icon = screen.getByRole('button').querySelector('svg');

  expect(icon).toBeInTheDocument();
});

test('title button icon in initially collapsed state', () => {
  render(CollapseWithStaticTitleMock);

  const icon = screen.getByRole('button').querySelector('svg');

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon in initially expanded state', () => {
  render(CollapseWithVisiblePanelMock);

  const icon = screen.getByRole('button').querySelector('svg');

  expect(icon).toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon toggles on title click', async () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole('button');
  const icon = trigger.querySelector('svg');

  await userEvent.click(trigger);

  expect(icon).toHaveStyle('transform: rotate(-180deg)');

  await userEvent.click(trigger);

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('panel has id', () => {
  render(CollapseWithStaticTitleMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel.id).toBeDefined();
  expect(panel.id).not.toBe('');
});

test('panel has aria-labelledby attribute', () => {
  render(CollapseWithStaticTitleMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel).toHaveAttribute('aria-labelledby');
});

test('panel has role attribute', () => {
  render(CollapseWithStaticTitleMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel).toBeInTheDocument();
});

test('panel is hidden', () => {
  render(CollapseWithStaticTitleMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel).not.toBeVisible();
});

test('panel is visible', () => {
  render(CollapseWithVisiblePanelMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel).toBeVisible();
});

test('hidden panel becomes visible on title click', async () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  await userEvent.click(trigger);

  expect(panel).toBeVisible();
});

test('visible panel becomes hidden on title click', async () => {
  render(CollapseWithVisiblePanelMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  await userEvent.click(trigger);

  expect(panel).not.toBeVisible();
});

test('click on title toggles aria-expanded attribute on title button', async () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');

  await userEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await userEvent.click(trigger);

  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('onCollapseChange is called', async () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');

  await userEvent.click(trigger);

  expect(handleChange).toHaveBeenCalledWith(true);
});

test('renders with ReactNode title', () => {
  render(
    <Collapse>
      <Collapse.Trigger title={<span data-testid="custom-title">Custom Title</span>} />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getAllByTestId('custom-title').length).toBeGreaterThan(0);
});

test('title button is disabled when disabled prop is true', () => {
  render(
    <Collapse disabled>
      <Collapse.Trigger title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getByRole('button')).toBeDisabled();
});

test('panel stays hidden when disabled and defaultOpen', () => {
  render(
    <Collapse defaultOpen disabled>
      <Collapse.Trigger title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getByRole('region', { hidden: true })).not.toBeVisible();
});

test('click on disabled title does not toggle panel', async () => {
  const onChange = jest.fn();

  render(
    <Collapse disabled onCollapseChange={onChange}>
      <Collapse.Trigger title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  await userEvent.click(trigger, { pointerEventsCheck: 0 });

  expect(panel).not.toBeVisible();
  expect(onChange).not.toHaveBeenCalled();
});

test('open panel closes when disabled becomes true', () => {
  const onChange = jest.fn();

  const { rerender } = render(
    <Collapse defaultOpen onCollapseChange={onChange}>
      <Collapse.Trigger title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getByRole('region')).toBeVisible();

  rerender(
    <Collapse defaultOpen disabled onCollapseChange={onChange}>
      <Collapse.Trigger title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getByRole('region', { hidden: true })).not.toBeVisible();
  expect(onChange).toHaveBeenCalledWith(false);
});

test('panel applies backgroundColor and padding', () => {
  render(
    <Collapse defaultOpen>
      <Collapse.Trigger title="title" />
      <Collapse.Panel backgroundColor="secondary20" padding="medium">
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  const panel = screen.getByRole('region');

  expect(panel).toHaveStyle('padding: 1rem');
});

test('Trigger applies custom marginVertical', () => {
  render(
    <Collapse>
      <Collapse.Trigger marginVertical="large" title="title" />
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>
    </Collapse>,
  );

  expect(screen.getByRole('button')).toHaveStyle('margin-top: 1.25rem');
});

test('controlled mode: isCollapseOpen drives the open state', async () => {
  const ControlledExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapse isCollapseOpen={isOpen} onCollapseChange={setIsOpen}>
        <Collapse.Trigger title="title" />
        <Collapse.Panel>
          <Text>Content</Text>
        </Collapse.Panel>
      </Collapse>
    );
  };

  render(<ControlledExample />);

  const trigger = screen.getByRole<HTMLButtonElement>('button');

  expect(screen.getByRole('region', { hidden: true })).not.toBeVisible();

  await userEvent.click(trigger);

  expect(screen.getByRole('region')).toBeVisible();
});

test('Trigger and Panel can be placed in separate parts of the subtree', async () => {
  render(
    <Collapse>
      <header>
        <Collapse.Trigger title="title" />
      </header>
      <section>
        <Collapse.Panel>
          <Text>Content</Text>
        </Collapse.Panel>
      </section>
    </Collapse>,
  );

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  expect(panel).not.toBeVisible();

  await userEvent.click(trigger);

  expect(panel).toBeVisible();
});

test('Collapse.Trigger throws when used outside Collapse', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  expect(() => render(<Collapse.Trigger title="title" />)).toThrow(
    /Collapse\.Trigger must be used inside a <Collapse> component\./,
  );

  errorSpy.mockRestore();
});

test('Collapse.Panel throws when used outside Collapse', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  expect(() =>
    render(
      <Collapse.Panel>
        <Text>Content</Text>
      </Collapse.Panel>,
    ),
  ).toThrow(/Collapse\.Panel must be used inside a <Collapse> component\./);

  errorSpy.mockRestore();
});
