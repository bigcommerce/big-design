import { Box } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import BoxReadme from '../../big-design/src/components/Box/README.md';

storiesOf('Box', module)
  .addParameters({
    readme: {
      content: BoxReadme,
    },
  })
  .add('Basic', () => <Box>I'm a Box</Box>)
  .add('With Border', () => (
    <>
      <Box border="box">With Border box</Box>
      <Box border="box" borderRadius="normal" marginTop="medium">
        With Border Radius
      </Box>
    </>
  ))
  .add('With Margin', () => <Box margin="medium">With Margin</Box>)
  .add('With Background', () => <Box backgroundColor="primary30">With Background Color</Box>)
  .add('With Elevation', () => (
    <>
      <Box elevation="floating">Floating</Box>
      <Box elevation="raised" marginTop="medium">
        Raised
      </Box>
    </>
  ));
