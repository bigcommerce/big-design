import { AddIcon } from '@bigcommerce/big-design-icons';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';

import { ButtonGroup } from './ButtonGroup';

test('renders button items', () => {
  const { container, getAllByRole } = render(
    <ButtonGroup items={[{ content: 'Button 1' }, { content: 'Button 2' }, { content: <AddIcon /> }]} />,
  );

  const items = getAllByRole('listitem');

  expect(items[0].textContent).toEqual('Button 1');
  expect(items[1].textContent).toEqual('Button 2');
  expect(items[2].textContent).toHaveLength(0);

  expect(container.querySelectorAll('svg')).toHaveLength(1);
});

test('renders dropdown item', async () => {
  const { getAllByRole, getByText } = render(
    <ButtonGroup
      items={[
        { content: 'Button 1' },
        {
          items: [
            { content: 'Edit', onItemClick: (item) => item, hash: 'edit' },
            {
              content: 'Duplicate',
              hash: 'duplicate',
              onItemClick: (item) => item,
            },
            {
              content: 'Copy',
              hash: 'copy',
              onItemClick: (item) => item,
            },
            {
              content: 'Delete',
              hash: 'delete',
              onItemClick: (item) => item,
            },
          ],
          maxHeight: 250,
          placement: 'bottom-start',
          toggle: {
            content: 'Button 2',
          },
        },
      ]}
    />,
  );

  const items = getAllByRole('listitem');

  expect(items[0].textContent).toEqual('Button 1');
  expect(items[1].textContent).toEqual('Button 2');

  fireEvent.click(items[1]);

  await waitForElement(() => getAllByRole('option'));

  expect(getByText('Edit')).toBeInTheDocument();
  expect(getByText('Duplicate')).toBeInTheDocument();
  expect(getByText('Copy')).toBeInTheDocument();
  expect(getByText('Delete')).toBeInTheDocument();
});
