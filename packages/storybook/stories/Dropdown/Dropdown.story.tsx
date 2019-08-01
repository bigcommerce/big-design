import { Button, Dropdown, Grid, H0, H1, H2, Link, Panel, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Code, CodePreview } from '../../components';

import { DropdownItemPropTable, DropdownPropTable } from './DropdownPropTable';

storiesOf('Dropdown', module).add('Overview', () => (
  <>
    <H0>Dropdown</H0>
    <Text>
      Dropdowns are toggleable, contextual overlays for displaying lists.{' '}
      <Link href="https://bigcommerce.design/dropdown" target="_blank">
        Dropdown Design Guidelines
      </Link>
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        maxHeight={250}
        onItemClick={value => value}
        placement="bottom-start"
        trigger={<Button>Open Menu</Button>}
      >
        <Dropdown.Item value={1}>Option</Dropdown.Item>
        <Dropdown.Item value={2}>Option</Dropdown.Item>
        <Dropdown.Item value={3}>Option</Dropdown.Item>
        <Dropdown.Item value={4}>Option</Dropdown.Item>
        <Dropdown.Item value={5}>Option</Dropdown.Item>
        <Dropdown.Item value={6}>Option</Dropdown.Item>
        <Dropdown.Item value={7}>Option</Dropdown.Item>
        <Dropdown.Item value={8}>Option</Dropdown.Item>
      </Dropdown>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <H2>Dropdown</H2>
    <DropdownPropTable />

    <H2>Dropdown.Item</H2>
    <DropdownItemPropTable />

    <H1>Examples</H1>

    <H2>Trigger</H2>
    <Text>
      Dropdown can be anchored to any <Code>ReactElement</Code>, including all types of buttons.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(4, min-content)">
        <Dropdown trigger={<Button>Button</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown trigger={<Button actionType="destructive">Button</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown trigger={<Button variant="secondary">Button</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown trigger={<Button variant="subtle">Button</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Position</H2>
    <Text>
      Dropdown can be anchored in different directions with the <Code primary>position</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(4, min-content)">
        <Dropdown placement="right" trigger={<Button>Right</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown placement="top" trigger={<Button>Top</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown placement="bottom-start" trigger={<Button>Bottom-Start</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown placement="bottom-end" trigger={<Button>Bottom-End</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Max Height</H2>
    <Text>
      Once the content is longer than the max-height, the Dropdown will be scrollable. It is possible to modify the
      dimension by passing a <Code primary>maxHeight</Code> property.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(3, min-content)">
        <Dropdown trigger={<Button>Default</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
          <Dropdown.Item value={3}>Option</Dropdown.Item>
          <Dropdown.Item value={4}>Option</Dropdown.Item>
          <Dropdown.Item value={5}>Option</Dropdown.Item>
          <Dropdown.Item value={6}>Option</Dropdown.Item>
          <Dropdown.Item value={7}>Option</Dropdown.Item>
          <Dropdown.Item value={8}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown maxHeight={150} trigger={<Button>Smaller</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
          <Dropdown.Item value={3}>Option</Dropdown.Item>
          <Dropdown.Item value={4}>Option</Dropdown.Item>
          <Dropdown.Item value={5}>Option</Dropdown.Item>
          <Dropdown.Item value={6}>Option</Dropdown.Item>
          <Dropdown.Item value={7}>Option</Dropdown.Item>
          <Dropdown.Item value={8}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown maxHeight={350} trigger={<Button>Longer</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
          <Dropdown.Item value={3}>Option</Dropdown.Item>
          <Dropdown.Item value={4}>Option</Dropdown.Item>
          <Dropdown.Item value={5}>Option</Dropdown.Item>
          <Dropdown.Item value={6}>Option</Dropdown.Item>
          <Dropdown.Item value={7}>Option</Dropdown.Item>
          <Dropdown.Item value={8}>Option</Dropdown.Item>
        </Dropdown>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Dropdown.Item</H2>
    <Text>
      Dropdown expects <Code>Dropdown.Item</Code> as children. An item can have optional values.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid columns="repeat(2, min-content)">
        <Dropdown trigger={<Button>With Values</Button>}>
          <Dropdown.Item value={1}>Option</Dropdown.Item>
          <Dropdown.Item value={2}>Option</Dropdown.Item>
        </Dropdown>
        <Dropdown trigger={<Button>With Links</Button>}>
          <Dropdown.Item>
            <Link>Link</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link>Link</Link>
          </Dropdown.Item>
        </Dropdown>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
));
