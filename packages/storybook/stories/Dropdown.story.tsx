import { Box, Button, Dropdown, Flex, Link, PlusIcon } from '@bigcommerce/big-design';
import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Placement } from 'popper.js';
import React from 'react';

const placement: Placement[] = [
  'auto',
  'auto-end',
  'auto-start',
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

storiesOf('Dropdown', module).add('Overview', () => (
  <Box paddingTop="large">
    <Flex justifyContent="space-around">
      <Dropdown
        maxHeight={number('maxHeight', 300)}
        onActionClick={() => null}
        onItemClick={value => value}
        placement={select('placement', placement, 'bottom')}
        trigger={<Button>Open Menu</Button>}
      >
        <Dropdown.Item value={1}>Option</Dropdown.Item>
        <Dropdown.Item value={2}>Option</Dropdown.Item>
        <Dropdown.Item value={3}>Option</Dropdown.Item>
        <Dropdown.Item value={4}>Option</Dropdown.Item>
        <Dropdown.Item value={5}>Option</Dropdown.Item>
        <Dropdown.Item value={6}>Option</Dropdown.Item>
        <Dropdown.Item value={7}>Option</Dropdown.Item>
        <Dropdown.Item value={8}>Option</Dropdown.Item>
        <Dropdown.Item value={9}>Option</Dropdown.Item>
        <Dropdown.Item value={10}>Option</Dropdown.Item>
        <Dropdown.Item value={11}>Option</Dropdown.Item>
        <Dropdown.Item value={12}>Option</Dropdown.Item>
        <Dropdown.Item value={13}>Option</Dropdown.Item>
        <Dropdown.Item value={14}>Option</Dropdown.Item>
        <Dropdown.Item value={15}>Option</Dropdown.Item>
        <Dropdown.Item value={16}>Option</Dropdown.Item>
        <Dropdown.Action iconLeft={<PlusIcon />} actionType="normal">
          Action
        </Dropdown.Action>
      </Dropdown>

      <Dropdown trigger={<Button variant="secondary">Open Menu</Button>}>
        <Dropdown.Item>
          <Link>Link</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link>Link</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link>Link</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link>Link</Link>
        </Dropdown.Item>
        <Dropdown.Action iconLeft={<PlusIcon />} actionType="destructive">
          Action
        </Dropdown.Action>
      </Dropdown>
    </Flex>
  </Box>
));
