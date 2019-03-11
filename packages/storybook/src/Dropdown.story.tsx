import { Dropdown, Flex } from '@bigcommerce/plab';
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
  <Flex justifyContent="space-around">
    <Dropdown maxHeight={number('maxHeight', 300)} placement={select('placement', placement, 'bottom')}>
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
    </Dropdown>

    <Dropdown maxHeight={number('maxHeight', 300)} placement={select('placement', placement, 'bottom')}>
      <Dropdown.Item>
        <a href="#">Option</a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a href="#">Option</a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a href="#">Option</a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a href="#">Option</a>
      </Dropdown.Item>
    </Dropdown>
  </Flex>
));
