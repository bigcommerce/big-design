import { render, screen } from '@test/utils';
import userEvent from '@testing-library/user-event';
import React from 'react';

import 'jest-styled-components';

import { warning } from '../../utils';

import { TabItem, Tabs } from './Tabs';

const items: TabItem[] = [
  { ariaControls: 'content1', id: 'tab1', title: 'Tab 1' },
  { ariaControls: 'content2', id: 'tab2', title: 'Tab 2' },
];

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  warning: jest.fn(),
}));

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

  expect(screen.getAllByRole('tab')).toHaveLength(2);
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
  const { container } = render(
    <Tabs className="test" items={items} style={{ background: 'red' }} />,
  );

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('passes the ariaControls prop to the tabs', () => {
  render(<Tabs className="test" items={items} />);

  const tabs = screen.getAllByRole('tab');

  expect(tabs[0].getAttribute('aria-controls')).toBe('content1');
  expect(tabs[1].getAttribute('aria-controls')).toBe('content2');
});

test('active tab has aria-selected', () => {
  render(<Tabs activeTab="tab1" items={items} />);

  const tabs = screen.getAllByRole('tab');

  expect(tabs[0].getAttribute('aria-selected')).toBe('true');
  expect(tabs[1].getAttribute('aria-selected')).toBe('false');
});

test('shows a warning if ariaControls is missing or fallback id does not exist', () => {
  const warningSpy = jest.fn();

  jest.mocked(warning).mockImplementation(warningSpy);

  const incompleteItems: TabItem[] = [
    { id: 'tab1', title: 'Tab 1' },
    { id: 'tab2', title: 'Tab 2' },
  ];

  render(<Tabs activeTab="tab1" items={incompleteItems} />);

  expect(warningSpy).toHaveBeenCalled();
});

test('does not warn if ariaControls is present', () => {
  const warningSpy = jest.fn();

  jest.mocked(warning).mockImplementation(warningSpy);

  render(<Tabs activeTab="tab1" items={items} />);

  expect(warningSpy).not.toHaveBeenCalled();
});

test('does not warn if fallback id is valid', () => {
  const warningSpy = jest.fn();

  jest.mocked(warning).mockImplementation(warningSpy);

  render(
    <>
      <Tabs activeTab="tab1" items={items} />
      <div id="tab1-content">Hello world</div>
    </>,
  );

  expect(warningSpy).not.toHaveBeenCalled();
});
