import { Button, H0, H1, Link, Text } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

import { CodePreview } from '../../../components';

import { MarginPropTable } from './MarginPropTable';

export const MarginStory: React.FC = () => (
  <>
    <H0>Margin</H0>

    <Text>
      Some of our components expose a simple way to modify their margin. The following example showcases the simples way
      to use the margin prop by giving it a <Link onClick={linkTo('utilities--spacing') as any}>Spacing</Link> value.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Button margin="medium">Example</Button>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>
      You can also specify margins with an object to handle different margins with different
      <Link onClick={linkTo('utilities--breakpoints') as any}> breakpoints</Link>. All values must be of
      <Link onClick={linkTo('utilities--spacing') as any}> Spacing</Link> type.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Button margin={{ mobile: 'none', tablet: 'medium', desktop: 'xLarge' }}>Example</Button>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <MarginPropTable />
  </>
);
