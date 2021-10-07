import { Button, H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, NextLink, PageNavigation } from '../components';
import { MarginPropTable } from '../PropTables';

const MarginPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>
              Some of our components expose a simple way to modify their margin. The following example showcases the
              simples way to use the margin prop by giving it a <NextLink href="/spacing">Spacing</NextLink> value.
            </Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              <Button margin="medium">Example</Button>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Responsive breakpoints">
            <Text>
              You can also specify margins with an object to handle different margins with different{' '}
              <NextLink href="/breakpoints">breakpoints</NextLink>. All values must be of{' '}
              <NextLink href="/spacing">Spacing</NextLink> type.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <Button margin={{ mobile: 'none', tablet: 'medium', desktop: 'xLarge' }}>Example</Button>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <MarginPropTable />,
    },
  ];

  return (
    <>
      <H1>Margin</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default MarginPage;
