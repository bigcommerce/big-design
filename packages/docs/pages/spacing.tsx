import { Box, Button, Flex, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment, useContext } from 'react';
import { styled, ThemeContext } from 'styled-components';

import { Code, CodePreview, ContentRoutingTabs, List, NextLink } from '../components';

const BlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  display: 'inline-block',
  height: theme.spacing.large,
  width: theme.spacing.large,
}));

const SpacingPage = () => {
  const theme = useContext(ThemeContext);

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
          <List.Item>Consuming it from the theme in a custom component.</List.Item>
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
                  <Text>
                    You can also use spacing directly from the theme to style other components.
                  </Text>
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
          ]}
        />
      </Panel>

      <Panel header="Spacing values" headerId="spacing-values">
        <Flex justifyContent="space-around">
          {theme &&
            Object.keys(theme.spacing)
              .reverse()
              .map((key) => (
                <Flex alignItems="center" flexDirection="column" key={key} paddingBottom="small">
                  <Code>{key}</Code>
                  <BlueBox
                    marginTop="medium"
                    style={{ width: theme.spacing[key], height: theme.spacing[key] }}
                  />
                </Flex>
              ))}
        </Flex>
      </Panel>
    </>
  );
};

export default SpacingPage;
