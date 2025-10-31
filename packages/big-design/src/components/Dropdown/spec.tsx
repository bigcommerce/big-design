import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import 'jest-styled-components';

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

test('renders dropdown toggle', () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  expect(toggle).toBeInTheDocument();
});

test('dropdown toggle has an id', () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  expect(toggle.id).toBeDefined();
});

test('dropdown toggle accepts a custom id', () => {
  render(
    <Dropdown
      items={[{ content: 'Option', onItemClick }]}
      toggle={<Button id="testId">Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  expect(toggle.id).toBe('testId');
});

test('dropdown toggle has aria-haspopup', () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  expect(toggle).toHaveAttribute('aria-haspopup', 'menu');
});

test('dropdown toggle has aria-expanded when dropdown menu is open', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});

test('renders the dropdown menu closed', () => {
  render(DropdownMock);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('opens/closes dropdown menu when toggle is clicked', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const list = await screen.findByRole('menu');

  expect(list).not.toBeEmptyDOMElement();

  await userEvent.click(toggle);

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('dropdown menu has aria-activedescendant', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('dropdown menu should have 4 dropdown items', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  expect(options).toHaveLength(4);
});

test('should accept a maxHeight prop', async () => {
  render(
    <Dropdown
      items={[
        { content: 'Foo', onItemClick },
        { content: 'Bar', onItemClick },
      ]}
      maxHeight={350}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');

  expect(list).toHaveStyleRule('max-height', remCalc(350));
});

test('should default max-height to 250', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');

  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('dropdown items should immediately rerender when prop changes', async () => {
  const { rerender } = render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  let options = await screen.findAllByRole('option');

  expect(options).toHaveLength(4);

  rerender(
    <Dropdown
      items={[
        { content: 'Foo', onItemClick },
        { content: 'Bar', onItemClick },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  options = await screen.findAllByRole('option');

  expect(options).toHaveLength(2);
});

test('first dropdown item should be selected when dropdown is opened', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('up/down arrows should change dropdown item selection', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);

  await userEvent.keyboard('{ArrowDown}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[1].id);

  await userEvent.keyboard('{ArrowUp}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);

  await userEvent.keyboard('{ArrowUp}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[3].id);

  await userEvent.keyboard('{ArrowDown}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('esc should close menu', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  await screen.findByRole('menu');

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});

test('home should select first dropdown item', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[3].id);

  await userEvent.keyboard('{Home}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('end should select last dropdown item', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);

  await userEvent.keyboard('{End}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[3].id);
});

test('enter should toggle onItemClick', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  await userEvent.keyboard('{ArrowDown}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[1].id);

  await userEvent.keyboard('{Enter}');

  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
});

test('clicking on dropdown items should toggle onItemClick', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  await userEvent.click(options[1]);

  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
});

test('dropdown items should be highlighted when moused over', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  fireEvent.mouseOver(options[0]);

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('first dropdown item should be highlighted if invalid selectedItem', async () => {
  render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick },
        { content: 'Option 2', onItemClick },
        { content: 'Option 3', onItemClick, actionType: 'destructive' },
        { content: 'Option 4', onItemClick, icon: <CheckCircleIcon /> },
      ]}
      selectedItem={{ content: 'Option 5', onItemClick }}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);
});

test('dropdown menu renders 4 link when passed options of type link', async () => {
  render(
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

  const toggle = screen.getByRole('button');

  await act(async () => {
    await fireEvent.click(toggle);
  });

  const list = await screen.findByRole('menu');
  const options = list.querySelectorAll('a');

  expect(options).toHaveLength(4);

  options.forEach((option) => {
    expect(option).toHaveAttribute('href', '#');
  });
});

test('items renders icons', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');

  const svgs = list.querySelectorAll('svg');

  expect(svgs).toHaveLength(1);
});

test('does not forward styles', async () => {
  render(
    <Dropdown
      className="test"
      items={[{ content: 'Option 1', url: '#', type: 'link' }]}
      style={{ background: 'red' }}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');

  expect(list.getElementsByClassName('test')).toHaveLength(0);
  expect(list).not.toHaveStyle('background: red');
});

test('renders tooltip with disabled item', async () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';

  render(
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

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const tooltip = screen.getByText(tooltipContent);

  fireEvent.mouseEnter(tooltip);

  expect(await screen.findByText(tooltipText)).toBeInTheDocument();
});

test("doesn't render tooltip on enabled item", async () => {
  const tooltipContent = 'Option with tooltip';
  const tooltipText = 'This is tooltip message';

  render(
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

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const tooltip = await screen.findByText(tooltipContent);

  fireEvent.mouseEnter(tooltip);

  const tooltipHelpText = screen.queryByText(tooltipText);

  expect(tooltipHelpText).not.toBeInTheDocument();
});

test('no errors expected if all options are disabled', async () => {
  const onError = jest.fn();

  render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick, disabled: true },
        { content: 'Option 2', onItemClick, disabled: true },
      ]}
      onError={onError}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  await screen.findByRole('menu');

  expect(onError).not.toThrow();
});

test('dropdown should have 2 group labels, render uppercased', async () => {
  render(GroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const label1 = await screen.findByText('Label 1');
  const label2 = await screen.findByText('Label 2');

  expect(label1).toBeInTheDocument();
  expect(label1).toHaveStyle('text-transform: uppercase');
  expect(label2).toBeInTheDocument();
  expect(label2).toHaveStyle('text-transform: uppercase');
});

test('group labels are grayed out', async () => {
  render(GroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const label1 = await screen.findByText('Label 1');
  const label2 = await screen.findByText('Label 2');

  expect(label1).toHaveStyle('color: #8C93AD');
  expect(label2).toHaveStyle('color: #8C93AD');
});

test('group labels are skipped over when using keyboard to navigate options', async () => {
  render(GroupedDropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  const options = screen.getAllByRole('option');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[0].id);

  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{ArrowDown}');

  expect(toggle).toHaveAttribute('aria-activedescendant', options[3].id);
});

test('clicking label does not call onItemClick', async () => {
  render(GroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const label1 = await screen.findByText('Label 1');

  await act(async () => {
    await fireEvent.mouseOver(label1);
    await fireEvent.click(label1);
  });

  expect(onItemClick).not.toHaveBeenCalled();
});

test('renders appropriate amount of list items', async () => {
  render(
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

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');
  const listItems = list.querySelectorAll('li');

  expect(listItems).toHaveLength(3);
});

test('rendered line separators have correct accessibility properties', async () => {
  render(LineSeparatedGroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');
  const hrListItems = list.querySelectorAll('hr');

  expect(hrListItems[0]?.parentElement?.getAttribute('aria-hidden')).toBe('true');
  expect(hrListItems[0]?.parentElement?.getAttribute('tabindex')).toBe('-1');
});

test('rendered line separators cannot be focused on', async () => {
  render(LineSeparatedGroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('menu');
  const hrListItems = list.querySelectorAll('hr');

  if (hrListItems.length && hrListItems[0].parentElement) {
    const el: HTMLElement = hrListItems[0].parentElement;

    fireEvent.mouseOver(el);
  }

  expect(hrListItems[0].parentElement).not.toHaveFocus();
});

test('items should supports description', async () => {
  render(DropdownWithItemsDescriptions);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const description = await screen.findByText('Option 1 Description');

  expect(description).toBeInTheDocument();
});

test("dropdown toggle doesn't trigger onItemClick", async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await userEvent.click(toggle);

  expect(onItemClick).not.toHaveBeenCalled();

  await userEvent.click(document.body);

  expect(onItemClick).not.toHaveBeenCalled();
});
