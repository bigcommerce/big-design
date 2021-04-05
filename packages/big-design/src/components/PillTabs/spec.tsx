import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, wait } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';

import { PillTabs, PillTabsProps } from './PillTabs';

const Wrapper = styled.div`
  width: 200px;
`;

Wrapper.defaultProps = { theme: defaultTheme };

const TestComponent: React.FC<PillTabsProps> = ({ items }) => {
  return (
    <Wrapper data-testid="wrapper">
      <PillTabs items={items} />
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
  ];

  const { getByText } = render(<TestComponent items={items} />);
  const inStock = getByText('In stock');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
});

test('dropdown is not visible if items fit', () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
  ];

  const { getByText, queryByTestId } = render(<TestComponent items={items} />);
  const inStock = getByText('In stock');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).toHaveStyle(HIDDEN_STYLES);
});

test('renders dropdown if items dont fit', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
    {
      text: 'Long filter name',
      isActive: false,
      onClick,
    },
  ];

  const { getByText, queryByTestId } = render(<TestComponent items={items} />);
  await wait();

  const inStock = getByText('Long filter name');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('renders all the filters if they fit', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 2',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 3',
      isActive: false,
      onClick,
    },
  ];

  const { getByText, queryByTestId } = render(<TestComponent items={items} />);
  await wait();

  const inStock = getByText('In stock');
  const filter2 = getByText('Filter 2');
  const filter3 = getByText('Filter 3');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter3).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 2',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 3',
      isActive: false,
      onClick,
    },
  ];

  const { queryByTestId, getByTestId } = render(<TestComponent items={items} />);
  await wait();

  const inStock = getByTestId('pilltabs-pill-0');
  const filter2 = getByTestId('pilltabs-pill-1');
  const filter3 = getByTestId('pilltabs-pill-2');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).toHaveStyle(HIDDEN_STYLES);
  expect(filter3).toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('only the pills that fit are visible 2', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
      text: 'In stock',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 2',
      isActive: false,
      onClick,
    },
    {
      text: 'Filter 3',
      isActive: false,
      onClick,
    },
  ];

  const { queryByTestId, getByTestId } = render(<TestComponent items={items} />);
  await wait();

  const inStock = getByTestId('pilltabs-pill-0');
  const filter2 = getByTestId('pilltabs-pill-1');
  const filter3 = getByTestId('pilltabs-pill-2');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter2).not.toHaveStyle(HIDDEN_STYLES);
  expect(filter3).toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);
});

test('it executes the given callback on click', () => {
  const onClick1 = jest.fn();
  const onClick2 = jest.fn();
  const item1 = {
    text: 'In stock',
    isActive: false,
    onClick: onClick1,
  };
  const item2 = {
    text: 'Not in stock',
    isActive: false,
    onClick: onClick2,
  };
  const items = [item1, item2];

  const { getByText } = render(<TestComponent items={items} />);
  const inStock = getByText('In stock');

  fireEvent.click(inStock);

  expect(onClick1).toHaveBeenCalledWith(item1);
  expect(onClick2).not.toHaveBeenCalled();
});

test('cannot click on a hidden item', async () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
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
  const onClick1 = jest.fn();
  const onClick2 = jest.fn();
  const item1 = {
    text: 'In stock',
    isActive: false,
    onClick: onClick1,
  };
  const item2 = {
    text: 'Not in stock',
    isActive: false,
    onClick: onClick2,
  };
  const items = [item1, item2];

  const { getByText, getByTestId } = render(<TestComponent items={items} />);

  await wait();
  const notInStock = getByText('Not in stock');
  const filter1 = getByTestId('pilltabs-pill-1');

  fireEvent.click(notInStock);

  expect(filter1).toHaveStyle(HIDDEN_STYLES);
  expect(onClick2).not.toHaveBeenCalled();
});
