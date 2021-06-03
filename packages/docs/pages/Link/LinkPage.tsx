import { H1, H3, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview } from '../../components';
import { LinkPropTable, MarginPropTable } from '../../PropTables';

const LinkPage = () => (
  <>
    <H1>Link</H1>

    <Text>
      A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element attributes.{' '}
      <Link href="https://design.bigcommerce.com/components/links" target="_blank">
        Links Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Link href="#">Link Example</Link>
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>You can also include and external icon.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Link href="#" target="_blank" external>
        Learn More
      </Link>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>

    <LinkPropTable />

    <H2>Inherited Props</H2>
    <MarginPropTable collapsible />
  </>
);

export default LinkPage;
