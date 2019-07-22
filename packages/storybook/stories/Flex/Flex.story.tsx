import { Flex } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { FlexItemPropTable, FlexPropTable } from './';

storiesOf('Flex', module).add('Overview', () => (
  <>
    <Flex justifyContent="space-around" backgroundColor="warning30">
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
    </Flex>
    <Flex direction="column" backgroundColor="success30">
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} />
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} alignSelf="center" />
      <Flex.Item backgroundColor="primary" margin="small" style={{ height: 50, width: 50 }} alignSelf="flex-end" />
    </Flex>

    <FlexPropTable />
    <FlexItemPropTable />
  </>
));
