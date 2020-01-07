import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { Button } from '../Button';

import { Dropdown } from './Dropdown';

let onClick = jest.fn();

const DropdownMock = (click: jest.Mock) => (
  <Dropdown
    options={[
      { content: 'Option', type: 'string', value: '0' },
      { content: 'Option', type: 'string', value: '1', onClick: click },
      { content: 'Option', type: 'string', value: '2', actionType: 'destructive' },
      { content: 'Option', type: 'string', value: '3', icon: <CheckCircleIcon /> },
    ]}
    trigger={<Button>Button</Button>}
  />
);

const GroupedDropdownMock = (click: jest.Mock) => (
  <Dropdown
    options={[
      {
        label: 'Label 1',
        options: [
          { content: 'Option 1', onClick: click },
          { content: 'Option 2', onClick: click },
          { content: 'Option 3', onClick: click },
        ],
      },
      {
        label: 'Label 2',
        options: [
          { content: 'Option 4', onClick: click },
          { content: 'Option 5', onClick: click },
          { content: 'Option 6', onClick: click },
        ],
      },
    ]}
    trigger={<Button>Button</Button>}
  />
);

beforeEach(() => {
  onClick = jest.fn();
});

test('renders dropdown trigger', () => {
  const { getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  expect(trigger).toBeInTheDocument();
});

test('dropdown trigger has an id', () => {
  const { getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  expect(trigger.id).toBeDefined();
});

test('dropdown trigger has aria-haspopup', () => {
  const { getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  expect(trigger.getAttribute('aria-haspopup')).toBe('true');
});

test('dropdown trigger has aria-expanded when dropdown menu is open', () => {
  const { getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');
});

test('renders the dropdown menu closed', () => {
  const { queryByRole } = render(DropdownMock(onClick));

  expect(queryByRole('listbox')).not.toBeVisible();
});

test('opens/closes dropdown menu when trigger is clicked', () => {
  const { getByRole, queryByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('dropdown menu has aria-labelledby', () => {
  const { getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(getByRole('listbox').getAttribute('aria-labelledby')).toBe(trigger.id);
});

test('dropdown menu has aria-activedescendant', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('option');

  expect(getByRole('listbox').getAttribute('aria-activedescendant')).toBe(options[0].id);
});

test('dropdown menu should have 4 dropdown items', () => {
  const { getAllByRole } = render(DropdownMock(onClick));

  const options = getAllByRole('option');
  expect(options.length).toBe(4);
});

test('first dropdown item should be selected when dropdown is opened', () => {
  const { getByRole, getAllByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const option = getAllByRole('option')[0];

  expect(option.dataset.highlighted).toBe('true');
});

test('up/down arrows should change dropdown item selection', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[3].dataset.highlighted).toBe('true');
});

test('esc should close menu', () => {
  const { getByRole, queryByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(getByRole('listbox'), { key: 'Escape' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('tab should close menu', () => {
  const { getByRole, queryByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(getByRole('listbox'), { key: 'Tab' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('home should select first dropdown item', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[3].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'Home' });
  expect(options[0].dataset.highlighted).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last dropdown item', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'End' });
  expect(options[3].dataset.highlighted).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should trigger onClick', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'Enter' });
  expect(onClick).toHaveBeenCalledWith({ content: 'Option', onClick, type: 'string', value: '1' });
});

test('space should trigger onClick', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: ' ' });
  expect(onClick).toHaveBeenCalledWith({ content: 'Option', onClick, type: 'string', value: '1' });
});

test('clicking on dropdown items should trigger onClick', () => {
  const { getAllByRole, getByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('option');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onClick).toHaveBeenCalledWith({ content: 'Option', onClick, type: 'string', value: '1' });
});

test('dropdown items should be highlighted when moused over', () => {
  const { getByRole, getAllByRole } = render(DropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const option = getAllByRole('option')[0];

  fireEvent.mouseOver(option);
  expect(option.dataset.highlighted).toBe('true');
});

test('dropdown menu renders 4 link when passed options of type link', () => {
  const { container } = render(
    <Dropdown
      onClick={onClick}
      options={[
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
      ]}
      trigger={<Button>Button</Button>}
    />,
  );

  const options = container.querySelectorAll('a');
  expect(options.length).toBe(4);

  options.forEach(option => {
    expect(option.getAttribute('href')).toBe('#');
  });
});

test('items renders icons', () => {
  const { container } = render(DropdownMock(onClick));

  const svg = container.querySelectorAll('svg');
  expect(svg.length).toBe(1);
});

test('does not forward styles', () => {
  const { container, getByRole } = render(
    <Dropdown className="test" style={{ background: 'red' }} options={[]} trigger={<Button>Button</Button>} />,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(getByRole('listbox')).not.toHaveStyle('background: red');
});

test('renders tooltip with disabled item', () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';
  const { getByRole, getByText } = render(
    <Dropdown
      onClick={onClick}
      options={[
        { content: 'Option 1', type: 'string', value: '0' },
        {
          content: tooltipContent,
          tooltip: tooltipText,
          disabled: true,
          type: 'string',
        },
        { content: 'Option 3', type: 'string', value: '2', actionType: 'destructive' },
      ]}
      trigger={<Button>Button</Button>}
    />,
  );
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  fireEvent.mouseEnter(getByText(tooltipContent));

  expect(getByText(tooltipText)).toBeInTheDocument();
});

test("doesn't render tooltip on enabled item", () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';
  const { getByRole, getByText, queryByText } = render(
    <Dropdown
      onClick={onClick}
      options={[
        { content: 'Option 1', type: 'string', value: '0' },
        {
          content: tooltipContent,
          tooltip: tooltipText,
          type: 'string',
        },
        { content: 'Option 3', type: 'string', value: '2', actionType: 'destructive' },
      ]}
      trigger={<Button>Button</Button>}
    />,
  );
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  fireEvent.mouseEnter(getByText(tooltipContent));

  expect(queryByText(tooltipText)).not.toBeInTheDocument();
});

test('no errors expected if all options are disabled', () => {
  const { getByRole } = render(
    <Dropdown
      onClick={onClick}
      options={[
        { content: 'Option 1', value: '0', disabled: true },
        { content: 'Option 2', value: '1', disabled: true },
      ]}
      trigger={<Button>Button</Button>}
    />,
  );

  const trigger = getByRole('button');
  expect(() => {
    fireEvent.click(trigger);
  }).not.toThrow();
});

test('dropdown should have 2 group labels', () => {
  const { getAllByRole } = render(GroupedDropdownMock(onClick));

  const labels = getAllByRole('group');

  expect(labels.length).toBe(2);
});

test('group labels are grayed out', () => {
  const { getAllByRole } = render(GroupedDropdownMock(onClick));

  const labels = getAllByRole('group');

  expect(labels[0]).toHaveStyle('color: #B4BAD1');
  expect(labels[1]).toHaveStyle('color: #B4BAD1');
});

test('group labels are skipped over when using keyboard to navigate options', () => {
  const { getAllByRole, getByRole } = render(GroupedDropdownMock(onClick));
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });

  expect(options[3].dataset.highlighted).toBe('true');
});

test('clicking label does not call onClick', () => {
  const { getAllByRole, getByRole } = render(GroupedDropdownMock(onClick));
  const trigger = getByRole('button');
  const labels = getAllByRole('group');

  fireEvent.click(trigger);
  fireEvent.mouseOver(labels[0]);
  fireEvent.click(labels[0]);

  expect(onClick).not.toHaveBeenCalled();
});
