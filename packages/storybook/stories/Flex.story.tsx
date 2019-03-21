import { Box, Flex } from '@bigcommerce/plab';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Flex', module).add('Overview', () => (
  <>
    <Flex justifyContent="space-around" backgroundColor="warning30">
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
    </Flex>
    <Flex flexDirection="column" backgroundColor="success30">
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Box backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
    </Flex>
  </>
));
