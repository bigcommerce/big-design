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

const getSimpleTree = (props: Partial<StatefulTreeProps<number>> = {}) => (
  <StatefulTree nodes={nodes} {...props} />
);

test('renders non-selectable Tree by default', () => {
  const { container, getAllByRole } = render(getSimpleTree());

  expect(container.querySelectorAll('label')).toHaveLength(0);
  expect(getAllByRole('treeitem', { hidden: true })).toHaveLength(10);
});

test('defaultExpanded items are expanded by default', () => {
  const { getAllByRole, getByText } = render(getSimpleTree({ defaultExpanded: ['0'] }));

  expect(getAllByRole('treeitem')).toHaveLength(6);
  expect(getByText('Test Node 5')).toBeVisible();
  expect(getByText('Test Node 6')).not.toBeVisible();
});

test('onExpandedChange gets called when an item expansion happens', () => {
  const onExpandedChange = jest.fn();
  const { getByText } = render(getSimpleTree({ onExpandedChange }));

  fireEvent.click(getByText('Test Node 0'));

  expect(onExpandedChange).toHaveBeenCalledWith(['0']);

  fireEvent.click(getByText('Test Node 0'));

  expect(onExpandedChange).toHaveBeenCalledWith([]);
});

test('onNodeClick gets called when an item click happens', () => {
  const onNodeClick = jest.fn();
  const { getByText } = render(getSimpleTree({ onNodeClick }));

  fireEvent.click(getByText('Test Node 0'));

  expect(onNodeClick).toHaveBeenCalledTimes(1);
});

describe('selectable = multi', () => {
  test('renders nodes with checkboxes', () => {
    const { container } = render(getSimpleTree({ selectable: 'multi' }));

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);
    expect(checkboxes[0]).toHaveStyle(`border-radius: ${theme.borderRadius.normal}`);
  });

  test('no items are selected by default', () => {
    const { container } = render(getSimpleTree({ selectable: 'multi' }));

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  test('defaultSelected items are selected by default', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'multi', defaultSelected: ['0', '6'] }),
    );

    const selectedNodes = container.querySelectorAll('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNodes).toHaveLength(2);
    expect(deselectedNodes).toHaveLength(8);
  });

  test('onSelectionChange gets called when an item selection happens', () => {
    const onSelectionChange = jest.fn();
    const { container } = render(getSimpleTree({ selectable: 'multi', onSelectionChange }));

    const firstNodeLabel = container.querySelectorAll('[role="treeitem"] label')[0];

    if (firstNodeLabel) {
      fireEvent.click(firstNodeLabel);

      expect(onSelectionChange).toHaveBeenCalledWith([0]);
    }
  });
});

describe('selectable = radio', () => {
  test('renders nodes with radios', () => {
    const { container } = render(getSimpleTree({ selectable: 'radio' }));

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);
    expect(checkboxes[0]).toHaveStyle(`border-radius: ${theme.borderRadius.circle}`);
  });

  test('first selectable item is selected by default', () => {
    const { container } = render(getSimpleTree({ selectable: 'radio' }));

    const selectedNode = container.querySelector('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNode).toBeInTheDocument();
    expect(deselectedNodes).toHaveLength(9);
  });

  test('defaultSelected item is selected by default', () => {
    const { container } = render(getSimpleTree({ selectable: 'radio', defaultSelected: ['2'] }));

    const selectedNode = container.querySelector('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNode).toBeInTheDocument();
    expect(selectedNode?.textContent).toBe('Test Node 2');
    expect(deselectedNodes).toHaveLength(9);
  });

  test('first defaultSelected item is selected by default from list', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'radio', defaultSelected: ['2', '6'] }),
    );

    const selectedNode = container.querySelector('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNode).toBeInTheDocument();
    expect(selectedNode?.textContent).toBe('Test Node 2');
    expect(deselectedNodes).toHaveLength(9);
  });

  test('onSelectionChange gets called when an item selection happens', () => {
    const onSelectionChange = jest.fn();
    const { container } = render(getSimpleTree({ selectable: 'radio', onSelectionChange }));

    const firstNodeLabel = container.querySelectorAll('[role="treeitem"] label')[0];

    if (firstNodeLabel) {
      fireEvent.click(firstNodeLabel);

      expect(onSelectionChange).toHaveBeenCalledWith([0]);
    }
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
