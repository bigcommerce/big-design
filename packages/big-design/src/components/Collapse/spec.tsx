import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

import { render } from '@test/utils';

import { Text } from '../Typography';

import { Collapse } from './Collapse';

const handleChange = jest.fn();

const CollapseWithStaticTitleMock = (
  <Collapse title="title" onCollapseChange={handleChange}>
    <Text>Content</Text>
  </Collapse>
);
const CollapseWithVisiblePanelMock = (
  <Collapse title="show more" initiallyOpen>
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

  expect(button.getAttribute('aria-controls')).toBe(panelId);
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

test('title button icon toggles on title click', () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole('button');
  const icon = trigger.querySelector('svg');

  userEvent.click(trigger);

  expect(icon).toHaveStyle('transform: rotate(-180deg)');

  userEvent.click(trigger);

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('panel has id', () => {
  render(CollapseWithStaticTitleMock);

  const panelId = screen.getByRole('region', { hidden: true }).id;

  expect(panelId).toBeDefined();
});

test('panel has aria-labelledby attribute', () => {
  render(CollapseWithStaticTitleMock);

  const panel = screen.getByRole('region', { hidden: true });

  expect(panel.getAttribute('aria-labelledby')).toBeDefined();
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

test('hidden panel becomes visible on title click', () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  userEvent.click(trigger);

  expect(panel).toBeVisible();
});

test('visible panel becomes hidden on title click', () => {
  render(CollapseWithVisiblePanelMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');
  const panel = screen.getByRole('region', { hidden: true });

  userEvent.click(trigger);

  expect(panel).not.toBeVisible();
});

test('click on title toggles aria-expanded attribute on title button', () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');

  userEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');

  userEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('false');
});

test('onCollapseChange is called', () => {
  render(CollapseWithStaticTitleMock);

  const trigger = screen.getByRole<HTMLButtonElement>('button');

  userEvent.click(trigger);

  expect(handleChange).toHaveBeenCalled();
});
