import { Box, Button, Flex, H1, Panel, Table, Text } from '@bigcommerce/big-design';
import React, { Fragment, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Code, CodePreview, ContentRoutingTabs, List, NextLink } from '../components';

// If your theme exports a SPACING_KEYS array, prefer importing it:
// import { SPACING_KEYS } from '@bigcommerce/big-design-theme';

// Keep this local list in docs to control order & avoid negatives/none in the visual demo.
// (If you later export SPACING_KEYS from the theme, swap to that single source of truth.)
const BASE_KEYS = [
  'xxxLarge',
  'xxLarge',
  'xLarge',
  'large',
  'medium',
  'small',
  'xSmall',
  'xxSmall',
  'none',
];

const BlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  display: 'inline-block',
  height: theme.spacing.large,
  width: theme.spacing.large,
}));

const SpacingPage = () => {
  const { spacing } = useContext(ThemeContext);

  return (
    <>
      <H1>Spacing</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          BigDesign core theme provides a pre-defined set of spacing values that are primarily used
          with any of the <Code primary>padding</Code> and <Code primary>margin</Code> props. There
          are a few ways we can consume these values.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Using the <NextLink href="/margin">Margin</NextLink> and{' '}
            <NextLink href="/padding">Padding</NextLink> props.
          </List.Item>
          <List.Item>Consuming spacing from the theme in custom components.</List.Item>
          <List.Item>
            Using negative spacing tokens (e.g. <Code>xSmallN</Code>) for controlled overlap or
            gutter adjustments.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'property',
              title: 'Applying to a property',
              render: () => (
                <Fragment key="property">
                  <Text>
                    Certain components will include <Code primary>padding</Code> and{' '}
                    <Code primary>margin</Code> props. You can use the spacing keys to apply spacing
                    values to those props.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Button marginRight="medium">Button</Button>
                      <Button>Button</Button>
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'style',
              title: 'Applying to a style',
              render: () => (
                <Fragment key="style">
                  <Text>You can also read spacing directly from the theme in styled code.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const StyledBox = styled(Box)(({ theme }) => ({
                        backgroundColor: theme.colors.primary,
                        height: theme.spacing.large,
                        width: theme.spacing.large,
                      }));

                      return <StyledBox />;
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'negative',
              title: 'Negative spacing',
              render: () => (
                <Fragment key="negative">
                  <Text>
                    Every positive token has a negative counterpart formed by appending{' '}
                    <Code>N</Code>. These are especially useful for collapsing gutters or creating
                    controlled overlap, as demonstrated in the table within a panel component in the
                    following example.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Panel
                      description="The contents of the panel can have negative margins to collapse gutters."
                      header="Negative Margins"
                    >
                      <Box marginHorizontal={{ mobile: 'mediumN', tablet: 'xLargeN' }}>
                        <Table
                          columns={[
                            {
                              header: 'Sku',
                              hash: 'sku',
                              tooltip: 'Header tooltip',
                              render: ({ sku }) => sku,
                            },
                            { header: 'Name', hash: 'name', render: ({ name }) => name },
                            { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
                          ]}
                          items={[
                            { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
                            { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
                            { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
                            { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
                            { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
                          ]}
                        />
                      </Box>
                    </Panel>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Spacing values" headerId="spacing-values">
        <Text>
          The grid below shows the{' '}
          <Text as="span" bold>
            positive
          </Text>{' '}
          spacing tokens. To use the same tokens for negative spacing, just append an <Code>N</Code>{' '}
          (e.g. <Code>mediumN</Code>).
        </Text>

        <Flex flexWrap="wrap" justifyContent="space-around">
          {BASE_KEYS.map((key) => (
            <Flex
              alignItems="center"
              flexDirection="column"
              key={key}
              margin="xSmall"
              paddingBottom="small"
            >
              <Code>{key}</Code>
              {/* Using the theme value directly keeps this demo accurate. */}
              <BlueBox marginTop="medium" style={{ width: spacing[key], height: spacing[key] }} />
            </Flex>
          ))}
        </Flex>
      </Panel>
    </>
  );
};

export default SpacingPage;
