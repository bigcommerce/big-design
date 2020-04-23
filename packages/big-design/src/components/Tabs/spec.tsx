import React from 'react';

import { fireEvent, render } from '@test/utils';

import 'jest-styled-components';

import { TabItem, Tabs } from './Tabs';

const items: TabItem[] = [
  { id: 'tab1', title: 'Tab 1' },
  { id: 'tab2', title: 'Tab 2' },
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
  const { getByRole } = render(<Tabs items={items} />);

  expect(getByRole('tablist')).toBeInTheDocument();
});

test('Tab items have a role', () => {
  const { getAllByRole } = render(<Tabs items={items} />);

  expect(getAllByRole('tab').length).toBe(2);
});

test('active tab has a tabindex', () => {
  const activeTab = 'tab2';
  const { getAllByRole } = render(<Tabs activeTab={activeTab} items={items} />);

  const tabs = getAllByRole('tab');

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
  const { getByText } = render(<Tabs items={items} onTabClick={onClick} />);
  const trigger = getByText('Tab 2');

  fireEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();
});

test('active tab changes on tab click', () => {
  const onClick = jest.fn();

  const { getByText, rerender } = render(<Tabs items={items} onTabClick={onClick} />);

  let trigger = getByText('Tab 2');

  fireEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();

  rerender(<Tabs items={items} onTabClick={onClick} />);

  trigger = getByText('Tab 1');

  fireEvent.click(trigger);

  expect(onClick).toHaveBeenCalled();
});

test("clicking a disabled tab doesn't set the active tab", () => {
  let activeTab = 'tab1';
  const disabledItems: TabItem[] = [...items, { id: 'tab3', title: 'Tab 3', disabled: true }];
  const setActiveTab = jest.fn((tabId: string) => (activeTab = tabId));

  const { getByText } = render(<Tabs activeTab={activeTab} items={disabledItems} onTabClick={setActiveTab} />);

  const trigger = getByText('Tab 3');

  fireEvent.click(trigger);

  expect(setActiveTab).not.toHaveBeenCalled();
  expect(activeTab).toBe('tab1');
});

test('does not forward styles', () => {
  const { container } = render(<Tabs className="test" style={{ background: 'red' }} items={items} />);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});
