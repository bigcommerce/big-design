import { Box, Flex, ProgressBar } from '@bigcommerce/big-design';
import { number } from '@storybook/addon-knobs';
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

storiesOf('ProgressBar', module).add('Linear', () => (
  <>
    <Box paddingTop="large">
      <ProgressBar percent={number(label, defaultValue, options)} />
    </Box>

    <Box paddingTop={'large'}>
      <ProgressBar behavior={'indeterminant'} />
    </Box>
  </>
));

storiesOf('ProgressBar', module).add('Circular', () => (
  <Flex justifyContent="space-around" paddingTop="large">
    <Flex.Item style={{ textAlign: 'center' }}>
      Large
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} percent={number(label, defaultValue, options)} size={'large'} />
      </Box>
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} behavior={'indeterminant'} size={'large'} />
      </Box>
    </Flex.Item>
    <Flex.Item style={{ textAlign: 'center' }}>
      Medium
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} percent={number(label, defaultValue, options)} size={'medium'} />
      </Box>
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} behavior={'indeterminant'} size={'medium'} />
      </Box>
    </Flex.Item>
    <Flex.Item style={{ textAlign: 'center' }}>
      Small
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} percent={number(label, defaultValue, options)} size={'small'} />
      </Box>
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} behavior={'indeterminant'} size={'small'} />
      </Box>
    </Flex.Item>
    <Flex.Item style={{ textAlign: 'center' }}>
      Extra Small
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} percent={number(label, defaultValue, options)} size={'xSmall'} />
      </Box>
      <Box paddingTop="large">
        <ProgressBar variant={'circular'} behavior={'indeterminant'} size={'xSmall'} />
      </Box>
    </Flex.Item>
  </Flex>
));
