import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React, { Fragment } from 'react';

import { Button } from '../Button';

import { Dropdown } from './';

const onItemClick = jest.fn();

const DropdownMock = (
  <Dropdown
    items={[
      { content: 'Option', onItemClick },
      { content: 'Option', onItemClick },
      { content: 'Option', onItemClick, actionType: 'destructive' },
      { content: 'Option', onItemClick, icon: <CheckCircleIcon /> },
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

test('renders dropdown toggle', () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle).toBeInTheDocument();
});

test('dropdown toggle has an id', () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle.id).toBeDefined();
});

test('dropdown toggle accepts a custom id', () => {
  const { getByRole } = render(
    <Dropdown items={[{ content: 'Option', onItemClick }]} toggle={<Button id="testId">Button</Button>} />,
  );
  const toggle = getByRole('button');

  expect(toggle.id).toBe('testId');
});

test('dropdown toggle has aria-haspopup', () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  expect(toggle.getAttribute('aria-haspopup')).toBe('listbox');
});

test('dropdown toggle has aria-expanded when dropdown menu is open', () => {
  const { getByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);

  expect(toggle.getAttribute('aria-expanded')).toBe('true');
});

test('renders the dropdown menu closed', () => {
  const { queryByRole } = render(DropdownMock);

  expect(queryByRole('listbox')).not.toBeVisible();
});

test('opens/closes dropdown menu when toggle is clicked', () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).toBeEmpty();
});

test('dropdown menu has aria-activedescendant', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  expect(getByRole('listbox').getAttribute('aria-activedescendant')).toBe(options[0].id);
});

test('dropdown menu should have 4 dropdown items', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  expect(options.length).toBe(4);
});

test('should accept a maxHeight prop', () => {
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
});

test('should default max-height to 250', () => {
  const { getByRole } = render(DropdownMock);

  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const list = getByRole('listbox');
  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('dropdown items should immediately rerender when prop changes', () => {
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
});

test('first dropdown item should be selected when dropdown is opened', () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const option = getAllByRole('option')[0];
  expect(option.getAttribute('aria-selected')).toBe('true');
});

test('up/down arrows should change dropdown item selection', () => {
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
});

test('esc should close menu', () => {
  const { getByRole, queryByRole } = render(DropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.keyDown(getByRole('listbox'), { key: 'Escape' });
  expect(queryByRole('listbox')).toBeEmpty();
});

test('blurring list should close menu', () => {
  const { getByRole, queryByRole } = render(
    <Fragment>
      {DropdownMock}
      <input type="text" />
    </Fragment>,
  );
  const toggle = getByRole('button');

  fireEvent.click(toggle);
  expect(queryByRole('listbox')).not.toBeEmpty();

  fireEvent.blur(getByRole('listbox'));
  expect(queryByRole('listbox')).toBeEmpty();
});

test('home should select first dropdown item', () => {
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
});

test('end should select last dropdown item', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'End' });
  expect(options[3].getAttribute('aria-selected')).toBe('true');
  expect(menu.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should toggle onItemClick', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(menu, { key: 'Enter' });
  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option', onItemClick });
});

test('clicking on dropdown items should toggle onItemClick', () => {
  const { getAllByRole, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  fireEvent.click(options[1]);
  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option', onItemClick });
});

test('dropdown items should be highlighted when moused over', () => {
  const { getByRole, getAllByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = getAllByRole('option');
  fireEvent.mouseOver(options[0]);

  expect(options[0].getAttribute('aria-selected')).toBe('true');
});

test('dropdown menu renders 4 link when passed options of type link', () => {
  const { container, getByRole } = render(
    <Dropdown
      items={[
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
        { content: 'Option', url: '#', type: 'link' },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const options = container.querySelectorAll('a');
  expect(options.length).toBe(4);

  options.forEach(option => {
    expect(option.getAttribute('href')).toBe('#');
  });
});

test('items renders icons', () => {
  const { container, getByRole } = render(DropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const svg = container.querySelectorAll('svg');
  expect(svg.length).toBe(1);
});

test('does not forward styles', () => {
  const { container, getByRole } = render(
    <Dropdown className="test" style={{ background: 'red' }} items={[]} toggle={<Button>Button</Button>} />,
  );

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(getByRole('listbox')).not.toHaveStyle('background: red');
});

test('renders tooltip with disabled item', () => {
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
});

test("doesn't render tooltip on enabled item", () => {
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
});

test('no errors expected if all options are disabled', () => {
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
  expect(() => {
    fireEvent.click(toggle);
  }).not.toThrow();
});

test('dropdown should have 2 group labels, render uppercased', () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');
});

test('group labels are grayed out', () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  const label2 = getByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');
});

test('group labels are skipped over when using keyboard to navigate options', () => {
  const { getAllByRole, getByRole } = render(GroupedDropdownMock);
  const toggle = getByRole('button');

  fireEvent.click(toggle);

  const menu = getByRole('listbox');
  const options = getAllByRole('option');

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  fireEvent.keyDown(menu, { key: 'ArrowDown' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');
});

test('clicking label does not call onItemClick', () => {
  const { getByRole, getByText } = render(GroupedDropdownMock);
  const toggle = getByRole('button');
  fireEvent.click(toggle);

  const label1 = getByText('Label 1');
  fireEvent.mouseOver(label1);
  fireEvent.click(label1);

  expect(onItemClick).not.toHaveBeenCalled();
});
