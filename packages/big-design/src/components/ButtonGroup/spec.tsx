import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { ButtonGroup } from './ButtonGroup';

const HIDDEN_STYLES = {
  'z-index': -defaultTheme.zIndex.tooltip,
  position: 'absolute',
  visibility: 'hidden',
};

const originalPrototype = Object.getOwnPropertyDescriptors(window.HTMLElement.prototype);

beforeAll(() => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get() {
        if (this.dataset.testid === 'button-group-wrapper') {
          return 300;
        }

        if (this.dataset.testid === 'button-group-dropdown-toggle') {
          return 50;
        }

        return 100;
      },
    },
  });
});

afterAll(() => Object.defineProperties(window.HTMLElement.prototype, originalPrototype));

test('renders all actions if they are fit', () => {
  const { container, getByTestId } = render(<ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }]} />);

  expect(container).toMatchSnapshot();

  expect(getByTestId('button-group-action-0')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByTestId('button-group-action-1')).not.toHaveStyle(HIDDEN_STYLES);

  expect(getByTestId('button-group-dropdown-toggle')).toHaveStyle(HIDDEN_STYLES);
});

test('renders dropdown if buttons do not fit', () => {
  const { container, getByTestId } = render(
    <ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }]} />,
  );

  expect(container).toMatchSnapshot();

  expect(getByTestId('button-group-action-0')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByTestId('button-group-action-1')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByTestId('button-group-action-2')).toHaveStyle(HIDDEN_STYLES);

  expect(getByTestId('button-group-dropdown-toggle')).not.toHaveStyle(HIDDEN_STYLES);
});

test('executes the given callback on click for button inside dropdown', () => {
  const onClick = jest.fn();

  const { getByTestId, getAllByRole } = render(
    <ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3', onClick }]} />,
  );

  fireEvent.click(getByTestId('button-group-dropdown-toggle-button'));

  const option = getAllByRole('option')[0];

  fireEvent.click(option);

  expect(onClick).toHaveBeenCalled();
});
