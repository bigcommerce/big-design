import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { StatefulTree, StatefulTreeProps, TreeNodeProps } from '.';

const nodes: Array<TreeNodeProps<number>> = [
  {
    id: '0',
    value: 0,
    label: 'Test Node 0',
    children: [
      {
        id: '5',
        value: 5,
        label: 'Test Node 5',
        children: [{ id: '9', value: 9, label: 'Test Node 9' }],
      },
    ],
  },
  {
    id: '1',
    value: 1,
    label: 'Test Node 1',
    children: [{ id: '6', value: 6, label: 'Test Node 6' }],
  },
  { id: '2', value: 2, label: 'Test Node 2' },
  {
    id: '3',
    value: 3,
    label: 'Test Node 3',
    children: [{ id: '7', value: 7, label: 'Test Node 7' }],
  },
  {
    id: '4',
    value: 4,
    label: 'Test Node 4',
    children: [{ id: '8', value: 8, label: 'Test Node 8' }],
  },
];

const parentNodes = ['0', '1', '3', '4', '5'];

const getSimpleTree = (props: Partial<StatefulTreeProps<number>> = {}) => (
  <StatefulTree nodes={nodes} {...props} />
);

test('renders non-selectable Tree by default', () => {
  render(getSimpleTree({ defaultExpanded: parentNodes }));

  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  expect(screen.getAllByRole('treeitem')).toHaveLength(10);
});

test('defaultExpanded items are expanded by default', () => {
  render(getSimpleTree({ defaultExpanded: ['0'] }));

  expect(screen.getAllByRole('treeitem')).toHaveLength(6);
  expect(screen.getByText('Test Node 5')).toBeVisible();
  expect(screen.queryByText('Test Node 6')).not.toBeInTheDocument();
});

test('onExpandedChange gets called when an item expansion happens', () => {
  const onExpandedChange = jest.fn();

  render(getSimpleTree({ onExpandedChange }));

  fireEvent.click(screen.getByText('Test Node 0'));

  expect(onExpandedChange).toHaveBeenCalledWith(['0']);

  fireEvent.click(screen.getByText('Test Node 0'));

  expect(onExpandedChange).toHaveBeenCalledWith([]);
});

test('onNodeClick gets called when an item click happens', () => {
  const onNodeClick = jest.fn();

  render(getSimpleTree({ onNodeClick }));

  fireEvent.click(screen.getByText('Test Node 0'));

  expect(onNodeClick).toHaveBeenCalledTimes(1);
});

describe('selectable = multi', () => {
  test('renders nodes with checkboxes', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'multi', defaultExpanded: parentNodes }),
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const checkboxes = container.querySelectorAll('label[aria-hidden="true"]');

    expect(checkboxes).toHaveLength(10);
    expect(checkboxes[0]).toHaveStyle(`border-radius: ${theme.borderRadius.normal}`);
  });

  test('no items are selected by default', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'multi', defaultExpanded: parentNodes }),
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const checkboxes = container.querySelectorAll('label[aria-hidden="true"]');

    expect(checkboxes).toHaveLength(10);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('defaultSelected items are selected by default', () => {
    render(
      getSimpleTree({
        selectable: 'multi',
        defaultSelected: ['0', '6'],
        defaultExpanded: parentNodes,
      }),
    );

    const selectedNodes = screen.getAllByRole('treeitem', { selected: true });
    const deselectedNodes = screen.getAllByRole('treeitem', { selected: false });

    expect(selectedNodes).toHaveLength(2);
    expect(deselectedNodes).toHaveLength(8);
  });

  test('onSelectionChange gets called when an item selection happens', () => {
    const onSelectionChange = jest.fn();

    const { container } = render(getSimpleTree({ selectable: 'multi', onSelectionChange }));

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const checkboxes = container.querySelectorAll('label[aria-hidden="true"]');

    fireEvent.click(checkboxes[0]);

    expect(onSelectionChange).toHaveBeenCalledWith([0]);
  });
});

describe('selectable = radio', () => {
  test('renders nodes with radios', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'radio', defaultExpanded: parentNodes }),
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const radios = container.querySelectorAll('label[aria-hidden="true"]');

    expect(radios).toHaveLength(10);
    expect(radios[0]).toHaveStyle(`border-radius: ${theme.borderRadius.circle}`);
  });

  test('first selectable item is selected by default', () => {
    render(getSimpleTree({ selectable: 'radio', defaultExpanded: parentNodes }));

    const selectedNode = screen.getByRole('treeitem', { selected: true });
    const deselectedNodes = screen.getAllByRole('treeitem', { selected: false });

    expect(selectedNode).toBeInTheDocument();
    expect(deselectedNodes).toHaveLength(9);
  });

  test('defaultSelected item is selected by default', () => {
    render(
      getSimpleTree({ selectable: 'radio', defaultSelected: ['2'], defaultExpanded: parentNodes }),
    );

    const selectedNode = screen.getByRole('treeitem', { selected: true });
    const deselectedNodes = screen.getAllByRole('treeitem', { selected: false });

    expect(selectedNode).toBeInTheDocument();
    expect(selectedNode?.textContent).toBe('Test Node 2');
    expect(deselectedNodes).toHaveLength(9);
  });

  test('first defaultSelected item is selected by default from list', () => {
    render(
      getSimpleTree({
        selectable: 'radio',
        defaultSelected: ['2', '6'],
        defaultExpanded: parentNodes,
      }),
    );

    const selectedNode = screen.getByRole('treeitem', { selected: true });
    const deselectedNodes = screen.getAllByRole('treeitem', { selected: false });

    expect(selectedNode).toBeInTheDocument();
    expect(selectedNode?.textContent).toBe('Test Node 2');
    expect(deselectedNodes).toHaveLength(9);
  });

  test('onSelectionChange gets called when an item selection happens', () => {
    const onSelectionChange = jest.fn();

    const { container } = render(getSimpleTree({ selectable: 'radio', onSelectionChange }));

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const radios = container.querySelectorAll('label[aria-hidden="true"]');

    fireEvent.click(radios[0]);

    expect(onSelectionChange).toHaveBeenCalledWith([0]);
  });
});

test('should focus on TreeItem on arrow down', async () => {
  render(getSimpleTree());

  const node0 = await screen.findByRole('treeitem', { name: 'Test Node 0' });
  const node1 = await screen.findByRole('treeitem', { name: 'Test Node 1' });

  await userEvent.tab();

  expect(node0).toHaveFocus();
  expect(node1).not.toHaveFocus();

  await userEvent.keyboard('{ArrowDown}');

  expect(node0).not.toHaveFocus();
  expect(node1).toHaveFocus();
});
