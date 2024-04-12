import { Flex, FlexItem, H3, Link, Panel, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Code, CodeSnippet, List } from '../components';

const CodeSandboxUrl = process.env.CODE_SANDBOX_URL ?? '';

const GettingStartedPage = () => {
  const { spacing } = useContext(ThemeContext);

  return (
    <Flex flexDirection="column">
      <Panel header="BigDesign developer playground">
        <Text>
          BigCommerce’s library of React components lets developers build stylish apps that have a
          native BigCommerce feel at their core. Our components implement BigDesign principles to
          allow you to create an empathetic and frictionless user experience. The documentation will
          demonstrate the visual style and behavior of each component. Each component has props that
          can be passed for further configuration.
        </Text>

        <FlexItem alignSelf="center">
          <H3 marginBottom="none">Helpful resources</H3>
        </FlexItem>

        <FlexItem alignSelf="center">
          <List columnCount={2} columnGap={spacing.xxxLarge}>
            <List.Item>
              <Link href="https://github.com/bigcommerce/big-design" target="_blank">
                GitHub Repo
              </Link>
            </List.Item>
            <List.Item>
              <Link
                href="https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2"
                target="_blank"
              >
                Dev Blog Demo
              </Link>
            </List.Item>
            <List.Item>
              <Link
                href="https://support.bigcommerce.com/s/group/0F91B000000bnqoSAA/bigdesign-beta"
                target="_blank"
              >
                Community Group
              </Link>
            </List.Item>
            <List.Item>
              <Link
                href="https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit"
                target="_blank"
              >
                Figma UI Kit
              </Link>
            </List.Item>
            <List.Item>
              <Link href="https://github.com/bigcommerce/channels-app" target="_blank">
                Sample App
              </Link>
            </List.Item>
            <List.Item>
              <Link href={CodeSandboxUrl} target="_blank">
                CodeSandbox Example
              </Link>
            </List.Item>
            <List.Item>
              <Link href="https://developer.bigcommerce.com" target="_blank">
                Dev Center
              </Link>
            </List.Item>
            <List.Item>
              <Link
                href="https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps"
                target="_blank"
              >
                Building an App
              </Link>
            </List.Item>
          </List>
        </FlexItem>
      </Panel>

      <Panel header="Getting started">
        <Text>Add BigDesign and styled-components to your project:</Text>
        <CodeSnippet language="bash" showControls={false}>
          npm install @bigcommerce/big-design styled-components@5
        </CodeSnippet>

        <Text>
          Add the font as a<Code>&lt;link&gt;</Code> in your <Code>index.html</Code>/
          <Code>&lt;head&gt;</Code> element.
        </Text>

        <CodeSnippet>
          {`
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet" />
          </head>
          `}
        </CodeSnippet>

        <Text>
          Import the <Code>GlobalStyles</Code> component and use it once in your app. This will set
          a few styles globally and add{' '}
          <Link href="https://github.com/necolas/normalize.css/" target="_blank">
            normalize.css
          </Link>
          . We recommend placing it close to your root component. Then import any component, such as{' '}
          <Code>Button</Code>, to use it anywhere in your app.
        </Text>

        <CodeSnippet>
          {`
        import { Button, GlobalStyles } from '@bigcommerce/big-design';

        // ...

        <App>
          <GlobalStyles />
          <Button>Click me</Button>
        </App>
      `}
        </CodeSnippet>
      </Panel>

      <Panel header="Using this documentation">
        <Text marginBottom="none">
          This documentation uses the React components in the BigDesign library so you can edit them
          and preview them in real time.
        </Text>

        <List>
          <List.Item>
            Select an element or utility in the left menu to view their props, types and
            descriptions below, including examples.
          </List.Item>
          <List.Item>
            Type directly in the code editor to make changes. Click the time icon to restore the
            component to default.
          </List.Item>
          <List.Item>
            Click the clipboard icon to copy the code snippet to your clipboard. Click the dual
            color icon to change the background color of the code editor.
          </List.Item>
        </List>
      </Panel>
    </Flex>
  );
};

export default GettingStartedPage;
