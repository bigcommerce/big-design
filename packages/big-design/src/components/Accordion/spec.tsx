import { fireEvent, render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { Accordion } from './Accordion';

test('render Accordion in default state', () => {
  const { container } = render(<Accordion title="title" />);

  expect(container).toMatchSnapshot();
  expect(container.lastChild).toHaveStyle('display: none');
});

test('switch Accordion to expanded state', () => {
  const { container } = render(<Accordion title="title" />);
  const trigger = container.firstChild as HTMLDivElement;

  fireEvent.click(trigger);

  expect(container).toMatchSnapshot();
  expect(container.lastChild).toHaveStyle('display: flex');
});

test('toggle content visibility', () => {
  const { container } = render(<Accordion title="title" />);
  const trigger = container.firstChild as HTMLDivElement;

  fireEvent.click(trigger);

  expect(container).toMatchSnapshot();
  expect(container.lastChild).toHaveStyle('display: flex');

  fireEvent.click(trigger);

  expect(container).toMatchSnapshot();
  expect(container.lastChild).toHaveStyle('display: none');
});

test('toggle title', () => {
  let isExpanded = false;
  const setIsExpanded = jest.fn(() => (isExpanded = !isExpanded));
  const handleToggle = jest.fn(() => setIsExpanded());
  const { container, rerender } = render(
    <Accordion title={isExpanded ? 'Show less' : 'Show more'} onToggle={handleToggle} />,
  );
  const trigger = container.firstChild as HTMLDivElement;

  fireEvent.click(trigger);

  rerender(<Accordion title={isExpanded ? 'Show less' : 'Show more'} onToggle={handleToggle} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(handleToggle).toHaveBeenCalled();
  expect(isExpanded).toBe(true);
  expect(trigger.textContent).toBe('Show less');

  fireEvent.click(trigger);

  rerender(<Accordion title={isExpanded ? 'Show less' : 'Show more'} onToggle={handleToggle} />);

  expect(container.firstChild).toMatchSnapshot();
  expect(handleToggle).toHaveBeenCalled();
  expect(isExpanded).toBe(false);
  expect(trigger.textContent).toBe('Show more');
});
