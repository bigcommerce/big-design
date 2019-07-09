import { Flex, Panel, ProgressCircle } from '@bigcommerce/big-design';
import { ProgressCircleSizes } from '@bigcommerce/big-design/dist/src/components/ProgressCircle/ProgressCircle';
import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

const label = 'percentage';
const defaultValue = 10;
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};

const sizes: ProgressCircleSizes[] = ['large', 'medium', 'small', 'xSmall'];

storiesOf('ProgressCircle', module).add('Overview', () => (
  <Panel margin={'large'}>
    <Flex alignItems="center" justifyContent="space-around">
      <ProgressCircle percent={number(label, defaultValue, options)} size={select('size', sizes, 'large')} />
      <ProgressCircle size={select('size', sizes, 'large')} variant={'indeterminant'} />
      <ProgressCircle error={true} size={select('size', sizes, 'large')} />
      <ProgressCircle isComplete={true} size={select('size', sizes, 'large')} />
    </Flex>
  </Panel>
));
