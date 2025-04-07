import { render } from '@testing-library/react';
import React from 'react';
import 'jest-styled-components';

import { AnchorNav, AnchorNavElement } from './AnchorNav';

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
window.HTMLElement.prototype.scrollIntoView = jest.fn();

beforeEach(() => {
  // Reset the hash before each test to avoid side effects
  window.location.hash = '';
});

test('renders default AnchorNav', () => {
  const elements: AnchorNavElement[] = [
    { id: 'section1', label: 'Section 1', element: <div>Content 1</div> },
    { id: 'section2', label: 'Section 2', element: <div>Content 2</div> },
  ];

  const { container } = render(<AnchorNav elements={elements} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(container.querySelector('.anchor-nav__list')).toBeInTheDocument();
});

test('renders AnchorNav with active section', () => {
  const elements: AnchorNavElement[] = [
    { id: 'section1', label: 'Section 1', element: <div>Content 1</div> },
    { id: 'section2', label: 'Section 2', element: <div>Content 2</div> },
  ];

  // Simulate an active section by setting the hash
  window.location.hash = '#section2';

  const { container } = render(<AnchorNav elements={elements} />);

  expect(container.querySelector('.anchor-nav__list')).toHaveTextContent('Section 2');
});

test('should handle section refs correctly', () => {
  const elements: AnchorNavElement[] = [
    { id: 'section1', label: 'Section 1', element: <div>Content 1</div> },
    { id: 'section2', label: 'Section 2', element: <div>Content 2</div> },
  ];

  const { container } = render(<AnchorNav elements={elements} />);

  expect(container.querySelector('.anchor-nav__list')).toBeInTheDocument();

  // Check if the section refs are being set correctly
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');

  expect(section1).toBeInTheDocument();
  expect(section2).toBeInTheDocument();
});
