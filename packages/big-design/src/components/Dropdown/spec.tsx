import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import React from 'react';
import 'jest-styled-components';

import { fireEvent, render, screen, waitForElement } from '@test/utils';

import { Button } from '../Button';

import { Dropdown } from './';

const onItemClick = jest.fn();

const DropdownMock = (
  <Dropdown
    items={[
      { content: 'Option 1', onItemClick },
      { content: 'Option 2', onItemClick },
      { content: 'Option 3', onItemClick, actionType: 'destructive' },
      { content: 'Option 4', onItemClick, icon: <CheckCircleIcon /> },
    ]}
    toggle={<Button>Button</Button>}
  />
);

const GroupedDropdownMock = (
  <Dropdown
    items={[
      {
        label: 'Label 1',
        items: [
          { content: 'Option 1', onItemClick },
          { content: 'Option 2', onItemClick },
          { content: 'Option 3', onItemClick },
        ],
      },
      {
        label: 'Label 2',
        items: [
          { content: 'Option 4', onItemClick },
          { content: 'Option 5', onItemClick },
          { content: 'Option 6', onItemClick },
        ],
      },
    ]}
    toggle={<Button>Button</Button>}
  />
);

const LineSeparatedGroupedDropdownMock = (
  <Dropdown
    items={[
      {
        label: 'Label 1',
        items: [{ content: 'Option 1', onItemClick }],
      },
      {
        separated: true,
        items: [{ content: 'Option 2', onItemClick }],
      },
    ]}
    toggle={<Button>Button</Button>}
  />
);

const DropdownWithItemsDescriptions = (
  <Dropdown
    items={[
      { content: 'Option 1', onItemClick, description: 'Option 1 Description' },
      { content: 'Option 2', onItemClick },
      { content: 'Option 3', onItemClick, actionType: 'destructive' },
      { content: 'Option 4', onItemClick, icon: <CheckCircleIcon /> },
    ]}
    toggle={<Button>Button</Button>}
  />
);

test('renders dropdown toggle', async () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle).toBeInTheDocument();
  await waitForElement(() => getByRole('button'));
});

test('dropdown toggle has an id', async () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle.id).toBeDefined();
  await waitForElement(() => getByRole('button'));
});

test('dropdown toggle accepts a custom id', async () => {
  const { getByRole } = render(
    <Dropdown items={[{ content: 'Option', onItemClick }]} toggle={<Button id="testId">Button</Button>} />,
  );
  const toggle = getByRole('button');

  expect(toggle.id).toBe('testId');
  await waitForElement(() => getByRole('button'));
});

test('dropdown toggle has aria-haspopup', async () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle.getAttribute('aria-haspopup')).toBe('listbox');
  await waitForElement(() => getByRole('button'));
});

test('dropdown toggle has aria-expanded when dropdown menu is open', async () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  expect(toggle.getAttribute('aria-expanded')).toBe('true');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('renders the dropdown menu closed', async () => {
  const { queryByRole } = render(DropdownMock);

  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('opens/closes dropdown menu when toggle is clicked', async () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).not.toBeEmptyDOMElement();

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('dropdown menu has aria-activedescendant', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  expect(getByRole('listbox').getAttribute('aria-activedescendant')).toBe(options[0].id);

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('dropdown menu should have 4 dropdown items', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  expect(options.length).toBe(4);

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('should accept a maxHeight prop', async () => {
  const { getByRole } = render(
    <Dropdown
      items={[
        { content: 'Foo', onItemClick },
        { content: 'Bar', onItemClick },
      ]}
      maxHeight={350}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(350));

  await waitForElement(() => screen.getByRole('option', { name: /foo/i }));
});

test('should default max-height to 250', async () => {
  const { getByRole } = render(DropdownMock);

  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(250));

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('dropdown items should immediately rerender when prop changes', async () => {
  const { getAllByRole, getByRole, rerender } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  let options = getAllByRole('option');
  expect(options.length).toBe(4);

  rerender(
    <Dropdown
      items={[
        { content: 'Foo', onItemClick },
        { content: 'Bar', onItemClick },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  options = getAllByRole('option');
  expect(options.length).toBe(2);

  await waitForElement(() => screen.getByRole('option', { name: /foo/i }));
});

test('first dropdown item should be selected when dropdown is opened', async () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const option = getAllByRole('option')[0];
  expect(option.getAttribute('aria-selected')).toBe('true');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('up/down arrows should change dropdown item selection', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[3].getAttribute('aria-selected')).toBe('true');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('esc should close menu', async () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).not.toBeEmptyDOMElement();

  fireEvent.keyDown(getByRole('listbox'), { key: 'Escape' });
  expect(queryByRole('listbox')).toBeEmptyDOMElement();
  await waitForElement(() => queryByRole('listbox'));
});

test('home should select first dropdown item', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[3].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'Home' });
  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[0].id);

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('end should select last dropdown item', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'End' });
  expect(options[3].getAttribute('aria-selected')).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[3].id);

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('enter should toggle onItemClick', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'Enter' });
  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
  await waitForElement(() => getByRole('listbox'));
});

test('clicking on dropdown items should toggle onItemClick', async () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  fireEvent.click(options[1]);
  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
  await waitForElement(() => getByRole('button'));
});

test('dropdown items should be highlighted when moused over', async () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  fireEvent.mouseOver(options[0]);

  expect(options[0].getAttribute('aria-selected')).toBe('true');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('dropdown menu renders 4 link when passed options of type link', async () => {
  const { container, getByRole } = render(
    <Dropdown
      items={[
        { content: 'Option 1', url: '#', type: 'link' },
        { content: 'Option 2', url: '#', type: 'link' },
        { content: 'Option 3', url: '#', type: 'link' },
        { content: 'Option 4', url: '#', type: 'link' },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = container.querySelectorAll('a');
  expect(options.length).toBe(4);

  options.forEach((option) => {
    expect(option.getAttribute('href')).toBe('#');
  });

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('items renders icons', async () => {
  const { container, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const svg = container.querySelectorAll('svg');
  expect(svg.length).toBe(1);

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('does not forward styles', async () => {
  const { container, getByRole } = render(
    <Dropdown
      className="test"
      style={{ background: 'red' }}
      items={[{ content: 'Option 1', url: '#', type: 'link' }]}
      toggle={<Button>Button</Button>}
    />,
  );
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(getByRole('listbox')).not.toHaveStyle('background: red');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('renders tooltip with disabled item', async () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';
  const { getByRole, getByText } = render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick },
        {
          content: tooltipContent,
          tooltip: tooltipText,
          onItemClick,
          disabled: true,
        },
        { content: 'Option 3', onItemClick, actionType: 'destructive' },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  fireEvent.mouseEnter(getByText(tooltipContent));

  expect(getByText(tooltipText)).toBeInTheDocument();

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test("doesn't render tooltip on enabled item", async () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';
  const { getByRole, getByText, queryByText } = render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick },
        {
          content: tooltipContent,
          tooltip: tooltipText,
          onItemClick,
        },
        { content: 'Option 3', onItemClick, actionType: 'destructive' },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  fireEvent.mouseEnter(getByText(tooltipContent));

  expect(queryByText(tooltipText)).not.toBeInTheDocument();

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('no errors expected if all options are disabled', async () => {
  const { getByRole } = render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick, disabled: true },
        { content: 'Option 2', onItemClick, disabled: true },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = getByRole('button');
  expect(() => fireEvent.click(toggle)).not.toThrow();

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('dropdown should have 2 group labels, render uppercased', async () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('group labels are grayed out', async () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('group labels are skipped over when using keyboard to navigate options', async () => {
  const { getAllByRole, getByRole } = render(GroupedDropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('clicking label does not call onItemClick', async () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  fireEvent.mouseOver(label1);
  fireEvent.click(label1);

  expect(onItemClick).not.toHaveBeenCalled();

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});

test('renders appropriate amount of list items', async () => {
  const { getByRole, container } = render(
    <Dropdown
      items={[
        {
          label: 'Label 1',
          items: [{ content: 'Option 1', onItemClick }],
        },
        {
          items: [{ content: 'Option 2', onItemClick }],
        },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const listItems = await waitForElement(() => container.querySelectorAll('li'));

  expect(listItems.length).toBe(3);
});

test('rendered line separators have correct accessibility properties', async () => {
  const { getByRole, container } = render(LineSeparatedGroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const hrListItem = await waitForElement(() => container.querySelectorAll('hr')[0].parentElement as HTMLElement);
  expect(hrListItem.getAttribute('aria-hidden')).toBe('true');
  expect(hrListItem.getAttribute('tabindex')).toBe('-1');
});

test('rendered line separators cannot be focused on', async () => {
  const { getByRole, container } = render(LineSeparatedGroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const hrListItem = await waitForElement(() => container.querySelectorAll('hr')[0].parentElement as HTMLElement);
  fireEvent.mouseOver(hrListItem);
  expect(document.activeElement).not.toEqual(hrListItem);
});

test('items should supports description', async () => {
  const { getByRole, getByText } = render(DropdownWithItemsDescriptions);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  expect(getByText('Option 1 Description')).toBeInTheDocument();

  await waitForElement(() => screen.getByRole('option', { name: /option 1/i }));
});
