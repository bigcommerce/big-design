import 'jest-styled-components';
import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import { Button } from '../Button';

import { Dropdown } from './Dropdown';

jest.mock('popper.js', () => {
  const PopperJS = jest.requireActual('popper.js');

  return class {
    static placements = PopperJS.placements;

    constructor() {
      return {
        // tslint:disable-next-line: no-empty
        destroy: () => {},
        // tslint:disable-next-line: no-empty
        scheduleUpdate: () => {},
      };
    }
  };
});

const DropdownMock = (
  <Dropdown trigger={<Button>Button</Button>}>
    <Dropdown.Item value={0}>Option</Dropdown.Item>
    <Dropdown.Item value={1}>Option</Dropdown.Item>
    <Dropdown.Item value={2}>Option</Dropdown.Item>
    <Dropdown.Item value={3}>Option</Dropdown.Item>
  </Dropdown>
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

test('dropdown trigger has aria-expanded and aria-owns when dropdown menu is open', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(trigger.getAttribute('aria-expanded')).toBe('true');
  expect(trigger.getAttribute('aria-owns')).toBe(getByRole('menu').id);
});

test('renders the dropdown menu closed', () => {
  const { getByRole } = render(DropdownMock);

  expect(getByRole('menu')).not.toBeVisible();
});

test('opens/closes dropdown menu when trigger is clicked', async () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');
  const menu = getByRole('menu');

  fireEvent.click(trigger);
  expect(menu).toHaveStyle('display: inline-block');

  fireEvent.click(trigger);
  expect(menu).not.toHaveStyle('display: inline-block');
});

test('dropdown menu has aria-labelledby', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  expect(getByRole('menu').getAttribute('aria-labelledby')).toBe(trigger.id);
});

test('dropdown menu has aria-activedescendant', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('menuitem');

  expect(getByRole('menu').getAttribute('aria-activedescendant')).toBe(options[0].id);
});

test('dropdown menu should have 4 dropdown items', () => {
  const { getAllByRole } = render(DropdownMock);

  const options = getAllByRole('menuitem');
  expect(options.length).toBe(4);
});

test('dropdown items should have values', () => {
  const { getAllByRole } = render(DropdownMock);

  const options = getAllByRole('menuitem');
  options.forEach((option, index) => expect(option.getAttribute('value')).toBe(`${index}`));
});

test('first dropdown item should be selected when dropdown is opened', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const option = getByRole('menuitem');

  expect(option.dataset.highlighted).toBe('true');
});

test('up/down arrows should change dropdown item selection', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('menu');
  const options = getAllByRole('menuitem');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'ArrowUp' });
  expect(options[3].dataset.highlighted).toBe('true');
});

test('esc should close menu', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');
  const menu = getByRole('menu');

  fireEvent.click(trigger);
  expect(menu).toHaveStyle('display: inline-block');

  fireEvent.keyDown(menu, { key: 'Escape' });
  expect(menu).not.toHaveStyle('display: inline-block');
});

test('tab should close menu', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');
  const menu = getByRole('menu');

  fireEvent.click(trigger);
  expect(menu).toHaveStyle('display: inline-block');

  fireEvent.keyDown(menu, { key: 'Tab' });
  expect(menu).not.toHaveStyle('display: inline-block');
});

test('home should select first dropdown item', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('menu');
  const options = getAllByRole('menuitem');

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

  const menu = getByRole('menu');
  const options = getAllByRole('menuitem');

  expect(options[0].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'End' });
  expect(options[3].dataset.highlighted).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should trigger onItemClick', () => {
  const onItemClick = jest.fn();
  const { getAllByRole, getByRole } = render(
    <Dropdown onItemClick={onItemClick} trigger={<Button>Button</Button>}>
      <Dropdown.Item value={0}>Option</Dropdown.Item>
      <Dropdown.Item value={1}>Option</Dropdown.Item>
    </Dropdown>,
  );
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('menu');
  const options = getAllByRole('menuitem');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: 'Enter' });
  expect(onItemClick).toHaveBeenCalledWith('1');
});

test('space should trigger onItemClick', () => {
  const onItemClick = jest.fn();
  const { getAllByRole, getByRole } = render(
    <Dropdown onItemClick={onItemClick} trigger={<Button>Button</Button>}>
      <Dropdown.Item value={0}>Option</Dropdown.Item>
      <Dropdown.Item value={1}>Option</Dropdown.Item>
    </Dropdown>,
  );
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const menu = getByRole('menu');
  const options = getAllByRole('menuitem');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].dataset.highlighted).toBe('true');

  fireEvent.keyDown(menu, { key: ' ' });
  expect(onItemClick).toHaveBeenCalledWith('1');
});

test('clicking on dropdown items should trigger onItemClick', () => {
  const onItemClick = jest.fn();
  const { getAllByRole, getByRole } = render(
    <Dropdown onItemClick={onItemClick} trigger={<Button>Button</Button>}>
      <Dropdown.Item value={0}>Option</Dropdown.Item>
      <Dropdown.Item value={1}>Option</Dropdown.Item>
    </Dropdown>,
  );
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const options = getAllByRole('menuitem');

  fireEvent.mouseOver(options[1]);
  fireEvent.click(options[1]);
  expect(onItemClick).toHaveBeenCalledWith('1');
});

test('dropdown items should be highlighted when moused over', () => {
  const { getByRole } = render(DropdownMock);
  const trigger = getByRole('button');

  fireEvent.click(trigger);

  const option = getByRole('menuitem');

  fireEvent.mouseOver(option);
  expect(option.dataset.highlighted).toBe('true');
});
