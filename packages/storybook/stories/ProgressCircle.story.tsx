import { Box, Flex, ProgressCircle } from '@bigcommerce/big-design';
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
  <Flex paddingTop={'large'} alignItems="center" justifyContent="center" direction="column">
    <Box paddingTop="large">
      <ProgressCircle percent={number(label, defaultValue, options)} size={select('size', sizes, 'large')} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle size={select('size', sizes, 'large')} variant={'indeterminant'} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle error={true} size={select('size', sizes, 'large')} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle isComplete={true} size={select('size', sizes, 'large')} />
    </Box>
  </Flex>
));
