import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tooltip } from './Tooltip';

test('passes id to tooltip wrapper', async () => {
  render(
    <Tooltip id="test-id" placement="auto" trigger={<div>Trigger</div>}>
      Testing
    </Tooltip>,
  );

  const trigger = screen.getByText('Trigger');

  fireEvent.mouseOver(trigger);

  const testing = await screen.findByText('Testing');

  expect(testing.parentElement).toHaveAttribute('id', 'test-id');
});

test('hides tooltip by mouse leave', async () => {
  render(
    <Tooltip id="test-id" placement="auto" trigger={<div>Trigger</div>}>
      Testing
    </Tooltip>,
  );

  const trigger = screen.getByText('Trigger');

  fireEvent.mouseOver(trigger);

  let testing: HTMLElement | null = await screen.findByText('Testing');

  expect(testing).toBeVisible();

  fireEvent.mouseLeave(trigger);

  testing = screen.queryByText('Testing');

  expect(testing).not.toBeInTheDocument();
});

test('hides tooltip by Escape', async () => {
  render(
    <Tooltip id="test-id" placement="auto" trigger={<div>Trigger</div>}>
      Testing
    </Tooltip>,
  );

  const trigger = screen.getByText('Trigger');

  fireEvent.mouseOver(trigger);

  let testing: HTMLElement | null = await screen.findByText('Testing');

  expect(testing).toBeVisible();

  fireEvent.keyDown(trigger, { key: 'Escape' });

  testing = screen.queryByText('Testing');

  expect(testing).not.toBeInTheDocument();
});
