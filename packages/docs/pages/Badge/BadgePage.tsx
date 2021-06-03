import { Badge, Grid, H1, H3, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { BadgePropTable, MarginPropTable } from '../../PropTables';

const BadgePage = () => (
  <>
    <H1>Badges</H1>

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
      <Badge label="active" variant="success" />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>
    <BadgePropTable />

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />

    <H3>Variants</H3>

    <Text>
      There are five types of variants to choose from: <Code>success</Code>, <Code>secondary</Code>,{' '}
      <Code>warning</Code>, <Code>danger</Code>, and <Code>primary</Code>. You can determine what type by using the{' '}
      <Code primary>variant</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(5, min-content)">
        <Badge variant="secondary" label="secondary" />
        <Badge variant="success" label="success" />
        <Badge variant="warning" label="warning" />
        <Badge variant="danger" label="danger" />
        <Badge variant="primary" label="primary" />
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default BadgePage;
