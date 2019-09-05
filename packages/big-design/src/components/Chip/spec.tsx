import { fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { Chip } from './index';

test('renders correctly without the display icon', () => {
  const { container } = render(<Chip displayCloseIcon={false} id={1} label="Test Label" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('renders correctly with the display icon', () => {
  const { container } = render(<Chip displayCloseIcon={true} onRemove={jest.fn()} id={1} label="Test Label" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('calls the remove method if clicked', () => {
  const onRemove = jest.fn();
  const { container } = render(<Chip displayCloseIcon={true} onRemove={onRemove} id={1} label="Test Label" />);

  const icon = container.getElementsByTagName('svg');

  fireEvent.click(icon[0]);
  expect(onRemove).toHaveBeenCalled();
});
