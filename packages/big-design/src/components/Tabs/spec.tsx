import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '@test/utils';

import 'jest-styled-components';

import { TabItem, Tabs } from './Tabs';

const items: TabItem[] = [
  { ariaControls: 'content1', id: 'tab1', title: 'Tab 1' },
  { ariaControls: 'content2', id: 'tab2', title: 'Tab 2' },
];

test('render Tabs', () => {
  const { container } = render(<Tabs items={items} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('render Tabs with disabled item', () => {
  const disabledItems: TabItem[] = [...items, { id: 'tab3', title: 'Tab 3', disabled: true }];
  const { container } = render(<Tabs items={disabledItems} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('Tabs has a role', () => {
  render(<Tabs items={items} />);

  expect(screen.getByRole('tablist')).toBeInTheDocument();
});

test('Tab items have a role', () => {
  render(<Tabs items={items} />);

  expect(screen.getAllByRole('tab').length).toBe(2);
});

test('active tab has a tabindex', () => {
  const activeTab = 'tab2';
  render(<Tabs activeTab={activeTab} items={items} />);

  const tabs = screen.getAllByRole('tab');

  tabs.forEach((tab) => {
    if (tab.id === activeTab) {
      expect(tab.tabIndex).toBe(-1);
    } else {
      expect(tab.tabIndex).toBe(0);
    }
  });
});

test('onTabClick is called', () => {
  const onClick = jest.fn();
  render(<Tabs items={items} onTabClick={onClick} />);
  const trigger = screen.getByText('Tab 2');

  userEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();
});

test('active tab changes on tab click', () => {
  const onClick = jest.fn();

  const { rerender } = render(<Tabs items={items} onTabClick={onClick} />);

  let trigger = screen.getByText('Tab 2');

  userEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();

  rerender(<Tabs items={items} onTabClick={onClick} />);

  trigger = screen.getByText('Tab 1');

  userEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();
});

test("clicking a disabled tab doesn't set the active tab", () => {
  let activeTab = 'tab1';
  const disabledItems: TabItem[] = [...items, { id: 'tab3', title: 'Tab 3', disabled: true }];
  const setActiveTab = jest.fn((tabId: string) => (activeTab = tabId));

  render(<Tabs activeTab={activeTab} items={disabledItems} onTabClick={setActiveTab} />);

  const trigger = screen.getByText('Tab 3');

  userEvent.click(trigger);

  expect(setActiveTab).not.toHaveBeenCalled();
  expect(activeTab).toBe('tab1');
});

test('does not forward styles', () => {
  const { container } = render(<Tabs className="test" style={{ background: 'red' }} items={items} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('passes the ariaControls prop to the tabs', () => {
  render(<Tabs className="test" items={items} />);

  const tabs = screen.getAllByRole('tab');

  expect(tabs[0].getAttribute('aria-controls')).toBe('content1');
  expect(tabs[1].getAttribute('aria-controls')).toBe('content2');
});

test('active tab has aria-expanded', () => {
  render(<Tabs activeTab="tab1" items={items} />);

  const tabs = screen.getAllByRole('tab');

  expect(tabs[0].getAttribute('aria-expanded')).toBe('true');
  expect(tabs[1].getAttribute('aria-expanded')).toBe('false');
});
