import { Box, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, NextLink } from '../components';
import { PaddingPropTable } from '../PropTables';

const PaddingPage = () => {
  return (
    <>
      <H1>Padding</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          BigDesign provides <Code primary>padding</Code> prop which can be used in some of our components. Check out a
          components' prop table to see if it inherits this prop.
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
                    The following example showcases the simplest way to use the <Code primary>padding</Code> prop by
                    giving it a <NextLink href="/spacing">Spacing</NextLink> value.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box padding="medium" backgroundColor="secondary20">
                      Example
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'responsive-breakpoints',
              title: 'Responsive breakpoints',
              render: () => (
                <Fragment key="responsive-breakpoints">
                  <Text>
                    You can also specify paddings with an object to handle different paddings with different{' '}
                    <NextLink href="/breakpoints">breakpoints</NextLink>. All values must be of{' '}
                    <NextLink href="/spacing">Spacing</NextLink> type.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box
                      padding={{ mobile: 'none', tablet: 'medium', desktop: 'xLarge' }}
                      backgroundColor="secondary20"
                    >
                      Example
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <PaddingPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default PaddingPage;
