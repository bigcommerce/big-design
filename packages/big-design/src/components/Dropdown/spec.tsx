import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import { remCalc } from '@bigcommerce/big-design-theme';
import React from 'react';
import 'jest-styled-components';

import { act, fireEvent, render, screen } from '@test/utils';

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
  render(<Dropdown items={[{ content: 'Option', onItemClick }]} toggle={<Button id="testId">Button</Button>} />);

  const toggle = screen.getByRole('button');

  expect(toggle.id).toBe('testId');
});

test('dropdown toggle has aria-haspopup', () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  expect(toggle.getAttribute('aria-haspopup')).toBe('listbox');
});

test('dropdown toggle has aria-expanded when dropdown menu is open', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  await act(async () => {
    fireEvent.click(toggle);
  });

  expect(toggle.getAttribute('aria-expanded')).toBe('true');
});

test('renders the dropdown menu closed', async () => {
  render(DropdownMock);

  const list = await screen.findByRole('listbox');

  expect(list).toBeEmptyDOMElement();
});

test('opens/closes dropdown menu when toggle is clicked', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');

  expect(list).not.toBeEmptyDOMElement();

  fireEvent.click(toggle);

  await screen.findByRole('listbox');

  expect(list).toBeEmptyDOMElement();
});

test('dropdown menu has aria-activedescendant', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  expect(list.getAttribute('aria-activedescendant')).toBe(options[0].id);
});

test('dropdown menu should have 4 dropdown items', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  expect(options.length).toBe(4);
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

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(350));
});

test('should default max-height to 250', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');

  expect(list).toHaveStyleRule('max-height', remCalc(250));
});

test('dropdown items should immediately rerender when prop changes', async () => {
  const { rerender } = render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  let options = await screen.findAllByRole('option');

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

  options = await screen.findAllByRole('option');

  expect(options.length).toBe(2);
});

test('first dropdown item should be selected when dropdown is opened', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  expect(options[0].getAttribute('aria-selected')).toBe('true');
});

test('up/down arrows should change dropdown item selection', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  fireEvent.keyDown(list, { key: 'ArrowDown' });

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(list, { key: 'ArrowUp' });

  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(list, { key: 'ArrowUp' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');
});

test('esc should close menu', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');

  expect(list).not.toBeEmptyDOMElement();

  fireEvent.keyDown(list, { key: 'Escape' });

  await screen.findByRole('listbox');

  expect(list).toBeEmptyDOMElement();
});

test('home should select first dropdown item', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  fireEvent.keyDown(list, { key: 'ArrowDown' });
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  fireEvent.keyDown(list, { key: 'ArrowDown' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(list, { key: 'Home' });

  expect(options[0].getAttribute('aria-selected')).toBe('true');
  expect(list.getAttribute('aria-activedescendant')).toEqual(options[0].id);
});

test('end should select last dropdown item', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  expect(options[0].getAttribute('aria-selected')).toBe('true');

  fireEvent.keyDown(list, { key: 'End' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');
  expect(list.getAttribute('aria-activedescendant')).toEqual(options[3].id);
});

test('enter should toggle onItemClick', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  fireEvent.keyDown(list, { key: 'ArrowDown' });

  expect(options[1].getAttribute('aria-selected')).toBe('true');

  await act(async () => {
    fireEvent.keyDown(list, { key: 'Enter' });
  });

  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
});

test('clicking on dropdown items should toggle onItemClick', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  await act(async () => {
    fireEvent.click(options[1]);
  });

  expect(onItemClick).toHaveBeenCalledWith({ content: 'Option 2', onItemClick });
});

test('dropdown items should be highlighted when moused over', async () => {
  render(DropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const options = await screen.findAllByRole('option');

  fireEvent.mouseOver(options[0]);

  expect(options[0].getAttribute('aria-selected')).toBe('true');
});

test('dropdown menu renders 4 link when passed options of type link', async () => {
  const { container } = render(
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
    fireEvent.click(toggle);
  });

  const options = container.querySelectorAll('a');

  expect(options.length).toBe(4);

  options.forEach((option) => {
    expect(option.getAttribute('href')).toBe('#');
  });
});

test('items renders icons', async () => {
  const { container } = render(DropdownMock);

  const toggle = screen.getByRole('button');

  await act(async () => {
    fireEvent.click(toggle);
  });

  const svg = container.querySelectorAll('svg');

  expect(svg.length).toBe(1);
});

test('does not forward styles', async () => {
  const { container } = render(
    <Dropdown
      className="test"
      style={{ background: 'red' }}
      items={[{ content: 'Option 1', url: '#', type: 'link' }]}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  await act(async () => {
    fireEvent.click(toggle);
  });

  expect(container.getElementsByClassName('test').length).toBe(0);
  expect(await screen.findByRole('listbox')).not.toHaveStyle('background: red');
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

  const tooltip = screen.getByText(tooltipContent);

  await act(async () => {
    fireEvent.mouseEnter(tooltip);
  });

  expect(await screen.queryByText(tooltipText)).not.toBeInTheDocument();
});

test('no errors expected if all options are disabled', () => {
  render(
    <Dropdown
      items={[
        { content: 'Option 1', onItemClick, disabled: true },
        { content: 'Option 2', onItemClick, disabled: true },
      ]}
      toggle={<Button>Button</Button>}
    />,
  );

  const toggle = screen.getByRole('button');

  expect(
    async () =>
      await act(async () => {
        fireEvent.click(toggle);
      }),
  ).not.toThrow();
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

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const options = await screen.findAllByRole('option');

  fireEvent.keyDown(list, { key: 'ArrowDown' });
  fireEvent.keyDown(list, { key: 'ArrowDown' });
  fireEvent.keyDown(list, { key: 'ArrowDown' });

  expect(options[3].getAttribute('aria-selected')).toBe('true');
});

test('clicking label does not call onItemClick', async () => {
  render(GroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const label1 = await screen.findByText('Label 1');

  await act(async () => {
    fireEvent.mouseOver(label1);
    fireEvent.click(label1);
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

  const list = await screen.findByRole('listbox');
  const listItems = list.querySelectorAll('li');

  expect(listItems.length).toBe(3);
});

test('rendered line separators have correct accessibility properties', async () => {
  render(LineSeparatedGroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const hrListItems = list.querySelectorAll('hr');

  expect(hrListItems[0].parentElement && hrListItems[0].parentElement.getAttribute('aria-hidden')).toBe('true');
  expect(hrListItems[0].parentElement && hrListItems[0].parentElement.getAttribute('tabindex')).toBe('-1');
});

test('rendered line separators cannot be focused on', async () => {
  render(LineSeparatedGroupedDropdownMock);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  const list = await screen.findByRole('listbox');
  const hrListItems = list.querySelectorAll('hr');

  fireEvent.mouseOver(hrListItems[0].parentElement as HTMLElement);

  expect(document.activeElement).not.toEqual(hrListItems[0].parentElement);
});

test('items should supports description', async () => {
  render(DropdownWithItemsDescriptions);

  const toggle = screen.getByRole('button');

  fireEvent.click(toggle);

  expect(await screen.findByText('Option 1 Description')).toBeInTheDocument();
});
