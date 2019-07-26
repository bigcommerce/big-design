import { Box, Grid, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Code, CodePreview } from '../../components';

import { GridItemPropTable, GridPropTable } from './';

const ExampleBox: React.FC = ({ children }) => (
  <Box backgroundColor="secondary10" border="box" padding="small" style={{ boxSizing: 'border-box', height: '100%' }}>
    {children}
  </Box>
);

storiesOf('Grid', module).add('Overview', () => (
  <>
    <H0>Grid</H0>

    <Text>
      The Grid component is useful for creating intrinsicly responsive layouts.{' '}
      <Link href="https://bigcommerce.design/responsive" target="_blank">
        Responsive Design Guidelines
      </Link>
    </Text>

    <CodePreview scope={{ ExampleBox }}>
      {/* jsx-to-string:start */}
      <Grid>
        <Grid.Item>
          <ExampleBox>Item 1</ExampleBox>
        </Grid.Item>
        <Grid.Item>
          <ExampleBox>Item 2</ExampleBox>
        </Grid.Item>
        <Grid.Item>
          <ExampleBox>Item 3</ExampleBox>
        </Grid.Item>
        <Grid.Item>
          <ExampleBox>Item 4</ExampleBox>
        </Grid.Item>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Grid</H2>

    <GridPropTable />

    <H2>Grid.Item</H2>

    <GridItemPropTable />

    <H1>Examples</H1>

    <Text>
      Grid allows you to create custom layouts using combinations of <Code>template</Code> and <Code>area</Code> props.
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
          <Grid template={template}>
            <Grid.Item area="head">
              <ExampleBox>Header</ExampleBox>
            </Grid.Item>
            <Grid.Item area="nav">
              <ExampleBox>Sidebar</ExampleBox>
            </Grid.Item>
            <Grid.Item area="main">
              <ExampleBox>Content</ExampleBox>
            </Grid.Item>
            <Grid.Item area="foot">
              <ExampleBox>Footer</ExampleBox>
            </Grid.Item>
          </Grid>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <Text>
      You can use the <Code>columns</Code> prop to create columned layouts.
    </Text>

    <CodePreview scope={{ ExampleBox }}>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(3, 1fr)" style={{ height: '100%' }}>
        <Grid.Item>
          <ExampleBox>
            Reprehenderit ullamco et elit eu duis non reprehenderit eiusmod pariatur ea deserunt irure. Reprehenderit et
            incididunt sit aute sint proident eu eiusmod pariatur Lorem nulla labore irure nisi. Adipisicing do duis
            occaecat ipsum dolor ea. Qui consectetur sint eu nulla duis et commodo anim commodo. Ullamco consectetur
            elit ullamco aliquip do id consectetur anim laborum.
          </ExampleBox>
        </Grid.Item>

        <Grid.Item>
          <ExampleBox>
            In sit dolore culpa reprehenderit tempor laborum. Sit anim voluptate pariatur irure amet mollit. Est mollit
            ad pariatur esse eu reprehenderit ut veniam. Aliquip anim mollit aliquip quis officia minim esse laboris
            proident fugiat cillum. Eiusmod culpa eu ea eiusmod nostrud.
          </ExampleBox>
        </Grid.Item>

        <Grid.Item>
          <ExampleBox>
            Ipsum adipisicing pariatur magna quis incididunt amet pariatur. Aliqua voluptate consequat ut elit ea dolore
            officia reprehenderit exercitation dolore eiusmod cupidatat quis. Ullamco ipsum do deserunt sunt ad deserunt
            ut. Elit non velit dolore ad est eu.
          </ExampleBox>
        </Grid.Item>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
));
