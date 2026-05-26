import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { Text } from '../Typography';

import { Collapse } from './Collapse';

const handleChange = jest.fn();

const CollapseWithStaticTitleMock = (
  <Collapse onCollapseChange={handleChange} title="title">
    <Text>Content</Text>
  </Collapse>
);
const CollapseWithVisiblePanelMock = (
  <Collapse initiallyOpen title="show more">
    <Text>Content</Text>
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

  expect(handleChange).toHaveBeenCalled();
});

test('renders with ReactNode title', () => {
  render(
    <Collapse title={<span data-testid="custom-title">Custom Title</span>}>
      <Text>Content</Text>
    </Collapse>,
  );

  expect(screen.getAllByTestId('custom-title').length).toBeGreaterThan(0);
});

test('title button is disabled when disabled prop is true', () => {
  render(
    <Collapse disabled title="title">
      <Text>Content</Text>
    </Collapse>,
  );

  expect(screen.getByRole('button')).toBeDisabled();
});

test('panel stays hidden when disabled and initiallyOpen', () => {
  render(
    <Collapse disabled initiallyOpen title="title">
      <Text>Content</Text>
    </Collapse>,
  );

  expect(screen.getByRole('region', { hidden: true })).not.toBeVisible();
});

test('open panel closes when disabled becomes true', async () => {
  const onChange = jest.fn();

  const { rerender } = render(
    <Collapse initiallyOpen onCollapseChange={onChange} title="title">
      <Text>Content</Text>
    </Collapse>,
  );

  const panel = screen.getByRole('region');

  expect(panel).toBeVisible();

  rerender(
    <Collapse disabled initiallyOpen onCollapseChange={onChange} title="title">
      <Text>Content</Text>
    </Collapse>,
  );

  expect(screen.getByRole('region', { hidden: true })).not.toBeVisible();
  expect(onChange).toHaveBeenCalledWith(false);
});

test('panel renders inside portalTarget when provided', () => {
  const portalTarget = document.createElement('div');

  portalTarget.setAttribute('data-testid', 'portal-target');
  document.body.appendChild(portalTarget);

  render(
    <Collapse initiallyOpen portalTarget={portalTarget} title="title">
      <Text>Portal Content</Text>
    </Collapse>,
  );

  const panel = screen.getByRole('region');

  expect(portalTarget).toContainElement(panel);
  expect(panel).toHaveTextContent('Portal Content');

  document.body.removeChild(portalTarget);
});

test('applies panelProps to the panel', () => {
  render(
    <Collapse
      initiallyOpen
      panelProps={{ backgroundColor: 'secondary20', padding: 'medium' }}
      title="title"
    >
      <Text>Content</Text>
    </Collapse>,
  );

  const panel = screen.getByRole('region');

  expect(panel).toHaveStyle('padding: 1rem');
});
