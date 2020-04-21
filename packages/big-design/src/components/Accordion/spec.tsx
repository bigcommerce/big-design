import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { Text } from '../Typography';

import { Accordion } from './Accordion';

const onChange = jest.fn();

const AccordionWithStaticTitleMock = (
  <Accordion title="title" id="test" onChange={onChange}>
    <Text>Content</Text>
  </Accordion>
);
const AccordionWithVisiblePanelMock = (
  <Accordion title="show more" initiallyOpen>
    <Text>Content</Text>
  </Accordion>
);

test('renders with title', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const title = container.querySelector('h3') as HTMLHeadingElement;

  expect(title).toBeInTheDocument();
});

test('renders with title button', () => {
  const { getByRole } = render(AccordionWithStaticTitleMock);

  expect(getByRole('button')).toBeInTheDocument();
});

test('renders with provided title', () => {
  const { queryAllByText } = render(AccordionWithStaticTitleMock);

  expect(queryAllByText('title').length).toBe(2);
});

test('renders with panel', () => {
  const { getByRole } = render(AccordionWithVisiblePanelMock);

  expect(getByRole('region')).toBeInTheDocument();
});

test('renders with provided id', () => {
  const { container, getByRole } = render(AccordionWithStaticTitleMock);
  const panel = container.querySelector('#test-panel') as HTMLDivElement;

  expect(getByRole('button').id).toBe('test-title');
  expect(panel.id).toBe('test-panel');
});

test('title button has id', () => {
  const { getByRole } = render(AccordionWithStaticTitleMock);

  expect(getByRole('button').id).toBeDefined();
});

test('title button has aria-controls', () => {
  const { container, getByRole } = render(AccordionWithStaticTitleMock);
  const button = getByRole('button');
  const panel = container.lastChild as HTMLDivElement;

  fireEvent.focus(button);

  expect(button.getAttribute('aria-controls')).toBe(panel.id);
});

test('title button has icon', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const icon = container.querySelector('svg');

  expect(icon).toBeInTheDocument();
});

test('title button icon in initially collapsed state', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const icon = container.querySelector('svg');

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon in initially expanded state', () => {
  const { container } = render(AccordionWithVisiblePanelMock);
  const icon = container.querySelector('svg');

  expect(icon).toHaveStyle('transform: rotate(-180deg)');
});

test('title button icon toggles on title click', () => {
  const { container, getByRole } = render(AccordionWithStaticTitleMock);
  const trigger = getByRole('button');
  const icon = container.querySelector('svg');

  fireEvent.click(trigger);

  expect(icon).toHaveStyle('transform: rotate(-180deg)');

  fireEvent.click(trigger);

  expect(icon).not.toHaveStyle('transform: rotate(-180deg)');
});

test('panel has id', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.id).toBeDefined();
});

test('panel has aria-labelledby attribute', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.getAttribute('aria-labelledby')).toBeDefined();
});

test('panel has role attribute', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.getAttribute('role')).toBeDefined();
});

test('panel has proper role attribute', () => {
  const { container } = render(AccordionWithStaticTitleMock);
  const panel = container.lastChild as HTMLDivElement;

  expect(panel.getAttribute('role')).toBe('region');
});

test('panel is hidden', () => {
  const { container } = render(AccordionWithStaticTitleMock);

  expect(container.lastChild).not.toBeVisible();
});

test('panel is visible', () => {
  const { container } = render(AccordionWithVisiblePanelMock);

  expect(container.lastChild).toBeVisible();
});

test('hidden panel becomes visible on title click', () => {
  const { container, getByRole } = render(AccordionWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(container.lastChild).toBeVisible();
});

test('visible panel becomes hidden on title click', () => {
  const { container, getByRole } = render(AccordionWithVisiblePanelMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(container.lastChild).not.toBeVisible();
});

test('click on title toggles aria-expanded attribute on title button', () => {
  const { getByRole } = render(AccordionWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('false');
});

test('Enter/Space buttons should toggle panel visibility when title is focused', () => {
  const { container, getByRole } = render(AccordionWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;
  const panel = container.lastChild as HTMLDivElement;

  fireEvent.click(trigger);
  trigger.focus();

  expect(trigger).toHaveFocus();
  expect(panel).toBeVisible();

  fireEvent.keyDown(trigger, { key: 'Enter' });

  expect(panel).not.toBeVisible();

  fireEvent.keyDown(trigger, { key: 'Enter' });

  expect(panel).toBeVisible();

  fireEvent.keyDown(trigger, { key: ' ' });

  expect(panel).not.toBeVisible();

  fireEvent.keyDown(trigger, { key: ' ' });

  expect(panel).toBeVisible();
});

test('onChange is called', () => {
  const { getByRole } = render(AccordionWithStaticTitleMock);
  const trigger = getByRole('button') as HTMLButtonElement;

  fireEvent.click(trigger);

  expect(onChange).toHaveBeenCalled();
});
