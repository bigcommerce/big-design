import { Box, ProgressBar } from '@bigcommerce/big-design';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

const label = 'percentage';
const defaultValue = 10;
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 10,
};

storiesOf('ProgressBar', module).add('Overview', () => (
  <>
    <Box>
      <ProgressBar percent={number(label, defaultValue, options)} />
    </Box>

    <Box paddingTop={'large'}>
      <ProgressBar variant={'indeterminant'} />
    </Box>
  </>
));
