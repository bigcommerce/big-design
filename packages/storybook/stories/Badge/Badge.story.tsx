import { Badge, Grid, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Code, CodePreview, Collapsible } from '../../components';
import { MarginPropTable } from '../Utilities/index';

import { BadgePropTable } from './BadgePropTable';

storiesOf('Badge', module).add('Overview', () => (
  <>
    <H0>Badges</H0>
    <Text>
      Badges are used to quickly indicate status or information to a user visually. Each variant correlates to a
      specific status or value.{' '}
      <Link href="https://bigcommerce.design/badges" target="_blank">
        Badges Design Guidelines
      </Link>
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Badge variant="success">ACTIVE</Badge>
      {/* jsx-to-string:end */}
    </CodePreview>
    <H1>API</H1>
    <BadgePropTable />
    <H2>Inherited Props</H2>
    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>
    <H1>Variants</H1>
    <Text>
      There are four types of variants to choose from: <Code>success</Code>, <Code>secondary</Code>,{' '}
      <Code>warning</Code>, and <Code>danger</Code>. You can determine what type by using the{' '}
      <Code primary>variant</Code> prop.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(4, min-content)">
        <Badge variant="secondary">SECONDARY</Badge>
        <Badge variant="success">SUCCESS</Badge>
        <Badge variant="warning">WARNING</Badge>
        <Badge variant="danger">DANGER</Badge>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
));
