import { Box, H0, H1, H2, H3, H4, HR, Panel, Small, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List, NextLink } from '../components';
import { HeadingPropTable, HRPropTable, MarginPropTable, TextPropTable, TypographyPropTable } from '../PropTables';

const TypographyPage = () => {
  return (
    <>
      <H1>Typography</H1>

      <Panel header="Overview" headerId="overview">
        <Text>BigCommerce uses Source Sans Pro for all text, with different weights for headings and subtext.</Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Use hero headers only for content-focused pages, e.g. a feature discovery page.</List.Item>
          <List.Item>Use page headers at the top of page as a title.</List.Item>
          <List.Item>Use panel headers to give titles to individual panels.</List.Item>
          <List.Item>Use section headers to break up content within a panel.</List.Item>
          <List.Item>Use labels to identify functionality, like inputs or discrete data displays.</List.Item>
          <List.Item>
            Use body regular to convey information in complete sentences or paragraphs to the user within panels.
          </List.Item>
          <List.Item>Use body small for supplementary information (e.g. the description for an input).</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'heading',
              title: 'Heading',
              render: () => (
                <CodePreview key="heading">
                  {/* jsx-to-string:start */}
                  <>
                    <H0>Hero header - h0</H0>
                    <H1>Page header - h1</H1>
                    <H2>Panel header - h2</H2>
                    <H3>Section header - h3</H3>
                    <H4>Group header - h4</H4>
                  </>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'text',
              title: 'Text',
              render: () => (
                <CodePreview key="text">
                  {/* jsx-to-string:start */}
                  <>
                    <Text>Text - p</Text>
                    <Small>Small text - small</Small>
                  </>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'hr',
              title: 'HR',
              render: () => (
                <CodePreview key="hr">
                  {/* jsx-to-string:start */}
                  <HR marginVertical="large" />
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'color',
              title: 'Color',
              render: () => (
                <Fragment key="color">
                  <Text>
                    Choose any color from our <NextLink href="/colors">color pallete</NextLink> to style your text
                    color.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Text color="primary40">This color is primary40</Text>
                      <Text color="danger70">This color is danger70</Text>
                      <Text color="success50">This color is success50</Text>
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'text-modifiers',
              title: 'Text modifiers',
              render: () => (
                <CodePreview key="text-modifiers">
                  {/* jsx-to-string:start */}
                  <>
                    <Text bold>This text is bold.</Text>
                    <Text italic>This text is italic.</Text>
                    <Text strikethrough>This text is strikethrough.</Text>
                    <Text underline>This text is underlined.</Text>
                    <Text uppercase>This text is uppercase.</Text>
                    <Text lowercase>This text is lowercase.</Text>
                    <Text capitalize>This text is capitalized.</Text>
                    <Text bold uppercase>
                      This text is bold and uppercase.
                    </Text>
                  </>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'overflow',
              title: 'Overflow',
              render: () => (
                <Fragment key="overflow">
                  <Text>
                    Setting the <Code>ellipsis</Code> prop, will allow text to overflow nicely.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box style={{ maxWidth: '200px' }}>
                      <Text ellipsis>Indexes start at 0 and so do our headers.</Text>
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'different-tag',
              title: 'As a different tag',
              render: () => (
                <CodePreview key="different-tag">
                  {/* jsx-to-string:start */}
                  <Text as="span">This is a span.</Text>
                  {/* jsx-to-string:end */}
                </CodePreview>
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
              id: 'heading',
              title: 'Heading',
              render: () => (
                <HeadingPropTable
                  inheritedProps={
                    <>
                      <TypographyPropTable collapsible />
                      <MarginPropTable collapsible />
                    </>
                  }
                  renderPanel={false}
                />
              ),
            },
            {
              id: 'text',
              title: 'Text',
              render: () => (
                <TextPropTable
                  inheritedProps={
                    <>
                      <TypographyPropTable collapsible />
                      <MarginPropTable collapsible />
                    </>
                  }
                  renderPanel={false}
                />
              ),
            },
            {
              id: 'hr',
              title: 'HR',
              render: () => <HRPropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />,
            },
          ]}
        />
      </Panel>
    </>
  );
};

export default TypographyPage;
