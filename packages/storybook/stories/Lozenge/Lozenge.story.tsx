import { Grid, H0, H1, Link, Lozenge, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Code, CodePreview } from '../../components';

import { LozengePropTable } from './LozengePropTable';

storiesOf('Lozenge', module).add('Overview', () => (
  <>
    <H0>Lozenges</H0>
    <Text>
      Lozenges are used to quickly indicate status or information to a user visually. Each variant correlates to a
      specific status or value.{' '}
      <Link href="https://bigcommerce.design/badges" target="_blank">
        Badges Design Guidelines
      </Link>
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Lozenge variant="primary">ACTIVE</Lozenge>
      {/* jsx-to-string:end */}
    </CodePreview>
    <H1>API</H1>
    <LozengePropTable />
    <H1>Variants</H1>
    <Text>
      There are five types of variants to choose from: <Code>primary</Code>, <Code>secondary</Code>,{' '}
      <Code>success</Code>, <Code>warning</Code>, and <Code>danger</Code>. You can determine what type by using the{' '}
      <Code primary>variant</Code> prop.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(5, min-content)">
        <Lozenge variant="primary">PRIMARY</Lozenge>
        <Lozenge variant="secondary">SECONDARY</Lozenge>
        <Lozenge variant="success">SUCCESS</Lozenge>
        <Lozenge variant="warning">WARNING</Lozenge>
        <Lozenge variant="danger">DANGER</Lozenge>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
));
