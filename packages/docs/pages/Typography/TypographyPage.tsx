import { Box, Flex, H0, H1, H2, H3, H4, Link, Small, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, Collapsible } from '../../components';
import { MarginPropTable, TypographyPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Typography</H0>

    <Text>
      BigDesign comes with a collection of predefined typography components.{' '}
      <Link href="https://design.bigcommerce.com/components/typography">Typography Design Guidelines</Link>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <H0>Hero header - h0</H0>
        <H1>Page header - h1</H1>
        <H2>Panel header - h2</H2>
        <H3>Section header - h3</H3>
        <H4>Group header - h4</H4>
        <Text>Text - p</Text>
        <Small>Small text - small</Small>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text></Text>

    <H1>API</H1>

    <H2>Typography</H2>

    <TypographyPropTable />

    <H2>Inherited Props</H2>

    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>

    <H1>Examples</H1>

    <H2>Color</H2>

    <Text>
      Choose any color from our <Link href="/colors">color pallete</Link> to style your text color.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Flex flexDirection="column">
        <Text color="primary40">This color is primary40</Text>
        <Text color="danger70">This color is danger70</Text>
        <Text color="success50">This color is success50</Text>
      </Flex>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Ellipse</H2>

    <Text>
      Setting the <Code>ellipsis</Code> prop, will allow text to overflow nicely.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Box style={{ maxWidth: '400px' }}>
        <H0 ellipsis>Indexes start at 0 and so do our headers.</H0>
      </Box>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
