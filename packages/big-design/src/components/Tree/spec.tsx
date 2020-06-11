import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Tree, TreeNodeProps } from '.';

let nodes: TreeNodeProps<unknown>[];

beforeEach(() => {
  nodes = [
    {
      id: 0,
      value: 0,
      label: 'Category',
      children: [
        { id: 5, value: 5, label: 'Category', children: [{ id: 11, value: 11, label: 'Cateogry' }] },
        { id: 6, value: 6, label: 'Category', children: [{ id: 12, value: 12, label: 'Cateogry' }] },
      ],
    },
    { id: 1, value: 1, label: 'Category' },
    {
      id: 2,
      value: 2,
      label: 'Category',
      children: [
        { id: 7, value: 7, label: 'Category' },
        { id: 8, value: 8, label: 'Category' },
        { id: 9, value: 9, label: 'Category' },
      ],
    },
    { id: 3, value: 3, label: 'Category', disabled: true },
    {
      id: 4,
      value: 4,
      label: 'Category',
      children: [
        {
          id: 10,
          value: 10,
          label: 'Category',
          children: [{ id: 13, value: 13, label: 'Cateogry', children: [{ id: 14, value: 14, label: 'Cateogry' }] }],
        },
      ],
    },
  ];
});

describe('renders Tree component', () => {
  test('base', () => {
    const { container } = render(<Tree nodes={nodes} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('multi-select', () => {
    const { container } = render(<Tree nodes={nodes} selectable="multi" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('radio-select', () => {
    const { container } = render(<Tree nodes={nodes} selectable="radio" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('iconless', () => {
    const { container } = render(<Tree nodes={nodes} iconless />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders with string ids', () => {
    const { container } = render(
      <Tree
        nodes={[
          { id: 'test-id', label: 'Category' },
          { id: 'test-id-2', label: 'Category' },
        ]}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

test('rerenders when props change', () => {
  const text = 'Category';
  const { queryAllByText, rerender } = render(<Tree nodes={[]} />);

  expect(queryAllByText(text).length).toBe(0);
  rerender(<Tree nodes={nodes} />);
  expect(queryAllByText(text).length).toBe(5);
});

describe('handles callback functions', () => {
  describe('onExpand', () => {
    test('asynchronous', async () => {
      jest.useFakeTimers();

      const label = 'Subcateogry';
      const onExpand = jest.fn(async () => {
        const children = await new Promise<TreeNodeProps<undefined>[]>((resolve) =>
          setTimeout(() => resolve([{ id: 3, label }]), 2000),
        );

        return { children };
      });

      const { queryByText, getByRole } = render(
        <Tree nodes={[{ id: 0, label: 'Category', children: [] }]} onExpand={onExpand} />,
      );

      expect(queryByText(label)).not.toBeInTheDocument();
      expect(onExpand).not.toHaveBeenCalled();

      await act(async () => {
        await fireEvent.keyDown(getByRole('treeitem'), { key: 'Enter', code: 'Enter' });

        jest.runAllTimers();
      });

      expect(queryByText(label)).toBeInTheDocument();
      expect(onExpand).toHaveBeenCalled();
      expect(onExpand).toHaveBeenCalledWith({
        id: 0,
        label: 'Category',
        selected: false,
        value: undefined,
        disabled: undefined,
        expanded: false,
        children: [],
      });
    });

    test('synchronous', async () => {
      const label = 'Subcategory';
      const onExpand = jest.fn(() => ({
        children: [{ id: 1, label }],
      }));
      const { queryByText, getByRole } = render(
        <Tree nodes={[{ id: 0, label: 'Category', children: [] }]} onExpand={onExpand} />,
      );

      expect(queryByText(label)).not.toBeInTheDocument();
      expect(onExpand).not.toHaveBeenCalled();

      await act(async () => {
        await fireEvent.keyDown(getByRole('treeitem'), { key: 'Enter', code: 'Enter' });
      });

      expect(queryByText(label)).toBeInTheDocument();
      expect(onExpand).toHaveBeenCalled();
      expect(onExpand).toHaveBeenCalledWith({
        id: 0,
        label: 'Category',
        selected: false,
        value: undefined,
        disabled: undefined,
        expanded: false,
        children: [],
      });
    });
  });

  test('onCollapse', () => {
    const onCollapse = jest.fn();
    const { getAllByRole } = render(
      <Tree
        nodes={[{ id: 0, label: 'Category', expanded: true, children: [{ id: 1, label: 'Subcategory' }] }]}
        onCollapse={onCollapse}
      />,
    );

    const treeitem = getAllByRole('treeitem')[0];

    expect(onCollapse).not.toHaveBeenCalled();

    act(() => {
      fireEvent.keyDown(treeitem, { key: 'Enter', code: 'Enter' });
    });

    expect(onCollapse).toHaveBeenCalled();
    expect(onCollapse).toHaveBeenCalledWith({
      id: 0,
      label: 'Category',
      selected: false,
      value: undefined,
      disabled: undefined,
      expanded: true,
      children: [{ id: 1, label: 'Subcategory' }],
    });
  });

  test('onSelect', () => {
    const onSelect = jest.fn();
    const { getAllByRole } = render(
      <Tree
        nodes={[{ id: 0, value: 0, label: 'Category', expanded: true, children: [{ id: 1, label: 'Subcategory' }] }]}
        onSelect={onSelect}
        selectable="multi"
      />,
    );

    const treeitem = getAllByRole('treeitem')[0];

    expect(onSelect).toHaveBeenCalledTimes(0);

    act(() => {
      fireEvent.keyDown(treeitem, { key: ' ', code: ' ' });
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith([0]);

    act(() => {
      fireEvent.keyDown(treeitem, { key: ' ', code: ' ' });
    });

    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith([]);
  });
});

describe('handles click events', () => {
  const subcategory = 'Subcategory';
  const nodes = [
    { id: 0, value: 0, label: 'Category', children: [{ id: 3, value: 3, label: subcategory }] },
    { id: 1, value: 1, label: 'Category' },
    { id: 2, value: 2, disabled: true, label: 'Category' },
  ];

  test('click on row focuses and/or expands/contracts', async () => {
    const handleCollapse = jest.fn();
    const handleExpand = jest.fn();

    const { queryByRole, getAllByRole } = render(
      <Tree nodes={nodes} onCollapse={handleCollapse} onExpand={handleExpand} />,
    );

    const treeitems = getAllByRole('treeitem');

    expect(handleExpand).toHaveBeenCalledTimes(0);
    expect(handleCollapse).toHaveBeenCalledTimes(0);
    expect(queryByRole('group')).not.toBeInTheDocument();
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');

    await act(async () => {
      await fireEvent.click(treeitems[1].firstChild as ChildNode);
    });

    expect(handleExpand).toHaveBeenCalledTimes(0);
    expect(handleCollapse).toHaveBeenCalledTimes(0);
    expect(queryByRole('group')).not.toBeInTheDocument();
    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

    await act(async () => {
      await fireEvent.click(treeitems[0].firstChild as ChildNode);
    });

    expect(handleExpand).toHaveBeenCalledTimes(1);
    expect(handleCollapse).toHaveBeenCalledTimes(0);
    expect(queryByRole('group')).toBeInTheDocument();
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');

    fireEvent.click(treeitems[0].firstChild as ChildNode);

    expect(handleExpand).toHaveBeenCalledTimes(1);
    expect(handleCollapse).toHaveBeenCalledTimes(1);
    expect(queryByRole('group')).not.toBeInTheDocument();
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
  });

  test('click on radio-select', () => {
    const handleSelect = jest.fn();
    const { getAllByRole } = render(<Tree nodes={nodes} onSelect={handleSelect} selectable="radio" />);

    const treeitems = getAllByRole('treeitem');

    expect(treeitems[0].getAttribute('aria-selected')).toBe('true');

    fireEvent.click(treeitems[0].firstChild as ChildNode);
    fireEvent.click(treeitems[0].querySelector('label') as HTMLLabelElement);

    expect(treeitems[0].getAttribute('aria-selected')).toBe('true');

    fireEvent.click(treeitems[1].querySelector('label') as HTMLLabelElement);

    expect(treeitems[0].getAttribute('aria-selected')).toBe('false');
    expect(treeitems[1].getAttribute('aria-selected')).toBe('true');

    // Click on disabled item:
    fireEvent.click(treeitems[2].querySelector('label') as HTMLLabelElement);

    expect(treeitems[1].getAttribute('aria-selected')).toBe('true');
    expect(treeitems[2].getAttribute('aria-selected')).toBe('false');
  });

  test('click on multi-select', () => {
    const handleSelect = jest.fn();
    const { getAllByRole } = render(<Tree nodes={nodes} onSelect={handleSelect} selectable="multi" />);

    const treeitems = getAllByRole('treeitem');

    expect(treeitems[0].getAttribute('aria-selected')).toBe('false');

    fireEvent.click(treeitems[0].querySelector('label') as HTMLLabelElement);

    expect(treeitems[0].getAttribute('aria-selected')).toBe('true');

    fireEvent.click(treeitems[1].querySelector('label') as HTMLLabelElement);

    expect(treeitems[0].getAttribute('aria-selected')).toBe('true');
    expect(treeitems[1].getAttribute('aria-selected')).toBe('true');

    // Click on disabled item:
    fireEvent.click(treeitems[2].querySelector('label') as HTMLLabelElement);

    expect(treeitems[1].getAttribute('aria-selected')).toBe('true');
    expect(treeitems[2].getAttribute('aria-selected')).toBe('false');
  });
});

describe('handles keyboard events', () => {
  const label = 'Category';
  const nodes = [
    { id: 0, value: 0, label, expanded: true, children: [{ id: 3, value: 3, label }] },
    { id: 1, value: 1, label, children: [{ id: 4, value: 4, label }] },
    { id: 2, value: 2, label },
  ];

  test('down traverses to next visible node', () => {
    const { getAllByRole } = render(<Tree nodes={nodes} />);

    const treeitems = getAllByRole('treeitem');

    expect(treeitems.length).toBe(4);
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[0], { key: 'ArrowDown', code: 'ArrowDown' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[1], { key: 'ArrowDown', code: 'ArrowDown' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[2], { key: 'ArrowDown', code: 'ArrowDown' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[3].getAttribute('tabIndex')).toBe('0');

    // On a last item, down should not focus on anything else
    fireEvent.keyDown(treeitems[3], { key: 'ArrowDown', code: 'ArrowDown' });

    expect(treeitems[3].getAttribute('tabIndex')).toBe('0');
  });
  test('up traverses to previous visible node', () => {
    const { getAllByRole } = render(<Tree nodes={nodes} />);

    const treeitems = getAllByRole('treeitem');

    expect(treeitems.length).toBe(4);
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');

    // Set focus to last item:
    fireEvent.click(treeitems[3].firstChild as ChildNode);

    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[3].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[3], { key: 'ArrowUp', code: 'ArrowUp' });

    expect(treeitems[3].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[2], { key: 'ArrowUp', code: 'ArrowUp' });

    expect(treeitems[3].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[1], { key: 'ArrowUp', code: 'ArrowUp' });

    expect(treeitems[3].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');

    // On a last item, up should not focus on anything else
    fireEvent.keyDown(treeitems[0], { key: 'ArrowUp', code: 'ArrowUp' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
  });

  describe('left keydown', () => {
    test('on expanded parent, traverses to parent', () => {
      const { getAllByRole } = render(
        <Tree nodes={[{ id: 0, label, expanded: true, children: [{ id: 1, label }] }]} />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);

      // Set focus to last item:
      fireEvent.click(treeitems[1].firstChild as ChildNode);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

      fireEvent.keyDown(treeitems[1], { key: 'ArrowLeft', code: 'ArrowLeft' });

      expect(treeitems[1]).toBeInTheDocument();
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    });

    test('on expanded node, collapses node', () => {
      const { getAllByRole } = render(
        <Tree nodes={[{ id: 0, label, expanded: true, children: [{ id: 1, label }] }]} />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1]).toBeInTheDocument();

      fireEvent.keyDown(treeitems[0], { key: 'ArrowLeft', code: 'ArrowLeft' });

      expect(treeitems[1]).not.toBeInTheDocument();
    });

    test('on collapsed node with no parent, does nothing', () => {
      const { getAllByRole } = render(
        <Tree
          nodes={[
            { id: 0, label },
            { id: 1, label, children: [{ id: 2, label }] },
          ]}
        />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);

      // Set focus to last item:
      fireEvent.click(treeitems[1].firstChild as ChildNode);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

      fireEvent.keyDown(treeitems[1], { key: 'ArrowLeft', code: 'ArrowLeft' });

      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');
    });
  });

  describe('right keydown', () => {
    test('on expanded node, traverses to child', () => {
      const { getAllByRole } = render(
        <Tree nodes={[{ id: 0, label, expanded: true, children: [{ id: 1, label }] }]} />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');

      fireEvent.keyDown(treeitems[0], { key: 'ArrowRight', code: 'ArrowRight' });

      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');
    });

    test('on collapsed node, expands node', () => {
      const { getAllByRole } = render(<Tree nodes={[{ id: 0, label, children: [{ id: 1, label }] }]} />);

      let treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(1);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');

      fireEvent.keyDown(treeitems[0], { key: 'ArrowRight', code: 'ArrowRight' });

      treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);
      expect(treeitems[1]).toBeInTheDocument();
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    });

    test('on a end node, does nothing', () => {
      const { getAllByRole } = render(
        <Tree
          nodes={[
            { id: 0, label, expanded: true, children: [{ id: 1, label }] },
            { id: 2, label },
          ]}
        />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(3);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');

      // Set focus to child element:
      fireEvent.click(treeitems[1].firstChild as ChildNode);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

      fireEvent.keyDown(treeitems[1], { key: 'ArrowRight', code: 'ArrowRight' });

      expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');
    });
  });

  describe('enter keydown', () => {
    test('on a end node, if selectable, selects value', () => {
      const handleSelect = jest.fn();
      const { getAllByRole } = render(
        <Tree
          nodes={[{ id: 0, value: 0, label, expanded: true, children: [{ id: 1, value: 1, label }] }]}
          onSelect={handleSelect}
          selectable="multi"
        />,
      );

      const treeitems = getAllByRole('treeitem');

      fireEvent.click(treeitems[1].firstChild as ChildNode);
      expect(handleSelect).not.toHaveBeenCalled();
      expect(treeitems[1].getAttribute('tabIndex')).toBe('0');

      fireEvent.keyDown(treeitems[1], { key: 'Enter', code: 'Enter' });

      expect(handleSelect).toHaveBeenCalled();
    });

    test('on a collapsed node, opens node', () => {
      const handleSelect = jest.fn();
      const { getAllByRole } = render(
        <Tree
          nodes={[{ id: 0, value: 0, label, children: [{ id: 1, value: 1, label }] }]}
          onSelect={handleSelect}
          selectable="multi"
        />,
      );

      let treeitems = getAllByRole('treeitem');

      expect(handleSelect).not.toHaveBeenCalled();

      fireEvent.keyDown(treeitems[0], { key: 'Enter', code: 'Enter' });

      treeitems = getAllByRole('treeitem');

      expect(treeitems.length).toBe(2);
      expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
      expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
      expect(handleSelect).not.toHaveBeenCalled();
    });
  });

  describe('space keydown', () => {
    test('multi-select node, selects values', () => {
      const handleSelect = jest.fn();
      const { getAllByRole } = render(
        <Tree
          nodes={[
            { id: 0, value: 0, label, expanded: true, children: [{ id: 1, value: 1, label }] },
            { id: 2, value: 2, label, disabled: true },
          ]}
          onSelect={handleSelect}
          selectable="multi"
        />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(handleSelect).not.toHaveBeenCalled();

      fireEvent.keyDown(treeitems[0], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith([0]);

      fireEvent.keyDown(treeitems[1], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith([0, 1]);

      fireEvent.keyDown(treeitems[1], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith([0]);

      fireEvent.keyDown(treeitems[2], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith([0]);
    });

    test('radio-select node, selects value', () => {
      const handleSelect = jest.fn();
      const { getAllByRole } = render(
        <Tree
          nodes={[
            { id: 0, value: 0, label, expanded: true, children: [{ id: 1, value: 1, label }] },
            { id: 2, value: 2, label, disabled: true },
          ]}
          onSelect={handleSelect}
          selectable="radio"
        />,
      );

      const treeitems = getAllByRole('treeitem');

      expect(handleSelect).not.toHaveBeenCalled();

      fireEvent.keyDown(treeitems[0], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith(0);

      fireEvent.keyDown(treeitems[1], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith(1);

      fireEvent.keyDown(treeitems[1], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith(1);

      fireEvent.keyDown(treeitems[2], { key: ' ', code: ' ' });

      expect(handleSelect).toHaveBeenCalledWith(1);
    });
  });

  test('home goes to first node', () => {
    const { getAllByRole } = render(
      <Tree
        nodes={[
          { id: 0, label, expanded: true, children: [{ id: 1, label }] },
          { id: 2, label },
        ]}
      />,
    );

    const treeitems = getAllByRole('treeitem');

    expect(treeitems.length).toBe(3);
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');

    // Set focus to child element:
    fireEvent.click(treeitems[2].firstChild as ChildNode);
    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('0');

    fireEvent.keyDown(treeitems[1], { key: 'Home', code: 'Home' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');
  });

  test('end goes to last node', () => {
    const { getAllByRole } = render(
      <Tree
        nodes={[
          { id: 0, label, expanded: true, children: [{ id: 1, label }] },
          { id: 2, label },
        ]}
      />,
    );

    const treeitems = getAllByRole('treeitem');

    expect(treeitems.length).toBe(3);
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('-1');

    fireEvent.keyDown(treeitems[1], { key: 'End', code: 'End' });

    expect(treeitems[0].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[1].getAttribute('tabIndex')).toBe('-1');
    expect(treeitems[2].getAttribute('tabIndex')).toBe('0');
  });
});

describe('has the appropriate a11y roles et al', () => {
  describe('roles for the outer tree', () => {
    test('multi-select', () => {
      const { getByRole } = render(<Tree nodes={nodes} selectable="multi" />);

      const tree = getByRole('tree');

      expect(tree).toBeInTheDocument();
      expect(tree.getAttribute('aria-multiselectable')).toBe('true');
    });

    test('radio/non-multi select', () => {
      const { getByRole } = render(<Tree nodes={nodes} selectable="radio" />);

      const tree = getByRole('tree');

      expect(tree).toBeInTheDocument();
      expect(tree.getAttribute('aria-multiselectable')).toBe('false');
    });
  });

  describe('roles for the inner tree element', () => {
    test('unexpanded', () => {
      const { getByRole } = render(
        <Tree nodes={[{ id: 0, label: 'Category', children: [{ id: 1, label: 'Subcategory' }] }]} />,
      );

      const treeitem = getByRole('treeitem');

      expect(treeitem).toBeInTheDocument();
      expect(treeitem.getAttribute('aria-expanded')).toBe('false');
    });

    test('unexpanded - selected vs. unselected', () => {
      const { getByRole } = render(
        <Tree
          nodes={[{ id: 0, value: 0, label: 'Category', children: [{ id: 1, value: 1, label: 'Subcategory' }] }]}
          selectable="multi"
        />,
      );

      const treeitem = getByRole('treeitem');

      expect(treeitem).toBeInTheDocument();
      expect(treeitem.getAttribute('aria-expanded')).toBe('false');
      expect(treeitem.getAttribute('aria-selected')).toBe('false');

      act(() => {
        fireEvent.keyDown(treeitem, { key: ' ', code: ' ' });
      });

      expect(treeitem.getAttribute('aria-expanded')).toBe('false');
      expect(treeitem.getAttribute('aria-selected')).toBe('true');
    });

    test('expanded', () => {
      const { getAllByRole } = render(
        <Tree nodes={[{ id: 0, label: 'Category', expanded: true, children: [{ id: 1, label: 'Subcategory' }] }]} />,
      );

      const treeitem = getAllByRole('treeitem')[0];

      expect(treeitem).toBeInTheDocument();
      expect(treeitem.getAttribute('aria-expanded')).toBe('true');
    });

    test('expanded - selected vs. unselected', () => {
      const { getAllByRole } = render(
        <Tree
          nodes={[
            {
              id: 0,
              value: 0,
              expanded: true,
              label: 'Category',
              children: [{ id: 1, value: 1, label: 'Subcategory' }],
            },
          ]}
          selectable="multi"
        />,
      );

      const treeitem = getAllByRole('treeitem')[0];

      expect(treeitem).toBeInTheDocument();
      expect(treeitem.getAttribute('aria-expanded')).toBe('true');
      expect(treeitem.getAttribute('aria-selected')).toBe('false');

      act(() => {
        fireEvent.keyDown(treeitem, { key: ' ', code: ' ' });
      });

      expect(treeitem.getAttribute('aria-expanded')).toBe('true');
      expect(treeitem.getAttribute('aria-selected')).toBe('true');
    });
  });
});
