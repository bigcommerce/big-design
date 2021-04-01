import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { fireEvent, render } from '@testing-library/react';
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

  expect(inStock).toBeInTheDocument();
});

test('does not render dropdown if items fit', () => {
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

  expect(inStock).toBeInTheDocument();
  expect(dropdownToggle).not.toBeInTheDocument();
});

test('renders dropdown if items dont fit', () => {
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

  const inStock = getByText('Long filter name');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).toBeInTheDocument();
  expect(dropdownToggle).toBeInTheDocument();
});

test('renders all the filters if they fit', () => {
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

  const inStock = getByText('In stock');
  const filter2 = getByText('Filter 2');
  const filter3 = getByText('Filter 3');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).toBeInTheDocument();
  expect(filter2).toBeInTheDocument();
  expect(filter3).toBeInTheDocument();
  expect(dropdownToggle).not.toBeInTheDocument();
});

test('only the pills that fit are visible', () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
          return 350;
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

  const inStock = getByTestId('pilltabs-pill-0');
  const filter2 = getByTestId('pilltabs-pill-1');
  const filter3 = getByTestId('pilltabs-pill-2');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(filter2).toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(filter3).toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(dropdownToggle).toBeInTheDocument();
});

test('only the pills that fit are visible 2', () => {
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

  const inStock = getByTestId('pilltabs-pill-0');
  const filter2 = getByTestId('pilltabs-pill-1');
  const filter3 = getByTestId('pilltabs-pill-2');
  const dropdownToggle = queryByTestId('pilltabs-dropdown-toggle');

  expect(inStock).not.toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(filter2).not.toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(filter3).toHaveStyle({
    'z-index': -defaultTheme.zIndex.tooltip,
    position: 'absolute',
    visibility: 'hidden',
  });
  expect(dropdownToggle).toBeInTheDocument();
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

test('cannot click on a hidden item', () => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
        if (this.dataset.testid === 'pilltabs-wrapper') {
          return 400;
        }

        if (this.dataset.testid === 'pilltabs-pill-0') {
          return 350;
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

  const { getByText } = render(<TestComponent items={items} />);
  const notInStock = getByText('Not in stock');

  fireEvent.click(notInStock);

  expect(onClick2).not.toHaveBeenCalled();
});
