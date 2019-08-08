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
      Our design language system and React component library was built to enable designers and developers to build
      experiences that seamlessly integrate with the BigCommerce product ecosystem.
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

    <H2 marginBottom="none">Helpful Resources</H2>
    <List>
      <List.Item>
        <Link href="https://bigcommerce.design/components" target="_blank">
          Design Guidelines
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
    </List>
  </Flex>
);
