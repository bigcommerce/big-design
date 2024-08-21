import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { Tree } from './Tree';
import { TreeExpandable, TreeFocusable, TreeNodeProps, TreeOnKeyDown, TreeProps } from './types';

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
  { id: '2', value: 2, label: 'Category' },
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

let expandable: TreeExpandable;
let focusable: TreeFocusable;
let onKeyDown: TreeOnKeyDown<unknown>;

beforeEach(() => {
  expandable = { expandedNodes: [], onToggle: jest.fn() };
  focusable = { focusedNode: '', onFocus: jest.fn() };
  onKeyDown = jest.fn();
});

const renderDefaultTree = (
  additionalProps?: Partial<TreeProps<unknown>>,
): RenderResult & {
  expandable: TreeExpandable;
  focusable: TreeFocusable;
  onKeyDown: TreeOnKeyDown<unknown>;
} => {
  const rendered = render(
    <Tree
      expandable={expandable}
      focusable={focusable}
      nodes={nodes}
      onKeyDown={onKeyDown}
      {...additionalProps}
    />,
  );

  return {
    ...rendered,
    expandable,
    focusable,
    onKeyDown,
  };
};

test('renders simple tree', async () => {
  renderDefaultTree();

  const tree = await screen.findByRole('tree');

  expect(tree).toMatchSnapshot();
});

test('does not forward styles', async () => {
  // eslint-disable-next-line
  // @ts-ignore
  renderDefaultTree({ className: 'test', style: { background: 'red' } });

  const tree = await screen.findByRole('tree');

  expect(tree).not.toHaveClass('test');
  expect(tree.getElementsByClassName('test')).toHaveLength(0);
  expect(tree).not.toHaveStyle('background: red');
});

test('expands node on click', async () => {
  const { expandable } = renderDefaultTree();
  const firstTreeNode = await screen.findByText('Test Node 0');

  await userEvent.click(firstTreeNode);

  expect(expandable.onToggle).toHaveBeenCalledWith('0', false);
});

test('calles onKeyDown event', async () => {
  const { onKeyDown } = renderDefaultTree();
  const firstTreeNode = await screen.findByRole('treeitem', { name: 'Test Node 0' });

  await userEvent.type(firstTreeNode, '{Enter}');

  expect(onKeyDown).toHaveBeenCalledWith(
    expect.anything(),
    expect.objectContaining({
      id: '0',
    }),
  );
});

test('renders with no icons', async () => {
  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    iconless: true,
  });

  const tree = await screen.findByRole('tree');

  expect(tree.querySelector('svg')).not.toBeInTheDocument();
});

test('renders node with custom icon', async () => {
  renderDefaultTree({
    nodes: [{ id: '0', icon: <span data-testid="test-id" />, label: 'Test Node 0' }],
  });

  const icon = await screen.findByTestId('test-id');

  expect(icon).toBeInTheDocument();
});

test('iconless renders without custom icons', () => {
  renderDefaultTree({
    nodes: [{ id: '0', icon: <span data-testid="test-id" />, label: 'Test Node 0' }],
    iconless: true,
  });

  const icon = screen.queryByTestId('test-id');

  expect(icon).not.toBeInTheDocument();
});

test('renders radio select', async () => {
  renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'radio' },
  });

  const tree = await screen.findByRole('tree');
  const radio = tree.querySelector('label');

  expect(tree).toHaveAttribute('aria-multiselectable', 'false');
  expect(radio).toHaveStyle(`border-radius: ${theme.borderRadius.circle}`);
});

test('renders multiselect buttons', async () => {
  renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'multi' },
  });

  const tree = await screen.findByRole('tree');
  const multi = tree.querySelector('label');

  expect(tree).toHaveAttribute('aria-multiselectable', 'true');
  expect(multi).toHaveStyle(`border-radius: ${theme.borderRadius.normal}`);
});

test('trigger onSelect', () => {
  const onSelect = jest.fn();
  const { container } = renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'multi', onSelect },
  });

  const multi = container.querySelector('label');

  if (multi) {
    fireEvent.click(multi);

    expect(onSelect).toHaveBeenCalledWith('0', 0);
  }
});

test('renders expanded nodes', () => {
  renderDefaultTree({
    expandable: { expandedNodes: ['0', '5'], onExpand: jest.fn() },
  });

  const node5 = screen.getByText('Test Node 5');
  const node6 = screen.getByText('Test Node 6');
  const node9 = screen.getByText('Test Node 9');

  expect(node5).toBeVisible();
  expect(node6).not.toBeVisible();
  expect(node9).toBeVisible();
});

test("disabled nodes don't trigger onSelect", async () => {
  const onSelect = jest.fn();

  renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'multi', onSelect },
    disabledNodes: ['0'],
  });

  const tree = await screen.findByRole('tree');
  const multi = tree.querySelector('label');

  if (multi) {
    fireEvent.click(multi);

    expect(onSelect).not.toHaveBeenCalled();
  }
});

test('triggers onNodeClick', async () => {
  const onNodeClick = jest.fn();

  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    onNodeClick,
  });

  const node = await screen.findByText('Test Node 0');

  await userEvent.click(node);

  expect(onNodeClick).toHaveBeenCalledTimes(1);
});

test('clicking node triggers onFocus', async () => {
  const onFocus = jest.fn();

  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    focusable: { focusedNode: '', onFocus },
  });

  const node = await screen.findByText('Test Node 0');

  await userEvent.click(node);

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test('collapsing node triggers onCollapse', async () => {
  const onCollapse = jest.fn();

  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0', children: [{ id: '1', label: 'Test Node 1' }] }],
    expandable: { expandedNodes: ['0'], onCollapse },
  });

  const node = await screen.findByText('Test Node 0');

  await userEvent.click(node);

  expect(onCollapse).toHaveBeenCalledWith('0');
});

test('expanding node triggers onExpand', async () => {
  const onExpand = jest.fn();

  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0', children: [{ id: '1', label: 'Test Node 1' }] }],
    expandable: { expandedNodes: [], onExpand },
  });

  const node = await screen.findByText('Test Node 0');

  await userEvent.click(node);

  expect(onExpand).toHaveBeenCalledWith('0');
});

test('should focus when tabbed on', async () => {
  renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    focusable: { focusedNode: '0', onFocus: jest.fn() },
  });

  const node = await screen.findByRole('treeitem');

  expect(node).not.toHaveFocus();

  await userEvent.tab();

  expect(node).toHaveFocus();
});
