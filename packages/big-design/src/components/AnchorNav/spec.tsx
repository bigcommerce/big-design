import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { useInView } from 'react-intersection-observer';

import 'jest-styled-components';
import { AnchorNav, AnchorNavElement } from './AnchorNav';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({
    ref: jest.fn(),
    inView: false,
  })),
}));

// dummy elements for testing.
const elements: AnchorNavElement[] = [
  { id: 'section1', label: 'Section 1', element: <div>Content 1</div> },
  { id: 'section2', label: 'Section 2', element: <div>Content 2</div> },
];

describe('AnchorNav Component', () => {
  // In each test, ensure that every element has a scrollIntoView implementation.
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    history.replaceState(null, '', '#');
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders navigation links and sections', () => {
    render(<AnchorNav elements={elements} />);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('clicking on a navigation link scrolls to the correct section, updates the URL hash, and marks it as active', () => {
    render(<AnchorNav elements={elements} />);

    const navLink1 = screen.getByText('Section 1');

    // Get the element for "section1" and assign a fresh mock.
    const section1El = document.getElementById('section1');

    expect(section1El).toBeDefined();

    if (section1El) {
      section1El.scrollIntoView = jest.fn();
    }

    const replaceStateSpy = jest.spyOn(history, 'replaceState');

    fireEvent.click(navLink1);

    expect(section1El?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#section1');
    expect(navLink1).toHaveClass('active');
    expect(navLink1).toHaveAttribute('aria-current', 'true');
  });

  it('activates a section based on the observer inView value', () => {
    // Override the default mock behavior: first section false, second section true.
    const inViewValues = [false, true];
    const mockUseInView = jest.fn().mockImplementation(() => ({
      ref: jest.fn(),
      inView: inViewValues.shift() ?? false,
    }));

    jest.mocked(useInView).mockImplementation(mockUseInView);

    render(<AnchorNav elements={elements} />);

    const navLink2 = screen.getByText('Section 2');

    expect(navLink2).toHaveClass('active');
    expect(navLink2).toHaveAttribute('aria-current', 'true');
  });

  it('scrolls to the section corresponding to the initial URL hash on load', () => {
    // Set the URL hash before rendering the component.
    history.replaceState(null, '', '#section2');

    render(<AnchorNav elements={elements} />);

    // Get the element for section2.
    const section2El = document.getElementById('section2');

    expect(section2El).toBeDefined();

    expect(section2El?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('resets the observer suspend after the timeout when scrolling', () => {
    jest.useFakeTimers();

    render(<AnchorNav elements={elements} />);

    const navLink1 = screen.getByText('Section 1');
    const section1El = document.getElementById('section1');

    expect(section1El).toBeDefined();

    if (section1El) {
      section1El.scrollIntoView = jest.fn();
    }

    fireEvent.click(navLink1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.click(navLink1);

    expect(section1El?.scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it('matches the snapshot', () => {
    const { container } = render(<AnchorNav elements={elements} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
