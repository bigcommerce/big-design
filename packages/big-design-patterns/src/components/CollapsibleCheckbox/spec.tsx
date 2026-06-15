import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CollapsibleCheckbox } from './CollapsibleCheckbox';

test('renders the checkbox, trigger and (hidden) panel', () => {
  render(
    <CollapsibleCheckbox
      checked={false}
      label="Enable feature"
      onChange={jest.fn()}
      triggerTitle="Configure"
    >
      Panel content
    </CollapsibleCheckbox>,
  );

  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveTextContent('Configure');
  expect(screen.getByText('Panel content')).not.toBeVisible();
});

test('disables the trigger by default while unchecked', () => {
  render(
    <CollapsibleCheckbox
      checked={false}
      label="Enable feature"
      onChange={jest.fn()}
      triggerTitle="Configure"
    >
      Panel content
    </CollapsibleCheckbox>,
  );

  expect(screen.getByRole('button')).toBeDisabled();
});

test('collapseProps.disabled overrides the default gating', () => {
  render(
    <CollapsibleCheckbox
      checked={true}
      collapseProps={{ disabled: true }}
      label="Enable feature"
      onChange={jest.fn()}
      triggerTitle="Configure"
    >
      Panel content
    </CollapsibleCheckbox>,
  );

  expect(screen.getByRole('button')).toBeDisabled();
});

test('trigger is enabled and the panel can open while checked', () => {
  render(
    <CollapsibleCheckbox
      checked={true}
      label="Enable feature"
      onChange={jest.fn()}
      triggerTitle="Configure"
    >
      Panel content
    </CollapsibleCheckbox>,
  );

  const trigger = screen.getByRole('button');

  expect(trigger).toBeEnabled();

  fireEvent.click(trigger);

  expect(screen.getByText('Panel content')).toBeVisible();
});

test('forwards checked and onChange to the underlying checkbox', () => {
  const onChange = jest.fn();

  render(
    <CollapsibleCheckbox
      checked={true}
      label="Enable feature"
      onChange={onChange}
      triggerTitle="Configure"
    >
      Panel content
    </CollapsibleCheckbox>,
  );

  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(onChange).toHaveBeenCalledTimes(1);
});
