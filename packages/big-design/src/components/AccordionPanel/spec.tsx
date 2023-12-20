import { ErrorIcon } from '@bigcommerce/big-design-icons';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';

import { render, screen } from '@test/utils';

import { Text } from '../Typography';

import { AccordionProps } from './Accordion';

import { AccordionPanel, useAccordionPanel } from '.';

const TestComponent: React.FC = () => {
  const { panels } = useAccordionPanel([
    {
      header: 'Panel Header',
      children: <Text>This is a child component</Text>,
    },
  ]);

  return <AccordionPanel header="Accordion Panel Header" panels={panels} />;
};

const TestComponentWithoutHook: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const testPanels: AccordionProps[] = [
    {
      header: 'Panel Header',
      isExpanded,
      children: <Text>This is a child component</Text>,
      onClick: () => setIsExpanded(!isExpanded),
    },
  ];

  return <AccordionPanel header="Accordion Panel Header" panels={testPanels} />;
};

const TestComponentWithDefault: React.FC = () => {
  const { panels } = useAccordionPanel([
    {
      defaultExpanded: true,
      header: 'Panel Header',
      iconLeft: <ErrorIcon />,
      children: <Text>This is a child component</Text>,
    },
  ]);

  return <AccordionPanel header="Accordion Panel Header" panels={panels} />;
};

test('it renders accordion panel header', async () => {
  render(<TestComponent />);

  const header = await screen.findByRole('heading', { name: /Accordion Panel Header/i });

  expect(header).toMatchSnapshot();
  expect(header).toBeVisible();
});

test('it renders accordion panel children', async () => {
  render(<TestComponent />);

  const child = await screen.findByText('Panel Header');

  expect(child).toBeVisible();
});

test('accordion renders header', async () => {
  render(<TestComponent />);

  const header = await screen.findByText('Panel Header');

  expect(header).toBeVisible();
});

test('accordion collapses and expands on click', async () => {
  render(<TestComponent />);

  const buttonPanel = await screen.findByRole('button');

  await userEvent.click(buttonPanel);

  const panelChild = await screen.findByRole('region');

  expect(panelChild).toBeVisible();

  await userEvent.click(buttonPanel);

  expect(panelChild).not.toBeVisible();
});

test('accordion renders children', async () => {
  render(<TestComponent />);

  const buttonPanel = await screen.findByRole('button');

  await userEvent.click(buttonPanel);

  const child = await screen.findByRole('region');

  expect(child).toBeVisible();
});

test('if defaultExpanded is set to true, accordion panel is expanded', async () => {
  render(<TestComponentWithDefault />);

  const panelChild = await screen.findByRole('region');

  expect(panelChild).toBeVisible();
});

test('it renders icon if iconLeft prop is defined', async () => {
  render(<TestComponentWithDefault />);

  const icons = (await screen.findByRole('button')).querySelectorAll('svg');

  const icon = icons[0];

  expect(icon).toBeVisible();
});

test('it renders header and children accordion elements without hook', async () => {
  render(<TestComponentWithoutHook />);

  const header = await screen.findByText('Panel Header');
  const buttonPanel = await screen.findByRole('button');

  await userEvent.click(buttonPanel);

  const child = await screen.findByRole('region');

  expect(child).toBeVisible();
  expect(header).toBeVisible();
});
