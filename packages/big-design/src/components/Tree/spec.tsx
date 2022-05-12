import { theme } from '@bigcommerce/big-design-theme';
import React from 'react';

import { act, fireEvent, render, RenderResult, waitFor } from '@test/utils';

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

test('renders simple tree', () => {
  const { container } = renderDefaultTree();

  expect(container.firstChild).toMatchSnapshot();
});

test('does not forward styles', () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { container } = renderDefaultTree({ className: 'test', style: { background: 'red' } });

  expect(container.getElementsByClassName('test')).toHaveLength(0);
  expect(container.firstChild).not.toHaveStyle('background: red');
});

test('expands node on click', () => {
  const { getByText, expandable: testExapandable } = renderDefaultTree();
  const firstTreeNode = getByText('Test Node 0');

  act(() => {
    fireEvent.click(firstTreeNode);
  });

  expect(testExapandable.onToggle).toHaveBeenCalledWith('0', false);
});

test('calles onKeyDown event', async () => {
  const { getByText, onKeyDown: testOnKeyDown } = renderDefaultTree();
  const firstTreeNode = getByText('Test Node 0').parentElement?.parentElement;

  if (firstTreeNode) {
    act(() => {
      fireEvent.keyDown(firstTreeNode);
    });
  }

  await waitFor(() => expect(testOnKeyDown).toHaveBeenCalledTimes(1));
});

test('renders with no icons', () => {
  const { container } = renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    iconless: true,
  });

  expect(container.querySelector('svg')).not.toBeInTheDocument();
});

test('renders node with custom icon', () => {
  const { getByTestId } = renderDefaultTree({
    nodes: [{ id: '0', icon: <span data-testid="test-id" />, label: 'Test Node 0' }],
  });

  expect(getByTestId('test-id')).toBeInTheDocument();
});

test('iconless renders without custom icons', () => {
  const { queryByTestId } = renderDefaultTree({
    nodes: [{ id: '0', icon: <span data-testid="test-id" />, label: 'Test Node 0' }],
    iconless: true,
  });

  expect(queryByTestId('test-id')).not.toBeInTheDocument();
});

test('renders radio select', () => {
  const { container } = renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'radio' },
  });

  const radio = container.querySelector('label');

  expect(radio).toBeInTheDocument();
  expect(radio).toHaveStyle(`border-radius: ${theme.borderRadius.circle}`);
});

test('renders multiselect buttons', () => {
  const { container } = renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'multi' },
  });

  const multi = container.querySelector('label');

  expect(multi).toBeInTheDocument();
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
  }

  expect(onSelect).toHaveBeenCalledWith('0', 0);
});

test('renders expanded nodes', () => {
  const { getByText } = renderDefaultTree({
    expandable: { expandedNodes: ['0', '5'], onExpand: jest.fn() },
  });

  expect(getByText('Test Node 5')).toBeVisible();
  expect(getByText('Test Node 6')).not.toBeVisible();
  expect(getByText('Test Node 9')).toBeVisible();
});

test("disabled nodes don't trigger onSelect", async () => {
  const onSelect = jest.fn();
  const { container } = renderDefaultTree({
    nodes: [{ id: '0', value: 0, label: 'Test Node 0' }],
    selectable: { type: 'multi', onSelect },
    disabledNodes: ['0'],
  });

  const multi = container.querySelector('label');

  if (multi) {
    fireEvent.click(multi);
  }

  await waitFor(() => expect(onSelect).not.toHaveBeenCalled());
});

test('triggers onNodeClick', () => {
  const onNodeClick = jest.fn();
  const { getByText } = renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    onNodeClick,
  });

  fireEvent.click(getByText('Test Node 0'));

  expect(onNodeClick).toHaveBeenCalledTimes(1);
});

test('clicking node triggers onFocus', () => {
  const onFocus = jest.fn();
  const { getByText } = renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0' }],
    focusable: { focusedNode: '', onFocus },
  });

  fireEvent.click(getByText('Test Node 0'));

  expect(onFocus).toHaveBeenCalledTimes(1);
});

test('collapsing node triggers onCollapse', () => {
  const onCollapse = jest.fn();
  const { getByText } = renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0', children: [{ id: '1', label: 'Test Node 1' }] }],
    expandable: { expandedNodes: ['0'], onCollapse },
  });

  fireEvent.click(getByText('Test Node 0'));

  expect(onCollapse).toHaveBeenCalledWith('0');
});

test('expanding node triggers onExpand', async () => {
  const onExpand = jest.fn();
  const { getByText } = renderDefaultTree({
    nodes: [{ id: '0', label: 'Test Node 0', children: [{ id: '1', label: 'Test Node 1' }] }],
    expandable: { expandedNodes: [], onExpand },
  });

  act(() => {
    fireEvent.click(getByText('Test Node 0'));
  });

  await waitFor(() => expect(onExpand).toHaveBeenCalledWith('0'));
});
