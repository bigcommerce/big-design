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

const TestComponent: React.FC<PillTabsProps> = ({ activePills, items, onPillClick }) => {
  return (
    <Wrapper data-testid="wrapper">
      <PillTabs activePills={activePills} items={items} onPillClick={onPillClick} />
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

test('it renders the given tabs', () => {
  const onClick = jest.fn();
  const items = [
    {
      title: 'In stock',
      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = screen.getByText('In stock');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
});

test('dropdown is not visible if items fit', () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
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

  const inStock = screen.getByText('In stock');
  const dropdownToggle = screen.queryByTestId('pilltabs-dropdown-toggle');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).toHaveStyle(HIDDEN_STYLES);
});

test('renders dropdown if items do not fit', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        return parseFloat(this.style.width) || 300;
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

      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('Long filter name');
  const dropdownToggle = screen.queryByTestId('pilltabs-dropdown-toggle');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('renders all the filters if they fit', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
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

      id: 'filter1',
    },
    {
      title: 'Filter 3',

      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByText('In stock');
  const filter2 = await screen.findByText('Filter 2');
  const filter3 = await screen.findByText('Filter 3');
  const dropdownToggle = screen.queryByTestId('pilltabs-dropdown-toggle');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter3).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-dropdown-toggle') {
          return 50;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
          return 300;
        }

        if (this.dataset.testid === 'pilltabs-pill-1') {
          return 300;
        }

        if (this.dataset.testid === 'pilltabs-pill-2') {
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
      title: 'Filter 2',

      id: 'filter1',
    },
    {
      title: 'Filter 3',

      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByTestId('pilltabs-pill-0');
  const filter2 = await screen.findByTestId('pilltabs-pill-1');
  const filter3 = await screen.findByTestId('pilltabs-pill-2');
  const dropdownToggle = screen.queryByTestId('pilltabs-dropdown-toggle');
  const list = screen.getByRole('list');

  expect(list).toMatchSnapshot();
  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).toHaveStyle(HIDDEN_STYLES);
  expect(filter3).toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible 2', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
          return 100;
        }

        if (this.dataset.testid === 'pilltabs-pill-1') {
          return 100;
        }

        if (this.dataset.testid === 'pilltabs-pill-2') {
          return 300;
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

      id: 'filter1',
    },
    {
      title: 'Filter 3',

      id: 'filter1',
    },
  ];

  render(<TestComponent activePills={[]} items={items} onPillClick={onClick} />);

  const inStock = await screen.findByTestId('pilltabs-pill-0');
  const filter2 = await screen.findByTestId('pilltabs-pill-1');
  const filter3 = await screen.findByTestId('pilltabs-pill-2');
  const dropdownToggle = screen.queryByTestId('pilltabs-dropdown-toggle');
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
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get(this: HTMLElement) {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-dropdown-toggle') {
          return 50;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
          return 340;
        }

        if (this.dataset.testid === 'pilltabs-pill-1') {
          return 200;
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
  const filter1 = screen.getByTestId('pilltabs-pill-1');

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
  const onSale2 = await screen.queryByText('On sale');

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
  const notInStock2 = await screen.queryByText('Not in stock');
  const onSale2 = await screen.queryByText('On sale');

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
  const onSale2 = await screen.queryByText('On sale');
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
