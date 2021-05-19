import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { fireEvent, render, wait } from '@testing-library/react';
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
          return 400;
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
  const { getByText, getByTestId } = render(<ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }]} />);

  expect(getByText('button 1')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByText('button 2')).not.toHaveStyle(HIDDEN_STYLES);

  expect(getByTestId('button-group-dropdown-toggle')).toHaveStyle(HIDDEN_STYLES);
});

test('renders dropdown with elements that do not fit', async () => {
  const { getByText, getByTestId, getAllByRole } = render(
    <ButtonGroup actions={[{ text: 'button 1' }, { text: 'button 2' }, { text: 'button 3' }, { text: 'button 4' }]} />,
  );

  await wait();

  const dropdownToggle = getByTestId('button-group-dropdown-toggle');

  expect(getByText('button 1')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByText('button 2')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByText('button 3')).not.toHaveStyle(HIDDEN_STYLES);
  expect(getByText('button 4')).not.toHaveStyle(HIDDEN_STYLES);
  expect(dropdownToggle).not.toHaveStyle(HIDDEN_STYLES);

  fireEvent.click(dropdownToggle);

  const options = getAllByRole('option');

  expect(options).toHaveLength(1);
  expect(options[0].textContent).toEqual('button 5');
});
