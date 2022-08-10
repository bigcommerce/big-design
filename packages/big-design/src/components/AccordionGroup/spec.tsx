import { ErrorIcon } from '@bigcommerce/big-design-icons';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '@test/utils';

import { Text } from '../Typography';

import { AccordionGroup } from './AccordionGroup';

const handleClick = jest.fn();

const mockPanel = [
  {
    header: 'Panel Header',
    isExpanded: false,
    iconLeft: <ErrorIcon />,
    onClick: handleClick,
    children: <Text>This is a child component</Text>,
  },
];

const mockAccordionGroup = <AccordionGroup header="Test Accordion" panels={mockPanel} />;

const mockDefaultExpandPanel = [
  {
    defaultExpanded: true,
    header: 'Panel Header',
    isExpanded: false,
    onClick: handleClick,
    children: <Text>This is a child component</Text>,
  },
];

const mockAccordionGroupDefault = (
  <AccordionGroup header="Test Accordion" panels={mockDefaultExpandPanel} />
);

test('it renders accordion group header', async () => {
  render(mockAccordionGroup);

  const header = await screen.findByRole('heading', { name: /test accordion/i });

  expect(header).toMatchSnapshot();
  expect(header).toBeVisible();
});

test('it renders accordion panel children', async () => {
  render(mockAccordionGroup);

  const child = await screen.findByText('Panel Header');

  expect(child).toBeVisible();
});

test('accordion panel renders header', async () => {
  render(mockAccordionGroup);

  const header = await screen.findByText('Panel Header');

  expect(header).toBeVisible();
});

test('accordion panel collapses and expands on click', async () => {
  render(mockAccordionGroup);

  const buttonPanel = await screen.findByRole('button');

  userEvent.click(buttonPanel);

  const panelChild = await screen.findByRole('region');

  expect(panelChild).toBeVisible();

  userEvent.click(buttonPanel);

  expect(panelChild).not.toBeVisible();
});

test('accordion panel renders children', async () => {
  render(mockAccordionGroup);

  const buttonPanel = await screen.findByRole('button');

  userEvent.click(buttonPanel);

  const child = await screen.findByRole('region');

  expect(child).toBeVisible();
});

test('if defaultExpanded is set to true, accordion panel is expanded', async () => {
  render(mockAccordionGroupDefault);

  const panelChild = await screen.findByRole('region');

  expect(panelChild).toBeVisible();
});

test('it renders icon if iconLeft prop is defined', async () => {
  render(mockAccordionGroup);

  const icons = (await screen.findByRole('button')).querySelectorAll('svg');

  const icon = icons[0];

  expect(icon).toBeVisible();
});
