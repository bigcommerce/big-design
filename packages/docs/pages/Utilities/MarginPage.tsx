import { Button, H0, H1, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
import { MarginPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Margin</H0>

    <Text>
      Some of our components expose a simple way to modify their margin. The following example showcases the simples way
      to use the margin prop by giving it a <Link href="/utilities/spacing">Spacing</Link> value.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Button margin="medium">Example</Button>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>
      You can also specify margins with an object to handle different margins with different
      <Link href="/utilities/breakpoints"> breakpoints</Link>. All values must be of
      <Link href="/utilities/spacing"> Spacing</Link> type.
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
