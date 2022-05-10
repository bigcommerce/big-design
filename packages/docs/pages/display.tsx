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
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/display"
            external
            target="_blank"
            rel="external nofollow noreferrer"
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
                    A few of our components expose a <Code primary>display</Code> prop in order to change the CSS
                    display property. See a components prop table to see if this prop exists.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box display="inline-block" backgroundColor="secondary20" border="box" padding="medium">
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
                        display={{ mobile: 'none', tablet: 'inline-block' }}
                        backgroundColor="secondary20"
                        border="box"
                        padding="medium"
                      >
                        Boxed content hidden on mobile.
                      </Box>
                      <Box
                        display={{ mobile: 'block', tablet: 'none' }}
                        backgroundColor="primary10"
                        border="box"
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
          recommended={['Use the display prop for responsiveness.']}
          discouraged={[
            <>
              Don't use <Code>display="none"</Code> directly on a component, instead don't render the it.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default DisplayPage;
