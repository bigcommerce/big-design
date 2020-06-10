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

  let handleCollapse: any;
  let handleExpand: any;
  let handleSelect: any;

  beforeEach(() => {
    handleCollapse = jest.fn();
    handleExpand = jest.fn();
    handleSelect = jest.fn();
  });

  test('click on row focuses and/or expands/contracts', async () => {
    const { queryByRole, getAllByRole } = render(
      <Tree nodes={nodes} onCollapse={handleCollapse} onExpand={handleExpand} onSelect={handleSelect} />,
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

    await act(async () => {
      await fireEvent.click(treeitems[0].firstChild as ChildNode);
    });

    expect(handleExpand).toHaveBeenCalledTimes(1);
    expect(handleCollapse).toHaveBeenCalledTimes(1);
    expect(queryByRole('group')).not.toBeInTheDocument();
    expect(treeitems[0].getAttribute('tabIndex')).toBe('0');
  });

  test('click on radio-select', async () => {
    const { getAllByRole } = render(<Tree nodes={nodes} onSelect={handleSelect} selectable="radio" />);

    const treeitems = getAllByRole('treeitem');

    expect(treeitems[0].getAttribute('aria-selected')).toBe('true');

    await act(async () => {
      await fireEvent.click(treeitems[0].firstChild as ChildNode);
      await fireEvent.click(treeitems[0].querySelector('label') as HTMLLabelElement);
    });

    expect(treeitems[0].firstChild).toBe('true');
  });

  test.todo('click on radio-select - disabled');

  test.todo('click on multi-select');

  test.todo('click on multi-select - disabled');
});

describe('handles keyboard events', () => {
  // const handleCollapse = jest.fn();
  // const handleExpand = jest.fn();
  // const handleSelect = jest.fn();

  test.todo('down traverses to next visible node');
  test.todo('up traverses to previous visible node');

  describe('left keydown', () => {
    test.todo('on expanded parent, traverses to parent');
    test.todo('on expanded node, collapses node');
    test.todo('on collapsed node with no parent, does nothing');
  });

  describe('right keydown', () => {
    test.todo('on expanded node, traverses to child');
    test.todo('on collapsed node, expands node');
    test.todo('on a end node, does nothing');
  });

  describe('enter keydown', () => {
    test.todo('on a end node, if selectable, selects value');
    test.todo('on a collapsed node, opens node');
  });

  describe('space keydown', () => {
    test.todo('multi-select node, selects values');
    test.todo('radio-select node, selects value');
    test.todo("on a disabled node, doesn't select node");
  });

  test.todo('home goes to first node');
  test.todo('end goes to last node');
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

// describe('expands a node', () => {
//   test('onClick', () => {
//     const { getByRole, getAllByRole } = render(<Tree nodes={nodes} />);

//     const treeItem = getAllByRole('treeitem')[0].firstChild as ChildNode;

//     fireEvent.click(treeItem);

//     const { parentElement } = treeItem;

//     expect(parentElement as HTMLElement).toMatchSnapshot();
//     expect(getByRole('group')).toBeInTheDocument();
//   });

//   test('onKeyboard - enter', () => {
//     const { queryByRole, queryAllByRole } = render(<Tree nodes={nodes} />);

//     const treeItem = queryAllByRole('treeitem')[0];

//     fireEvent.keyDown(treeItem, { key: 'Enter', code: 'Enter' });

//     expect(treeItem.getAttribute('aria-expanded')).toBe('true');
//     expect(queryByRole('group')).toBeInTheDocument();
//   });

//   test('onKeyboard - right', () => {
//     const { queryByRole, queryAllByRole } = render(<Tree nodes={nodes} />);

//     const treeItem = queryAllByRole('treeitem')[0];

//     fireEvent.keyDown(treeItem, { key: 'ArrowRight', code: 'ArrowRight' });

//     expect(treeItem.getAttribute('aria-expanded')).toBe('true');
//     expect(queryByRole('group')).toBeInTheDocument();
//   });
// });
