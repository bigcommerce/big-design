import { Box, Flex, H0, H1, H2, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview } from '../../components';

import { FlexItemPropTable, FlexPropTable } from './';

const ExampleBox: React.FC<{ num: string }> = ({ num }) => (
  <Box backgroundColor="secondary10" border="box" marginHorizontal="xSmall" padding="small">
    Item {num}
  </Box>
);

storiesOf('Flex', module).add('Overview', () => (
  <>
    <H0>Flex</H0>

    <Text>A flex container used for customizable layouts.</Text>

    <CodePreview scope={{ ExampleBox }}>
      {/* jsx-to-string:start */}
      <Flex alignContent="stretch" alignItems="stretch" direction="row" justifyContent="flex-start" wrap="nowrap">
        <Flex.Item alignSelf="auto" basis="auto" grow={0} order={0} shrink={1}>
          <ExampleBox num="1" />
        </Flex.Item>
        <Flex.Item alignSelf="auto" basis="auto" grow={0} order={0} shrink={1}>
          <ExampleBox num="2" />
        </Flex.Item>
        <Flex.Item alignSelf="auto" basis="auto" grow={0} order={0} shrink={1}>
          <ExampleBox num="3" />
        </Flex.Item>
        <Flex.Item alignSelf="auto" basis="auto" grow={0} order={0} shrink={1}>
          <ExampleBox num="4" />
        </Flex.Item>
      </Flex>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Flex</H2>

    <FlexPropTable />

    <H2>Flex.Item</H2>

    <FlexItemPropTable />

    <H1>Examples</H1>

    <Text>{/* Something */}</Text>

    <CodePreview scope={{ ExampleBox }}>
      {/* jsx-to-string:start */}
      <Flex justifyContent="space-between">
        <Flex.Item>
          <ExampleBox num="1" />
        </Flex.Item>
        <Flex.Item>
          <ExampleBox num="2" />
        </Flex.Item>
        <Flex.Item>
          <ExampleBox num="3" />
        </Flex.Item>
        <Flex.Item>
          <ExampleBox num="4" />
        </Flex.Item>
      </Flex>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>{/* Something */}</Text>

    <CodePreview scope={{ ExampleBox }}>
      {/* jsx-to-string:start */}
      <Flex wrap="wrap">
        <Flex.Item basis="100%">
          <ExampleBox num="1" />
        </Flex.Item>
        <Flex.Item basis="100%">
          <ExampleBox num="2" />
        </Flex.Item>
        <Flex.Item basis="100%">
          <ExampleBox num="3" />
        </Flex.Item>
        <Flex.Item basis="100%">
          <ExampleBox num="4" />
        </Flex.Item>
      </Flex>
      {/* jsx-to-string:end */}
    </CodePreview>

    {/* Grow, Order, Space-Between, Basis+Wrap */}
  </>
));
