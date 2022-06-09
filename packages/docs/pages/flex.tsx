import { Box, Flex, FlexItem, H1, Link, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import {
  Code,
  CodePreview,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
  NextLink,
} from '../components';
import {
  BoxPropTable,
  DisplayPropTable,
  FlexItemPropTable,
  FlexPropTable,
  MarginPropTable,
  PaddingPropTable,
} from '../PropTables';

const ExampleBox: React.FC<{ vertical?: boolean }> = ({ children, vertical }) => (
  <Box
    backgroundColor="secondary20"
    border="box"
    marginHorizontal={vertical ? 'none' : 'xSmall'}
    marginVertical={vertical ? 'xSmall' : 'none'}
    padding="small"
  >
    {children}
  </Box>
);

const FlexPage = () => {
  return (
    <>
      <H1>Flex</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>Flex</Code> component extends the <Code primary>Box</Code> utility
          component and provides a{' '}
          <Link
            external
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex"
            rel="external nofollow noreferrer"
            target="_blank"
          >
            CSS flexbox
          </Link>{' '}
          container alongside flexbox properties.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>Want to lay a collection of items out in one direction or another.</List.Item>
          <List.Item>
            Want to control the dimensions of the items in that one dimension, or control the
            spacing between items.
          </List.Item>
          <List.Item>Justify or vertically align items as needed.</List.Item>
          <List.Item>Mostly used for simple one dimensional layouts.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <CodePreview key="basic" scope={{ ExampleBox }}>
                  {/* jsx-to-string:start */}
                  <Flex
                    alignContent="stretch"
                    alignItems="stretch"
                    flexDirection="row"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                  >
                    <FlexItem
                      alignSelf="auto"
                      flexBasis="auto"
                      flexGrow={0}
                      flexOrder={0}
                      flexShrink={1}
                    >
                      <ExampleBox>Item 1</ExampleBox>
                    </FlexItem>
                    <FlexItem
                      alignSelf="auto"
                      flexBasis="auto"
                      flexGrow={0}
                      flexOrder={0}
                      flexShrink={1}
                    >
                      <ExampleBox>Item 2</ExampleBox>
                    </FlexItem>
                    <FlexItem
                      alignSelf="auto"
                      flexBasis="auto"
                      flexGrow={0}
                      flexOrder={0}
                      flexShrink={1}
                    >
                      <ExampleBox>Item 3</ExampleBox>
                    </FlexItem>
                    <FlexItem
                      alignSelf="auto"
                      flexBasis="auto"
                      flexGrow={0}
                      flexOrder={0}
                      flexShrink={1}
                    >
                      <ExampleBox>Item 4</ExampleBox>
                    </FlexItem>
                  </Flex>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'justify-content',
              title: 'Justify content',
              render: () => (
                <Fragment key="justify-content">
                  <Text>
                    Flex container's can space their element with uniform spacing in-between each
                    flex item using the <Code primary>justifyContent</Code> prop.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    <Flex justifyContent="space-between">
                      <FlexItem>
                        <ExampleBox>Item 1</ExampleBox>
                      </FlexItem>
                      <FlexItem>
                        <ExampleBox>Item 2</ExampleBox>
                      </FlexItem>
                      <FlexItem>
                        <ExampleBox>Item 3</ExampleBox>
                      </FlexItem>
                      <FlexItem>
                        <ExampleBox>Item 4</ExampleBox>
                      </FlexItem>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'column-layout',
              title: 'Column layout',
              render: () => (
                <Fragment key="column-layout">
                  <Text>
                    One way of creating a column based layout is using a combination of the{' '}
                    <Code primary>flexWrap</Code> prop on the flex container with an additional{' '}
                    <Code primary>flexBasis</Code> prop on the flex items.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    <Flex flexWrap="wrap">
                      <FlexItem flexBasis="100%">
                        <ExampleBox vertical>Item 1</ExampleBox>
                      </FlexItem>
                      <FlexItem flexBasis="100%">
                        <ExampleBox vertical>Item 2</ExampleBox>
                      </FlexItem>
                      <FlexItem flexBasis="100%">
                        <ExampleBox vertical>Item 3</ExampleBox>
                      </FlexItem>
                      <FlexItem flexBasis="100%">
                        <ExampleBox vertical>Item 4</ExampleBox>
                      </FlexItem>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'sort-content',
              title: 'Sort content',
              render: () => (
                <Fragment key="sort-content">
                  <Text>
                    Using the <Code primary>flexOrder</Code> prop you can reorganize content based
                    on the size generated by setting the <Code primary>flexGrow</Code> prop.{' '}
                    <Code primary>flexGrow</Code> allows the flex items to grow relative to the flex
                    container's width.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    <Flex>
                      <FlexItem flexGrow={2} flexOrder={2}>
                        <ExampleBox>Item 1</ExampleBox>
                      </FlexItem>
                      <FlexItem flexOrder={4}>
                        <ExampleBox>Item 2</ExampleBox>
                      </FlexItem>
                      <FlexItem flexGrow={4} flexOrder={1}>
                        <ExampleBox>Item 3</ExampleBox>
                      </FlexItem>
                      <FlexItem flexGrow={1} flexOrder={3}>
                        <ExampleBox>Item 4</ExampleBox>
                      </FlexItem>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'flex',
              title: 'Flex',
              render: () => (
                <FlexPropTable
                  inheritedProps={
                    <>
                      <BoxPropTable collapsible />
                      <DisplayPropTable collapsible />
                      <MarginPropTable collapsible />
                      <PaddingPropTable collapsible />
                    </>
                  }
                />
              ),
            },
            {
              id: 'flex-item',
              title: 'FlexItem',
              render: () => (
                <FlexItemPropTable
                  inheritedProps={
                    <>
                      <BoxPropTable collapsible />
                      <DisplayPropTable collapsible />
                      <MarginPropTable collapsible />
                      <PaddingPropTable collapsible />
                    </>
                  }
                />
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t use <Code primary>Flex</Code> when focusing on 2-dimensional flow. Use{' '}
              <NextLink href="grid">Grid</NextLink> instead.
            </>,
            <>
              Don't use <Code primary>FlexItem</Code> if children don't have specific flex
              properties.
            </>,
          ]}
          recommended={[
            <>
              Use <Code primary>Flex</Code> when focusing on 1-dimensional or content flow.
            </>,
            <>
              Use <Code primary>FlexItem</Code> when children need specific flex properties.
            </>,
            <>
              Use{' '}
              <Link
                external
                href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
                rel="external nofollow noreferrer"
                target="_blank"
              >
                CSS-Tricks complete guide
              </Link>{' '}
              to flexbox.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default FlexPage;
