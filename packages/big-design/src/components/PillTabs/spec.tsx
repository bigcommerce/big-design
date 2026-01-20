import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';

import { PillTabs, PillTabsProps } from './PillTabs';

const Wrapper = styled.div`
  width: 200px;
`;

Wrapper.defaultProps = { theme: defaultTheme };

const TestComponent: React.FC<PillTabsProps> = (props) => {
  return (
    <Wrapper data-testid="wrapper">
      <PillTabs {...props} />
    </Wrapper>
  );
};

const originalPrototype = Object.getOwnPropertyDescriptors(window.HTMLElement.prototype);

afterAll(() => Object.defineProperties(window.HTMLElement.prototype, originalPrototype));

const HIDDEN_STYLES = {
  'z-index': -defaultTheme.zIndex.tooltip,
  position: 'absolute',
  visibility: 'hidden',
};

test('it renders the given tabs', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return 400;
        }

        if (this.getAttribute('role') === 'listitem') {
          // Dropdown toggle contains a button with aria-haspopup
          if (this.querySelector('[aria-haspopup]')) {
            return 50;
          }

          // All pills are 100px wide
          return 100;
        }

        return parseFloat(this.style.width) || 0;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('In stock');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
});

test('dropdown is not visible if items fit', async () => {
  const pillWidths: Record<string, number> = {
    'In stock': 100,
  };
  const dropdownWidth = 50;
  const containerWidth = 400;

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return containerWidth;
        }

        if (this.getAttribute('role') === 'listitem') {
          const text = (this.textContent || '').trim();

          // Check if this is a pill by matching known text
          for (const [pillText, width] of Object.entries(pillWidths)) {
            if (text.includes(pillText)) {
              return width;
            }
          }

          // If no pill matches, this is the dropdown toggle
          return dropdownWidth;
        }

        return parseFloat(this.style.width) || 0;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('In stock');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);

  // Dropdown toggle is hidden since all pills fit - use hidden: true to query it
  const listItems = screen.getAllByRole('listitem', { hidden: true });

  expect(listItems.at(-1)).toHaveStyle(HIDDEN_STYLES);
});

test('renders dropdown if items do not fit', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return 400;
        }

        if (this.getAttribute('role') === 'listitem') {
          // Dropdown toggle contains a button with aria-haspopup
          if (this.querySelector('[aria-haspopup]')) {
            return 50;
          }

          // All pills are 300px wide
          return 300;
        }

        return parseFloat(this.style.width) || 0;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
    {
      title: 'Long filter name',
      id: 'filter2',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('Long filter name');
  const listItems = screen.getAllByRole('listitem');
  const dropdownToggle = listItems.at(-1);
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('renders all the filters if they fit', async () => {
  const pillWidths: Record<string, number> = {
    'In stock': 50,
    'Filter 2': 50,
    'Filter 3': 50,
  };
  const dropdownWidth = 50;
  const containerWidth = 400;

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return containerWidth;
        }

        if (this.getAttribute('role') === 'listitem') {
          const text = (this.textContent || '').trim();

          for (const [pillText, width] of Object.entries(pillWidths)) {
            if (text.includes(pillText)) {
              return width;
            }
          }

          return dropdownWidth;
        }

        return parseFloat(this.style.width) || 0;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
    {
      title: 'Filter 2',
      id: 'filter2',
    },
    {
      title: 'Filter 3',
      id: 'filter3',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('In stock');
  const filter2 = await screen.findByText('Filter 2');
  const filter3 = await screen.findByText('Filter 3');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter3).not.toHaveStyle(HIDDEN_STYLES);

  // Dropdown toggle is hidden since all pills fit - use hidden: true to query it
  const listItems = screen.getAllByRole('listitem', { hidden: true });

  expect(listItems.at(-1)).toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible', async () => {
  const pillWidths: Record<string, number> = {
    'In stock': 300,
    'Filter 2': 300,
    'Filter 3': 300,
  };
  const dropdownWidth = 50;
  const containerWidth = 400;

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return containerWidth;
        }

        if (this.getAttribute('role') === 'listitem') {
          const text = (this.textContent || '').trim();

          for (const [pillText, width] of Object.entries(pillWidths)) {
            if (text.includes(pillText)) {
              return width;
            }
          }

          return dropdownWidth;
        }

        return parseFloat(this.style.width) || 0;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
    {
      title: 'Filter 2',
      id: 'filter2',
    },
    {
      title: 'Filter 3',
      id: 'filter3',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  await screen.findByText('In stock');
  const listItems = screen.getAllByRole('listitem', { hidden: true });
  const inStock = listItems[0];
  const filter2 = listItems[1];
  const filter3 = listItems[2];
  const dropdownToggle = listItems.at(-1);
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).toHaveStyle(HIDDEN_STYLES);
  expect(filter3).toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible 2', async () => {
  const pillWidths: Record<string, number> = {
    'In stock': 100,
    'Filter 2': 100,
    'Filter 3': 300,
  };
  const dropdownWidth = 50;
  const containerWidth = 400;

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return containerWidth;
        }

        if (this.getAttribute('role') === 'listitem') {
          const text = (this.textContent || '').trim();

          for (const [pillText, width] of Object.entries(pillWidths)) {
            if (text.includes(pillText)) {
              return width;
            }
          }

          return dropdownWidth;
        }

        return parseFloat(this.style.width) || 50;
      },
    },
  });

  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
    {
      title: 'Filter 2',
      id: 'filter2',
    },
    {
      title: 'Filter 3',
      id: 'filter3',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  await screen.findByText('In stock');
  const listItems = screen.getAllByRole('listitem', { hidden: true });
  const inStock = listItems[0];
  const filter2 = listItems[1];
  const filter3 = listItems[2];
  const dropdownToggle = listItems.at(-1);
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter3).toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('it executes the given callback on click', async () => {
  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const items = [item1, item2];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = screen.getByText('In stock');

  await userEvent.click(inStock);

  expect(onClick).toHaveBeenCalledWith(item1.id);
});

test('cannot click on a hidden item', async () => {
  const pillWidths: Record<string, number> = {
    'In stock': 340,
    'Not in stock': 200,
  };
  const dropdownWidth = 50;
  const containerWidth = 400;

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.getAttribute('role') === 'list') {
          return containerWidth;
        }

        if (this.getAttribute('role') === 'listitem') {
          const text = (this.textContent || '').trim();

          for (const [pillText, width] of Object.entries(pillWidths)) {
            if (text.includes(pillText)) {
              return width;
            }
          }

          return dropdownWidth;
        }

        return parseFloat(this.style.width) || 50;
      },
    },
  });

  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const items = [item1, item2];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const notInStock = await screen.findByText('Not in stock');
  const listItems = screen.getAllByRole('listitem', { hidden: true });
  const filter1 = listItems[1];

  expect(notInStock).toHaveStyle({ pointerEvents: '' });
  expect(filter1).toHaveStyle(HIDDEN_STYLES);
  expect(onClick).not.toHaveBeenCalled();
});

test('allows to add new items', async () => {
  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const item3 = {
    title: 'On sale',
    id: 'filter3',
  };
  const items = [item1, item2];

  const { rerender } = render(
    <TestComponent activePills={[]} items={items} onPillClick={onClick} />,
  );

  const inStock1 = screen.getByText('In stock');
  const notInStock1 = screen.getByText('Not in stock');
  const onSale1 = screen.queryByText('On sale');

  expect(inStock1).toBeInTheDocument();
  expect(notInStock1).toBeInTheDocument();
  expect(onSale1).not.toBeInTheDocument();

  const newItems = [item1, item2, item3];

  rerender(<TestComponent activePills={[]} items={newItems} onPillClick={onClick} />);

  const inStock2 = await screen.findByText('In stock');
  const notInStock2 = await screen.findByText('Not in stock');
  const onSale2 = screen.queryByText('On sale');

  expect(inStock2).toBeInTheDocument();
  expect(notInStock2).toBeInTheDocument();
  expect(onSale2).toBeInTheDocument();
});

test('allows to remove items', async () => {
  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const item3 = {
    title: 'On sale',
    id: 'filter3',
  };
  const items = [item1, item2, item3];

  const { rerender } = render(
    <TestComponent activePills={[]} items={items} onPillClick={onClick} />,
  );

  const inStock1 = screen.getByText('In stock');
  const notInStock1 = screen.getByText('Not in stock');
  const onSale1 = screen.getByText('On sale');

  expect(inStock1).toBeInTheDocument();
  expect(notInStock1).toBeInTheDocument();
  expect(onSale1).toBeInTheDocument();

  const newItems = [item1, item3];

  rerender(<TestComponent activePills={[]} items={newItems} onPillClick={onClick} />);

  const inStock2 = await screen.findByText('In stock');
  const notInStock2 = screen.queryByText('Not in stock');
  const onSale2 = screen.queryByText('On sale');

  expect(inStock2).toBeInTheDocument();
  expect(notInStock2).not.toBeInTheDocument();
  expect(onSale2).toBeInTheDocument();
});

test('allows to swap items keeping the same length', async () => {
  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const item3 = {
    title: 'On sale',
    id: 'filter3',
  };
  const item4 = {
    title: 'Featured',
    id: 'filter4',
  };
  const items = [item1, item2, item3];

  const { rerender } = render(
    <TestComponent activePills={[]} items={items} onPillClick={onClick} />,
  );

  const inStock1 = screen.getByText('In stock');
  const notInStock1 = screen.getByText('Not in stock');
  const onSale1 = screen.getByText('On sale');
  const featured1 = screen.queryByText('Featured');

  expect(inStock1).toBeInTheDocument();
  expect(notInStock1).toBeInTheDocument();
  expect(onSale1).toBeInTheDocument();
  expect(featured1).not.toBeInTheDocument();

  const newItems = [item1, item2, item4];

  rerender(<TestComponent activePills={[]} items={newItems} onPillClick={onClick} />);

  const inStock2 = await screen.findByText('In stock');
  const notInStock2 = await screen.findByText('Not in stock');
  const onSale2 = screen.queryByText('On sale');
  const featured2 = await screen.findByText('Featured');

  expect(inStock2).toBeInTheDocument();
  expect(notInStock2).toBeInTheDocument();
  expect(onSale2).not.toBeInTheDocument();
  expect(featured2).toBeInTheDocument();
});

test('sends the right id to the handler after swapping', async () => {
  const onClick = jest.fn();
  const item1 = {
    title: 'In stock',
    id: 'filter1',
  };
  const item2 = {
    title: 'Not in stock',
    id: 'filter2',
  };
  const item3 = {
    title: 'On sale',
    id: 'filter3',
  };
  const item4 = {
    title: 'Featured',
    id: 'filter4',
  };
  const items = [item1, item2, item3];

  const { rerender } = render(
    <TestComponent activePills={[]} items={items} onPillClick={onClick} />,
  );

  const newItems = [item4, item2, item3];

  rerender(<TestComponent activePills={[]} items={newItems} onPillClick={onClick} />);

  const featured = await screen.findByText('Featured');

  await userEvent.click(featured);

  expect(onClick).toHaveBeenCalledWith(item4.id);
});

test('it does not render when provided an empty list of items', () => {
  const { container } = render(<PillTabs activePills={[]} items={[]} onPillClick={jest.fn()} />);

  expect(container).toBeEmptyDOMElement();
});

describe('when using dropdown items', () => {
  test('renders the dropdown items within the dropdown, regardless of space', async () => {
    const dropdownItems = [
      { content: 'Some dropdown action', onItemClick: jest.fn() },
      { content: 'Another dropdown action', onItemClick: jest.fn() },
    ];

    render(
      <TestComponent
        activePills={[]}
        dropdownItems={dropdownItems}
        items={[{ title: 'Cheddar', id: 'cheddar' }]}
        onPillClick={jest.fn()}
      />,
    );

    await userEvent.click(await screen.findByRole('button', { name: 'add' }));

    expect(await screen.findByRole('option', { name: 'Some dropdown action' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Another dropdown action' })).toBeInTheDocument();
  });

  describe('when there is not enough space for all pilltabs', () => {
    beforeEach(() => {
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get(this: HTMLElement) {
            if (this.getAttribute('role') === 'list') {
              return 270;
            }

            if (this.getAttribute('role') === 'listitem') {
              // Dropdown toggle contains a button with aria-haspopup
              // only enough space for 2 pills (including margins)
              if (this.querySelector('[aria-haspopup]')) {
                return 50;
              }

              // All pills are 100px wide
              return 100;
            }

            return parseFloat(this.style.width) || 0;
          },
        },
      });
    });

    test('renders the dropdown items within the dropdown, after the overflowing pilltabs', async () => {
      const items = [
        { title: 'Cheddar', id: 'cheddar' },
        { title: 'Gouda', id: 'gouda' },
        { title: 'Brie', id: 'brie' },
      ];

      const dropdownItems = [
        { content: 'Some dropdown action', onItemClick: jest.fn() },
        { content: 'Another dropdown action', onItemClick: jest.fn() },
      ];

      render(
        <TestComponent
          activePills={[]}
          dropdownItems={dropdownItems}
          items={items}
          onPillClick={jest.fn()}
        />,
      );

      await userEvent.click(await screen.findByRole('button', { name: 'add' }));

      const allOptions = await screen.findAllByRole('option');

      const brie = screen.getByRole('option', { name: 'Brie' });
      const someAction = screen.getByRole('option', { name: 'Some dropdown action' });
      const anotherAction = screen.getByRole('option', { name: 'Another dropdown action' });

      expect(allOptions[0]).toBe(brie);
      expect(allOptions[1]).toBe(someAction);
      expect(allOptions[2]).toBe(anotherAction);
    });
  });
});

describe('when using item groups', () => {
  test('renders pills from multiple groups', async () => {
    const groups = [
      {
        items: [
          { title: 'All', id: 'all' },
          { title: 'Out of stock', id: 'out-of-stock' },
        ],
      },
      {
        items: [
          { title: 'Millennials', id: 'millennials' },
          { title: 'Elders', id: 'elders' },
        ],
      },
    ];

    render(<TestComponent activePills={[]} items={groups} onPillClick={jest.fn()} />);

    expect(await screen.findByText('All')).toBeInTheDocument();
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
    expect(screen.getByText('Millennials')).toBeInTheDocument();
    expect(screen.getByText('Elders')).toBeInTheDocument();
  });

  test('renders vertical separator between visible groups', async () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get(this: HTMLElement) {
          if (this.getAttribute('role') === 'list') {
            return 600;
          }

          return parseFloat(this.style.width) || 50;
        },
      },
    });

    const groups = [
      {
        items: [
          { title: 'All', id: 'all' },
          { title: 'Out of stock', id: 'out-of-stock' },
        ],
      },
      {
        items: [
          { title: 'Millennials', id: 'millennials' },
          { title: 'Elders', id: 'elders' },
        ],
      },
    ];

    render(<TestComponent activePills={[]} items={groups} onPillClick={jest.fn()} />);

    // Separator should appear between groups
    const separator = await screen.findByRole('separator');

    expect(separator).toBeInTheDocument();
    expect(separator).not.toHaveStyle(HIDDEN_STYLES);
  });

  test('does not render separator for single group', async () => {
    const groups = [
      {
        items: [
          { title: 'All', id: 'all' },
          { title: 'Out of stock', id: 'out-of-stock' },
        ],
      },
    ];

    render(<TestComponent activePills={[]} items={groups} onPillClick={jest.fn()} />);

    // Wait for component to settle
    await screen.findByText('All');

    const separator = screen.queryByRole('separator');

    expect(separator).not.toBeInTheDocument();
  });

  test('does not render separator for flat items', async () => {
    const items = [
      { title: 'All', id: 'all' },
      { title: 'Out of stock', id: 'out-of-stock' },
    ];

    render(<TestComponent activePills={[]} items={items} onPillClick={jest.fn()} />);

    // Wait for component to settle
    await screen.findByText('All');

    const separator = screen.queryByRole('separator');

    expect(separator).not.toBeInTheDocument();
  });

  test('hides separator when group boundary pills are hidden', async () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get(this: HTMLElement) {
          if (this.getAttribute('role') === 'list') {
            return 200;
          }

          if (this.getAttribute('role') === 'listitem') {
            // Dropdown toggle contains a button with aria-haspopup
            if (this.querySelector('[aria-haspopup]')) {
              return 50;
            }

            // All pills are 80px wide, Group 2 pills don't fit
            return 80;
          }

          return parseFloat(this.style.width) || 0;
        },
      },
    });

    const groups = [
      {
        items: [
          { title: 'All', id: 'all' },
          { title: 'Out of stock', id: 'out-of-stock' },
        ],
      },
      {
        items: [
          { title: 'Millennials', id: 'millennials' },
          { title: 'Elders', id: 'elders' },
        ],
      },
    ];

    render(<TestComponent activePills={[]} items={groups} onPillClick={jest.fn()} />);

    // Wait for component to settle
    await screen.findByText('All');

    // The separator exists but should be hidden since group 2 pills are hidden
    const separator = screen.getByRole('separator', { hidden: true });

    expect(separator).toHaveStyle(HIDDEN_STYLES);
  });

  test('executes callback with correct id when clicking grouped pill', async () => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get(this: HTMLElement) {
          if (this.getAttribute('role') === 'list') {
            return 600;
          }

          return parseFloat(this.style.width) || 50;
        },
      },
    });

    const onClick = jest.fn();
    const groups = [
      {
        items: [{ title: 'All', id: 'all' }],
      },
      {
        items: [{ title: 'Millennials', id: 'millennials' }],
      },
    ];

    render(<TestComponent activePills={[]} items={groups} onPillClick={onClick} />);

    await userEvent.click(await screen.findByText('Millennials'));

    expect(onClick).toHaveBeenCalledWith('millennials');
  });

  describe('when some group items overflow into dropdown', () => {
    beforeEach(() => {
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get(this: HTMLElement) {
            if (this.getAttribute('role') === 'list') {
              return 200;
            }

            if (this.getAttribute('role') === 'listitem') {
              // Dropdown toggle contains a button with aria-haspopup
              if (this.querySelector('[aria-haspopup]')) {
                return 50;
              }

              // All pills are 80px wide
              return 80;
            }

            return parseFloat(this.style.width) || 0;
          },
        },
      });
    });

    test('renders hidden group items in dropdown with group labels', async () => {
      const groups = [
        {
          label: 'Status',
          items: [
            { title: 'All', id: 'all' },
            { title: 'Out of stock', id: 'out-of-stock' },
          ],
        },
        {
          label: 'Demographics',
          items: [
            { title: 'Millennials', id: 'millennials' },
            { title: 'Elders', id: 'elders' },
          ],
        },
      ];

      render(<TestComponent activePills={[]} items={groups} onPillClick={jest.fn()} />);

      await userEvent.click(await screen.findByRole('button', { name: 'add' }));

      // Hidden items should appear in dropdown with group label
      expect(await screen.findByText('Demographics')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Millennials' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Elders' })).toBeInTheDocument();
    });
  });
});
