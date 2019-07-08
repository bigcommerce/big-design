import { Box, Flex, ProgressCircle } from '@bigcommerce/big-design';
import { ProgressCircleSizes } from '@bigcommerce/big-design/dist/src/components/ProgressCircle/ProgressCircle';
import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

const label = 'Percentage';
const defaultValue = 10;
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 10,
};

const sizes: ProgressCircleSizes[] = ['large', 'medium', 'small', 'xSmall'];

storiesOf('ProgressCircle', module).add('Overview', () => (
  <Flex paddingTop={'large'} alignItems="center" justifyContent="center" direction="column">
    <Box paddingTop="large">
      <ProgressCircle percent={number(label, defaultValue, options)} size={select('placement', sizes, 'large')} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle behavior={'indeterminant'} size={select('placement', sizes, 'large')} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle error={true} size={select('placement', sizes, 'large')} />
    </Box>
    <Box paddingTop="large">
      <ProgressCircle isComplete={true} size={select('placement', sizes, 'large')} />
    </Box>
  </Flex>
));
