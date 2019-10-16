import { Badge, Grid, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { BadgePropTable, MarginPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Badges</H0>

    <Text>
      Badges are used to quickly indicate status or information to a user visually. Each variant correlates to a
      specific status or value.{' '}
      <Link href="https://design.bigcommerce.com/components/badges" target="_blank">
        Badges Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Badge variant="success">active</Badge>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <BadgePropTable />

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />

    <H1>Variants</H1>

    <Text>
      There are four types of variants to choose from: <Code>success</Code>, <Code>secondary</Code>,{' '}
      <Code>warning</Code>, and <Code>danger</Code>. You can determine what type by using the{' '}
      <Code primary>variant</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, min-content)">
        <Badge variant="secondary">secondary</Badge>
        <Badge variant="success">success</Badge>
        <Badge variant="warning">warning</Badge>
        <Badge variant="danger">danger</Badge>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
