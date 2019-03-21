import { Box } from '@bigcommerce/plab';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Box', module)
  .add('Basic', () => <Box>I'm a Box</Box>)
  .add('With Border', () => (
    <>
      <Box border="box" margin="medium">
        With Border box
      </Box>
      <Box border="box" borderRadius="normal" margin="medium">
        With Border Radius
      </Box>
    </>
  ))
  .add('With Margin', () => <Box margin="medium">With Margin</Box>)
  .add('With Background', () => <Box backgroundColor="primary30">With Background Color</Box>)
  .add('With Elevation', () => (
    <>
      <Box elevation="floating" margin="medium">
        Floating
      </Box>
      <Box elevation="raised" margin="medium">
        Raised
      </Box>
    </>
  ));
