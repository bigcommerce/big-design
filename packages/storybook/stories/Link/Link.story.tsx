import { H0, H2, Link, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview } from '../../components';
import { Collapsible } from '../../components/Collapsible';
import { MarginPropTable } from '../Utilities/Margin';

storiesOf('Link', module).add('Overview', () => (
  <>
    <H0>Link</H0>

    <Text>
      A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element attributes.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Link href="https://www.bigcommerce.com" target="_blank">
        Learn more
      </Link>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Inherited Props</H2>

    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>
  </>
));
