import { Flex, H1, H2, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodeSnippet, List } from '../../components';

export default () => (
  <Flex flexDirection="column">
    <figure style={{ textAlign: 'center' }}>
      <img src={`${process.env.URL_PREFIX}/static/logo.svg`} alt="BigDesign Logo" style={{ width: 200 }} />
    </figure>

    <Flex.Item alignSelf="center">
      <H1>BigDesign Component Playground</H1>
    </Flex.Item>

    <Text>
      BigCommerce’s library of React components lets developers build stylish apps that have a native BigCommerce feel at their core. Our components implement BigDesign principles to allow you to create an empathetic and frictionless user experience.
      The documentation will demonstrate the visual style and behavior of each component. Each component has props that you can pass to the components for further configuration.
    </Text>

    <H2>Getting Started</H2>

    <Text>Add BigDesign and styled-components to your project:</Text>

    <CodeSnippet showControls={false} language="bash">
      npm install @bigcommerce/big-design styled-components
    </CodeSnippet>

    <Text>
      Import the <Code>GlobalStyles</Code> component and use it once in your app. This will set a few styles globally,
      including a base font family,{' '}
      <Link href="https://fonts.google.com/specimen/Source+Sans+Pro" target="_blank">
        Source Sans Pro
      </Link>{' '}
      and{' '}
      <Link href="https://github.com/necolas/normalize.css/" target="_blank">
        normalize.css
      </Link>
      . We recommend placing it close to your root component. Then import any component, such as <Code>Button</Code>, to
      use it anywhere in your app.
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

    <H2>Using this Documentation</H2>

    <Text>
      This documentation uses the React components in the BigDesign library so you can edit them and preview them in real time.
      </Text>

    <List>
      <List.Item>
        Select an element or utility in the left menu to view their props, types and descriptions below, including examples.
      </List.Item>
      <List.Item>
        Type directly in the code editor to make changes.  Click the time icon to restore the component to default.
      </List.Item>
      <List.Item>
        Click the clipboard icon to copy the code snippet to your clipboard. Click the dual color icon to change the background color of the code editor. 
      </List.Item>
    </List>

    <H2 marginBottom="none">Helpful Resources</H2>

    <List>
      <List.Item>
        <Link href="https://bigcommerce.design/components" target="_blank">
          BigDesign Guidelines
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://github.com/bigcommerce/big-design" target="_blank">
          Components GitHub Repo
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://github.com/bigcommerce-labs/sample-plab-app" target="_blank">
          Sample App
        </Link>
      </List.Item>
      <List.Item>
        <Link href="#">BigDesign Dev Blog Demo</Link>
      </List.Item>
      <List.Item>
        <Link href="https://support.bigcommerce.com/s/group/0F91B000000bnqoSAA/bigdesign-beta" target="_blank">
          Community Beta Group
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://developer.bigcommerce.com" target="_blank">
          Dev Center
        </Link>
      </List.Item>
      <List.Item>
        <Link href="https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps" target="_blank">
          Building an App
        </Link>
      </List.Item>
    </List>
  </Flex>
);
