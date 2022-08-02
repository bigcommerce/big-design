import { ErrorIcon } from '@bigcommerce/big-design-icons';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen, waitFor } from '@test/utils';

import { Text } from '../Typography';

import { AccordionGroup } from './AccordionGroup';
import { AccordionPanel } from './AccordionPanel';

const handleClick = jest.fn();

const mockAccordion = (
  <AccordionPanel header="Panel Header" isExpanded onClick={handleClick}>
    <Text>This is a child component</Text>
  </AccordionPanel>
);

const mockAccordionGroup = (
  <AccordionGroup header="Test Accordion">
    <AccordionPanel header="Panel Header" isExpanded onClick={handleClick}>
      <Text>This is a child component</Text>
    </AccordionPanel>
  </AccordionGroup>
);

test('it renders accordion group header', async () => {
  render(mockAccordionGroup);

  const header = await screen.findByRole('heading', { name: /test accordion/i });

  expect(header).toMatchSnapshot();
  expect(header).toBeVisible();
});

test('it renders accordion children', async () => {
  render(mockAccordionGroup);

  const child = await screen.findByText('Panel Header');

  expect(child).toBeVisible();
});

test('accordion item renders header', async () => {
  render(mockAccordion);

  const header = await screen.findByText('Panel Header');

  expect(header).toBeVisible();
});

test('accordion row collapses and expands on click', async () => {
  render(mockAccordion);

  const panel = await screen.findByRole('button');

  userEvent.click(panel);

  await waitFor(() => {
    expect(panel.getAttribute('aria-expanded')).toBe('true');
  });

  userEvent.click(panel);

  await waitFor(() => {
    expect(panel.getAttribute('aria-expanded')).toBe('false');
  });
});

test('accordion row renders children', async () => {
  render(mockAccordion);

  const panel = await screen.findByRole('button');

  userEvent.click(panel);

  const child = await screen.findByRole('region');

  expect(child).toBeVisible();
});

test('if defaultExpanded is set to true, accordion is expanded', async () => {
  render(
    <AccordionPanel defaultExpanded={true} header="Panel Header" isExpanded onClick={handleClick}>
      <Text>This is a child component</Text>
    </AccordionPanel>,
  );

  const panel = await screen.findByRole('button');

  expect(panel.getAttribute('aria-expanded')).toBe('true');
});

test('it renders icon if iconLeft prop is set', async () => {
  render(
    <AccordionPanel
      defaultExpanded={true}
      header="Panel Header"
      iconLeft={<ErrorIcon />}
      isExpanded
      onClick={handleClick}
    >
      <Text>This is a child component</Text>
    </AccordionPanel>,
  );

  const icons = (await screen.findByRole('button')).querySelectorAll('svg');

  const icon = icons[0];

  expect(icon).toBeVisible();
});
