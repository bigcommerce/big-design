import { Box, Grid, GridItem, H1, Link, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List, NextLink } from '../components';
import {
  BoxPropTable,
  DisplayPropTable,
  GridItemPropTable,
  GridPropTable,
  MarginPropTable,
  PaddingPropTable,
} from '../PropTables';

const ExampleBox: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Box backgroundColor="secondary20" border="box" padding="small" style={{ height: '100%' }}>
    {children}
  </Box>
);

const GridPage = () => {
  return (
    <>
      <H1>Grid</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>Grid</Code> component extends the <Code primary>Box</Code> utility component and provides a{' '}
          <Link
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid"
            external
            target="_blank"
            rel="external nofollow noreferrer"
          >
            CSS grid
          </Link>{' '}
          container alongside grid properties.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Use with two-dimensional layouts (columns and rows).</List.Item>
          <List.Item>When you care about the exact positioning of elements.</List.Item>
          <List.Item>Used on complex layouts.</List.Item>
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
                <Fragment key="basic">
                  <Text>
                    The <Code primary>Grid</Code> component is useful for creating intrinsically responsive layouts.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    <Grid>
                      <GridItem>
                        <ExampleBox>Item 1</ExampleBox>
                      </GridItem>
                      <GridItem>
                        <ExampleBox>Item 2</ExampleBox>
                      </GridItem>
                      <GridItem>
                        <ExampleBox>Item 3</ExampleBox>
                      </GridItem>
                      <GridItem>
                        <ExampleBox>Item 4</ExampleBox>
                      </GridItem>
                    </Grid>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'custom-layout',
              title: 'Custom layout',
              render: () => (
                <Fragment key="custom-layout">
                  <Text>
                    <Code primary>Grid</Code> allows you to create custom layouts using combinations of{' '}
                    <Code>gridTemplate</Code> and <Code>gridArea</Code> props.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const template = `
                      "head head" 80px
                      "nav  main" 200px
                      "foot  foot" 50px
                      / 1fr 5fr;
                      `;

                      return (
                        <Grid gridTemplate={template}>
                          <GridItem gridArea="head">
                            <ExampleBox>Header</ExampleBox>
                          </GridItem>
                          <GridItem gridArea="nav">
                            <ExampleBox>Sidebar</ExampleBox>
                          </GridItem>
                          <GridItem gridArea="main">
                            <ExampleBox>Content</ExampleBox>
                          </GridItem>
                          <GridItem gridArea="foot">
                            <ExampleBox>Footer</ExampleBox>
                          </GridItem>
                        </Grid>
                      );
                    }}
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
                    You can use the <Code>gridColumns</Code> prop to create columned layouts.
                  </Text>

                  <CodePreview scope={{ ExampleBox }}>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(3, 1fr)">
                      <GridItem>
                        <ExampleBox>
                          Reprehenderit ullamco et elit eu duis non reprehenderit eiusmod pariatur ea deserunt irure.
                          Reprehenderit et incididunt sit aute sint proident eu eiusmod pariatur Lorem nulla labore
                          irure nisi. Adipisicing do duis occaecat ipsum dolor ea. Qui consectetur sint eu nulla duis et
                          commodo anim commodo. Ullamco consectetur elit ullamco aliquip do id consectetur anim laborum.
                        </ExampleBox>
                      </GridItem>

                      <GridItem>
                        <ExampleBox>
                          In sit dolore culpa reprehenderit tempor laborum. Sit anim voluptate pariatur irure amet
                          mollit. Est mollit ad pariatur esse eu reprehenderit ut veniam. Aliquip anim mollit aliquip
                          quis officia minim esse laboris proident fugiat cillum. Eiusmod culpa eu ea eiusmod nostrud.
                        </ExampleBox>
                      </GridItem>

                      <GridItem>
                        <ExampleBox>
                          Ipsum adipisicing pariatur magna quis incididunt amet pariatur. Aliqua voluptate consequat ut
                          elit ea dolore officia reprehenderit exercitation dolore eiusmod cupidatat quis. Ullamco ipsum
                          do deserunt sunt ad deserunt ut. Elit non velit dolore ad est eu.
                        </ExampleBox>
                      </GridItem>
                    </Grid>
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
              id: 'grid',
              title: 'Grid',
              render: () => (
                <GridPropTable
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
              id: 'grid-item',
              title: 'GridItem',
              render: () => (
                <GridItemPropTable
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
          recommended={[
            <>
              Use{' '}
              <Link
                href="https://css-tricks.com/snippets/css/complete-guide-grid/"
                external
                target="_blank"
                rel="external nofollow noreferrer"
              >
                CSS-Tricks complete guide
              </Link>{' '}
              to grid.
            </>,
          ]}
          discouraged={[
            <>
              Don’t use <Code primary>Grid</Code> when focusing on content flow. Use{' '}
              <NextLink href="flex">Flex</NextLink> instead.
            </>,
            <>
              Don't use <Code primary>GridItem</Code> if children don't have specific grid properties.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default GridPage;
