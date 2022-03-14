import { Button, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, NextLink } from '../components';
import { MarginPropTable } from '../PropTables';

const MarginPage = () => {
  return (
    <>
      <H1>Margin</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          BigDesign provides a <Code primary>margin</Code> prop which can be used for some of our components. Check out
          a component's prop table to see if the component inherits this prop.
        </Text>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    The following example showcases the simplest way to use the <Code primary>margin</Code> prop by
                    giving it a <NextLink href="/spacing">Spacing</NextLink> value.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Button margin="medium">Example</Button>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'responsive-breakpoints',
              title: 'Responsive breakpoints',
              render: () => (
                <Fragment>
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
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <MarginPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default MarginPage;
