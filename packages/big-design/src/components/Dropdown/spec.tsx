import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Button } from '../Button';

import { Dropdown } from './Dropdown';

const onClick = jest.fn();

const DropdownMock = (
  <Dropdown
    options={[
      { content: 'Option', type: 'string', value: '0' },
      { content: 'Option', type: 'string', value: '1', onClick },
      { content: 'Option', type: 'string', value: '2', actionType: 'destructive' },
      { content: 'Option', type: 'string', value: '3', icon: <CheckCircleIcon /> },
    ]}
    trigger={<Button>Button</Button>}
  />
);

test('renders dropdown trigger', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  expect(trigger).toBeInTheDocument();
});

test('dropdown trigger has an id', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  expect(trigger.id).toBeDefined();
});

test('dropdown trigger has aria-haspopup', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  expect(trigger.getAttribute('aria-haspopup')).toBe('true');
});

test('dropdown trigger has aria-expanded when dropdown menu is open', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');
});

test('renders the dropdown menu closed', () => {
  const { queryByRole } = render(DropdownMock);

  expect(queryByRole('listbox')).not.toBeVisible();
});

test('opens/closes dropdown menu when trigger is clicked', () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('dropdown menu has aria-labelledby', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(getByRole('listbox').getAttribute('aria-labelledby')).toBe(trigger.id);
});

test('dropdown menu has aria-activedescendant', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('option');

  expect(getByRole('listbox').getAttribute('aria-activedescendant')).toBe(options[0].id);
});

test('dropdown menu should have 4 dropdown items', () => {
  const { getAllByRole } = render(DropdownMock);

  const options = getAllByRole('option');
  expect(options.length).toBe(4);
});

test('first dropdown item should be selected when dropdown is opened', () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const option = getAllByRole('option')[0];

  expect(option.dataset.highlighted).toBe('true');
});

test('up/down arrows should change dropdown item selection', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
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
  const { getByRole, queryByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(getByRole('listbox'), { key: 'Escape' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('tab should close menu', () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);
  expect(queryByRole('listbox')).not.toHaveStyle('height: 1px');

  fireEvent.keyDown(getByRole('listbox'), { key: 'Tab' });
  expect(queryByRole('listbox')).toHaveStyle('height: 1px');
});

test('home should select first dropdown item', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
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
  const { getAllByRole, getByRole } = render(DropdownMock);
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
  const { getAllByRole, getByRole } = render(DropdownMock);
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
  const { getAllByRole, getByRole } = render(DropdownMock);
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
  const { getAllByRole, getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('option');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onClick).toHaveBeenCalledWith({ content: 'Option', onClick, type: 'string', value: '1' });
});

test('dropdown items should be highlighted when moused over', () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
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
  const { container } = render(DropdownMock);

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
