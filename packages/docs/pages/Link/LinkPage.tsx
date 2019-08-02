import { H0, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, Collapsible } from '../../components';
import { MarginPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Link</H0>

    <Text>
      A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element attributes.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Link href="#">Link Example</Link>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Inherited Props</H2>

    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>
  </>
);
