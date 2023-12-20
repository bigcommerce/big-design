import { Box, Flex, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable } from '../components';
import { BoxPropTable, DisplayPropTable, MarginPropTable, PaddingPropTable } from '../PropTables';

const BoxPage = () => {
  return (
    <>
      <H1>Box</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Box</Code> is a base component that is used to create other components.
          Using different values for properties like border, border radius, and drop shadow, it can
          be turned into form field, button, panel, etc.
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
                  <Text>Used as a simple container or as a base to build other components.</Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box
                      backgroundColor="secondary20"
                      border="box"
                      borderRadius="normal"
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
              id: 'shadows',
              title: 'Shadows',
              render: () => (
                <Fragment key="shadows">
                  <Text>
                    <Code primary>Box</Code> also supports multiple shadows, here is an example of
                    how they look like:
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Flex justifyContent="space-around">
                      <Box backgroundColor="secondary10" padding="xxLarge" shadow="floating">
                        Floating
                      </Box>
                      <Box backgroundColor="secondary10" padding="xxLarge" shadow="raised">
                        Raised
                      </Box>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'extending',
              title: 'Extending',
              render: () => (
                <Fragment key="extending">
                  <Text>
                    <Code primary>Box</Code> is extendable, here is an example on how to create an{' '}
                    <Code primary>Avatar</Code> component extending from <Code primary>Box</Code>{' '}
                    with a couple of extra styles:
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Avatar() {
                      const StyledBox = styled(Box)`
                        box-sizing: content-box;
                        height: ${({ theme }) => theme.spacing.large};
                        width: ${({ theme }) => theme.spacing.large};
                      `;

                      return (
                        <StyledBox
                          backgroundColor="secondary20"
                          border="box"
                          borderRadius="circle"
                          padding="medium"
                        >
                          BC
                        </StyledBox>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <BoxPropTable
          inheritedProps={
            <>
              <DisplayPropTable collapsible />
              <MarginPropTable collapsible />
              <PaddingPropTable collapsible />
            </>
          }
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={['Use any other corner radius values.']}
          recommended={[
            'Apply 4px corner radius for all rectangular standalone components.',
            'Apply raised drop shadow style to make the content on the grey background of the page stand out (panels).',
            'Apply floating drop shadow style for elements that appear on top of the content of the page (pop-overs, alerts, drop menus, etc.).',
          ]}
        />
      </Panel>
    </>
  );
};

export default BoxPage;
