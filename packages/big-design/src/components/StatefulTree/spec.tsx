import { theme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { warning } from '../../utils';

import { StatefulTreeBaseProps } from './StatefulTree';

import { StatefulTree, TreeNodeProps } from '.';

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

const getSimpleTree = (props: Partial<StatefulTreeBaseProps<number>> = {}) => (
  <StatefulTree nodes={nodes} {...props} />
);

test('renders non-selectable Tree by default', () => {
  const { container, getAllByRole } = render(getSimpleTree({ defaultExpanded: parentNodes }));

  expect(container.querySelectorAll('label')).toHaveLength(0);
  expect(getAllByRole('treeitem')).toHaveLength(10);
});

test('defaultExpanded items are expanded by default', () => {
  const { getAllByRole } = render(getSimpleTree({ defaultExpanded: ['0'] }));

  expect(getAllByRole('treeitem')).toHaveLength(6);
  expect(screen.getByText('Test Node 5')).toBeVisible();
  expect(screen.queryByText('Test Node 6')).not.toBeInTheDocument();
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
    const { container } = render(
      getSimpleTree({ selectable: 'multi', defaultExpanded: parentNodes }),
    );

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);
    expect(checkboxes[0]).toHaveStyle(`border-radius: ${theme.borderRadius.normal}`);
  });

  test('no items are selected by default', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'multi', defaultExpanded: parentNodes }),
    );

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);

    checkboxes.forEach((checkbox) => {
      expect(checkbox.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  test('defaultSelected items are selected by default', () => {
    const { container } = render(
      getSimpleTree({
        selectable: 'multi',
        defaultSelected: ['0', '6'],
        defaultExpanded: parentNodes,
      }),
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
    const { container } = render(
      getSimpleTree({ selectable: 'radio', defaultExpanded: parentNodes }),
    );

    const checkboxes = container.querySelectorAll('label');

    expect(checkboxes).toHaveLength(10);
    expect(checkboxes[0]).toHaveStyle(`border-radius: ${theme.borderRadius.circle}`);
  });

  test('first selectable item is selected by default', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'radio', defaultExpanded: parentNodes }),
    );

    const selectedNode = container.querySelector('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNode).toBeInTheDocument();
    expect(deselectedNodes).toHaveLength(9);
  });

  test('defaultSelected item is selected by default', () => {
    const { container } = render(
      getSimpleTree({ selectable: 'radio', defaultSelected: ['2'], defaultExpanded: parentNodes }),
    );

    const selectedNode = container.querySelector('[aria-selected="true"]');
    const deselectedNodes = container.querySelectorAll('[aria-selected="false"]');

    expect(selectedNode).toBeInTheDocument();
    expect(selectedNode?.textContent).toBe('Test Node 2');
    expect(deselectedNodes).toHaveLength(9);
  });

  test('first defaultSelected item is selected by default from list', () => {
    const { container } = render(
      getSimpleTree({
        selectable: 'radio',
        defaultSelected: ['2', '6'],
        defaultExpanded: parentNodes,
      }),
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

describe('virtualized', () => {
  const largeNodes: Array<TreeNodeProps<number>> = Array.from({ length: 1000 }, (_, i) => ({
    id: `${i}`,
    value: i,
    label: `Node ${i}`,
  }));

  let originalOffsetHeight: PropertyDescriptor | undefined;
  let originalResizeObserver: typeof globalThis.ResizeObserver | undefined;
  let originalScrollTo: PropertyDescriptor | undefined;

  beforeAll(() => {
    originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      get() {
        return 40;
      },
    });

    originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value(options: ScrollToOptions | number, y?: number) {
        const top = typeof options === 'number' ? (y ?? 0) : (options.top ?? 0);

        if (this.scrollTop === top) {
          return;
        }

        this.scrollTop = top;
        queueMicrotask(() => this.dispatchEvent(new Event('scroll')));
      },
    });

    // jsdom does not implement ResizeObserver; provide one so the virtualizer's
    // element-rect observation path runs like it would in a real browser.
    originalResizeObserver = globalThis.ResizeObserver;

    globalThis.ResizeObserver = class {
      observe() {
        return undefined;
      }
      unobserve() {
        return undefined;
      }
      disconnect() {
        return undefined;
      }
    };
  });

  afterAll(() => {
    if (originalOffsetHeight) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    }

    if (originalScrollTo) {
      Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
    } else {
      Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo');
    }

    globalThis.ResizeObserver = originalResizeObserver!;
  });

  test('renders only a window of nodes for a large tree', () => {
    const { container, getAllByRole } = render(
      <StatefulTree nodes={largeNodes} virtualization={{ maxHeight: 200 }} />,
    );

    const renderedItems = getAllByRole('treeitem');
    const tree = screen.getByRole('tree');

    expect(renderedItems.length).toBeGreaterThan(0);
    expect(renderedItems.length).toBeLessThan(largeNodes.length);
    expect(getComputedStyle(tree).overflowY).toBe('auto');

    expect(container.querySelectorAll('li[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  test('emits explicit ARIA tree attributes on rows', () => {
    const { getAllByRole } = render(
      <StatefulTree nodes={largeNodes} virtualization={{ maxHeight: 200 }} />,
    );

    const [firstItem] = getAllByRole('treeitem');

    expect(firstItem).toHaveAttribute('aria-level', '1');
    expect(firstItem).toHaveAttribute('aria-posinset', '1');
    expect(firstItem).toHaveAttribute('aria-setsize', '1000');
  });

  test('indents nested rows by depth', () => {
    const nestedNodes: Array<TreeNodeProps<number>> = [
      {
        id: 'root',
        value: 0,
        label: 'Root',
        children: [{ id: 'child', value: 1, label: 'Child' }],
      },
    ];

    const { getByRole } = render(
      <StatefulTree
        defaultExpanded={['root']}
        nodes={nestedNodes}
        virtualization={{ maxHeight: 200 }}
      />,
    );

    const child = getByRole('treeitem', { name: 'Child' });

    expect(child).toHaveAttribute('aria-level', '2');
    // Per-level indent is calc((xLarge + xxSmall) * depth); addValues resolves to 1.75rem.
    expect(child).toHaveStyle({ paddingLeft: 'calc(1.75rem * 1)' });
  });

  test('does not render nested group lists when virtualized', () => {
    const { container } = render(
      <StatefulTree
        defaultExpanded={['0']}
        nodes={[
          { id: '0', value: 0, label: 'Parent', children: [{ id: '1', value: 1, label: 'Child' }] },
        ]}
        virtualization={{ maxHeight: 200 }}
      />,
    );

    expect(container.querySelectorAll('ul[role="group"]')).toHaveLength(0);
  });

  test('selection still works in virtualized mode', () => {
    const onSelectionChange = jest.fn();

    const { container } = render(
      <StatefulTree
        nodes={largeNodes}
        onSelectionChange={onSelectionChange}
        selectable="multi"
        virtualization={{ maxHeight: 200 }}
      />,
    );

    const firstNodeLabel = container.querySelectorAll('[role="treeitem"] label')[0];

    fireEvent.click(firstNodeLabel);

    expect(onSelectionChange).toHaveBeenCalledWith([0]);
  });

  test('keyboard navigation moves focus between rows in virtualized mode', async () => {
    const smallNodes: Array<TreeNodeProps<number>> = Array.from({ length: 5 }, (_, i) => ({
      id: `${i}`,
      value: i,
      label: `Node ${i}`,
    }));

    render(<StatefulTree nodes={smallNodes} virtualization={{ maxHeight: 1000 }} />);

    await userEvent.tab();

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');

    expect(screen.getByRole('treeitem', { name: 'Node 1' })).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus();

    await userEvent.keyboard('{End}');

    expect(screen.getByRole('treeitem', { name: 'Node 4' })).toHaveFocus();

    await userEvent.keyboard('{Home}');

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus();
  });

  test('keyboard navigation retargets focus to an off-window node', async () => {
    const { container } = render(
      <StatefulTree nodes={largeNodes} virtualization={{ maxHeight: 200 }} />,
    );
    const tree = screen.getByRole('tree');

    Object.defineProperties(tree, {
      clientHeight: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: largeNodes.length * 40 },
    });

    await userEvent.tab();

    expect(container.querySelector('[role="treeitem"][tabindex="0"]')).toBe(
      screen.getByRole('treeitem', { name: 'Node 0' }),
    );

    await userEvent.keyboard('{End}');

    const lastNode = await screen.findByRole('treeitem', { name: 'Node 999' });

    expect(lastNode).toHaveFocus();
    expect(container.querySelector('[role="treeitem"][tabindex="0"]')).toBe(lastNode);
  });

  test('scrolling a focused row out of view with the mouse does not steal focus back later', async () => {
    render(<StatefulTree nodes={largeNodes} virtualization={{ maxHeight: 200 }} />);

    const tree = screen.getByRole('tree');

    Object.defineProperties(tree, {
      clientHeight: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: largeNodes.length * 40 },
    });

    await userEvent.tab();

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus();

    // Scroll far down via the mouse (not arrow keys), unmounting the focused row.
    tree.scrollTo(0, 4000);

    await waitFor(() =>
      expect(screen.queryByRole('treeitem', { name: 'Node 0' })).not.toBeInTheDocument(),
    );

    // Scroll to a spot that still excludes Node 0 but keeps Node 10 mounted through
    // the next scroll, so clicking it doesn't itself trigger an unmount/remount cycle.
    tree.scrollTo(0, 850);

    await screen.findByRole('treeitem', { name: 'Node 10' });

    const anotherNode = screen.getByRole('treeitem', { name: 'Node 10' });

    await userEvent.click(anotherNode);

    expect(anotherNode).toHaveFocus();

    // Scroll back up so the originally-focused row remounts while Node 10 stays mounted.
    tree.scrollTo(0, 0);

    await screen.findByRole('treeitem', { name: 'Node 0' });

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).not.toHaveFocus();
    expect(anotherNode).toHaveFocus();
  });

  test('falls back to non-virtualized rendering without a valid maxHeight', () => {
    // @ts-expect-error maxHeight is required on virtualization.
    render(<StatefulTree nodes={largeNodes} virtualization={{}} />);

    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining('`virtualization.maxHeight` must be a positive, finite number'),
    );
    expect(screen.getAllByRole('treeitem')).toHaveLength(largeNodes.length);
  });

  test('reassigns the roving tabindex to the first row when the focused node is pruned from nodes entirely', async () => {
    const smallNodes: Array<TreeNodeProps<number>> = Array.from({ length: 5 }, (_, i) => ({
      id: `${i}`,
      value: i,
      label: `Node ${i}`,
    }));

    const { rerender } = render(
      <StatefulTree nodes={smallNodes} virtualization={{ maxHeight: 1000 }} />,
    );

    await userEvent.tab();

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveAttribute('tabindex', '0');

    // Prune the focused node ('0') from `nodes` entirely, rather than merely collapsing
    // an ancestor, so the previously-focused id is genuinely gone from the tree.
    rerender(<StatefulTree nodes={smallNodes.slice(1)} virtualization={{ maxHeight: 1000 }} />);

    const newFirst = await screen.findByRole('treeitem', { name: 'Node 1' });

    expect(newFirst).toHaveAttribute('tabindex', '0');
    expect(screen.queryByRole('treeitem', { name: 'Node 0' })).not.toBeInTheDocument();
  });

  test('an unrelated state change does not snap a manually-scrolled position back to the focused row', async () => {
    render(
      <StatefulTree nodes={largeNodes} selectable="multi" virtualization={{ maxHeight: 200 }} />,
    );

    const tree = screen.getByRole('tree');

    Object.defineProperties(tree, {
      clientHeight: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: largeNodes.length * 40 },
    });

    await userEvent.tab();

    const node0 = screen.getByRole('treeitem', { name: 'Node 0' });

    expect(node0).toHaveFocus();

    // Scroll via mouse wheel (not keyboard) — this does not blur real focus, and
    // Node 0 stays mounted since it's within the overscan window.
    tree.scrollTo(0, 400);

    await waitFor(() => expect(tree.scrollTop).toBe(400));

    expect(node0).toHaveFocus();

    // Select the still-focused Node 0 via keyboard (Space) — a state change
    // unrelated to focus/scroll position.
    await userEvent.keyboard(' ');

    // Give effects (including any scrollToIndex re-fire) a chance to run.
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(tree.scrollTop).toBe(400);
  });

  test('expanding an unrelated node does not snap scroll back to the focused row', async () => {
    const expandableNodes: Array<TreeNodeProps<number>> = Array.from({ length: 50 }, (_, i) => ({
      id: `${i}`,
      value: i,
      label: `Node ${i}`,
      children: [{ id: `${i}-child`, value: i + 1000, label: `Node ${i} Child` }],
    }));

    const { rerender } = render(
      <StatefulTree nodes={expandableNodes} virtualization={{ maxHeight: 200 }} />,
    );

    const tree = screen.getByRole('tree');

    Object.defineProperties(tree, {
      clientHeight: { configurable: true, value: 200 },
      scrollHeight: { configurable: true, value: expandableNodes.length * 40 },
    });

    await userEvent.tab();

    expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus();

    tree.scrollTo(0, 400);

    await waitFor(() => expect(tree.scrollTop).toBe(400));

    // Expand an unrelated, distant node via a prop resync (not a click, which
    // would itself move focus) — simulating an external/programmatic expand.
    rerender(
      <StatefulTree
        defaultExpanded={['25']}
        nodes={expandableNodes}
        virtualization={{ maxHeight: 200 }}
      />,
    );

    await screen.findByRole('treeitem', { name: 'Node 25 Child' });

    expect(tree.scrollTop).toBe(400);
  });

  test('a defaultSelected node inside a collapsed subtree keeps focus once revealed, instead of being reassigned to the first row', async () => {
    const nestedNodes: Array<TreeNodeProps<number>> = [
      {
        id: 'root',
        value: 0,
        label: 'Root',
        children: [{ id: 'child', value: 1, label: 'Child' }],
      },
    ];

    const { rerender } = render(
      <StatefulTree
        defaultSelected={['child']}
        nodes={nestedNodes}
        selectable="radio"
        virtualization={{ maxHeight: 200 }}
      />,
    );

    // "child" isn't in defaultExpanded, so on mount it's outside the virtualized
    // window — give the post-mount effect a chance to (incorrectly) reassign
    // focus to the first row before we reveal it.
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Reveal "child" without clicking anything (a click would itself move focus,
    // masking the bug) by resyncing expandedNodes through defaultExpanded.
    rerender(
      <StatefulTree
        defaultExpanded={['root']}
        defaultSelected={['child']}
        nodes={nestedNodes}
        selectable="radio"
        virtualization={{ maxHeight: 200 }}
      />,
    );

    const child = await screen.findByRole('treeitem', { name: 'Child' });
    const root = screen.getByRole('treeitem', { name: /^Root/ });

    // Real DOM focus only moves on an actual interaction (e.g. Tab); the roving
    // tabindex is the correct signal for which row is *logically* focused, and
    // it must still be "child", not reassigned to "root".
    expect(child).toHaveAttribute('tabindex', '0');
    expect(root).toHaveAttribute('tabindex', '-1');
  });
});
