import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

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
  const { getByRole } = render(CollapseWithStaticTitleMock);

  expect(getByRole('button')).toBeInTheDocument();
});

test('renders with provided title', () => {
  const { queryAllByText } = render(CollapseWithStaticTitleMock);

  expect(queryAllByText('title').length).toBe(2);
});

test('renders with panel', () => {
  const { getByRole } = render(CollapseWithVisiblePanelMock);

  expect(getByRole('region')).toBeInTheDocument();
});

test('title button has id', () => {
  const { getByRole } = render(CollapseWithStaticTitleMock);

  expect(getByRole('button').id).toBeDefined();
});

test('title button has aria-controls', () => {
  const { container, getByRole } = render(CollapseWithStaticTitleMock);
  const button = getByRole('button');
  const panel = container.lastChild as HTMLDivElement;

  fireEvent.focus(button);

  expect(button.getAttribute('aria-controls')).toBe(panel.id);
});

test('title button has icon', () => {
  const { container } = render(CollapseWithStaticTitleMock);
  const icon = container.querySelector('svg');

  expect(icon).toBeInTheDocument();
});

test('title button icon in initially collapsed state', () => {
  const { container } = render(CollapseWithStaticTitleMock);
  const icon = container.querySelector('svg');

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon in initially expanded state', () => {
  const { container } = render(CollapseWithVisiblePanelMock);
  const icon = container.querySelector('svg');

  expect(icon).toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon toggles on title click', () => {
  const { container, getByRole } = render(CollapseWithStaticTitleMock);
  const trigger = getByRole('button');
  const icon = container.querySelector('svg');

  fireEvent.click(trigger);

  expect(icon).toHaveStyle('transform: rotate(-180deg)');

  fireEvent.click(trigger);

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('panel has id', () => {
  const { container } = render(CollapseWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.id).toBeDefined();
});

test('panel has aria-labelledby attribute', () => {
  const { container } = render(CollapseWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.getAttribute('aria-labelledby')).toBeDefined();
});

test('panel has role attribute', () => {
  const { getByRole } = render(CollapseWithStaticTitleMock);
  const panel = getByRole('region', { hidden: true });
  expect(panel).toBeInTheDocument();
});

test('panel is hidden', () => {
  const { container } = render(CollapseWithStaticTitleMock);

  expect(container.lastChild).not.toBeVisible();
});

test('panel is visible', () => {
  const { container } = render(CollapseWithVisiblePanelMock);

  expect(container.lastChild).toBeVisible();
});

test('hidden panel becomes visible on title click', () => {
  const { container, getByRole } = render(CollapseWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(container.lastChild).toBeVisible();
});

test('visible panel becomes hidden on title click', () => {
  const { container, getByRole } = render(CollapseWithVisiblePanelMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(container.lastChild).not.toBeVisible();
});

test('click on title toggles aria-expanded attribute on title button', () => {
  const { getByRole } = render(CollapseWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('false');
});

test('onCollapseChange is called', () => {
  const { getByRole } = render(CollapseWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(handleChange).toHaveBeenCalled();
});
