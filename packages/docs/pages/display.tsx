import { Box, H1, Link, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, NextLink } from '../components';
import { DisplayPropTable } from '../PropTables';

const DisplayPage = () => {
  return (
    <>
      <H1>Display</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>display</Code> is a dynamic and responsive{' '}
          <Link
            external
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/display"
            rel="external nofollow noreferrer"
            target="_blank"
          >
            CSS display
          </Link>{' '}
          property.
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
                    A few of our components expose a <Code primary>display</Code> prop in order to
                    change the CSS display property. See a components prop table to see if this prop
                    exists.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box
                      backgroundColor="secondary20"
                      border="box"
                      display="inline-block"
                      padding="medium"
                    >
                      Boxed content
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'responsive',
              title: 'Responsive',
              render: () => (
                <Fragment key="responsive">
                  <Text>
                    It's also possible to use the prop with responsive{' '}
                    <NextLink href="/breakpoints">breakpoints</NextLink>:
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Box
                        backgroundColor="secondary20"
                        border="box"
                        display={{ mobile: 'none', tablet: 'inline-block' }}
                        padding="medium"
                      >
                        Boxed content hidden on mobile.
                      </Box>
                      <Box
                        backgroundColor="primary10"
                        border="box"
                        display={{ mobile: 'block', tablet: 'none' }}
                        padding="medium"
                      >
                        Boxed content hidden on tablet.
                      </Box>
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <DisplayPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don't use <Code>display="none"</Code> directly on a component, instead don't render
              it.
            </>,
          ]}
          recommended={['Use the display prop for responsiveness.']}
        />
      </Panel>
    </>
  );
};

export default DisplayPage;
