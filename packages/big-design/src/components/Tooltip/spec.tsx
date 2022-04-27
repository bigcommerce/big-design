import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tooltip } from './Tooltip';

test('passes id to tooltip wrapper', async () => {
  render(
    <Tooltip id="test-id" placement="auto" trigger="Trigger">
      Testing
    </Tooltip>,
  );

  const trigger = screen.getByText('Trigger');

  fireEvent.mouseOver(trigger);

  const testing = await screen.findByText('Testing');

  expect(testing.parentElement).toHaveAttribute('id', 'test-id');
});
