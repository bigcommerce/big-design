import { Button, Dropdown, Grid, H0, H1, H2, Link, Panel, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview, PropTable } from '../components';

storiesOf('Dropdown', module).add('Overview', () => (
  <>
    <H0>Dropdown</H0>
    <Text>
      Dropdowns are toggleable, contextual overlays for displaying lists.{' '}
      <Link href="http://bigcommerce.design/dropdown">Dropdown Design Guidelines</Link>
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        maxHeight={250}
        onActionClick={() => null}
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
    <PropTable>
      <PropTable.Prop name="maxHeight" types="number" defaults="250">
        Sets the max-height of the dropdown.
      </PropTable.Prop>
      <PropTable.Prop name="onActionClick" types="() => void">
        Callback called when an action is clicked.
      </PropTable.Prop>
      <PropTable.Prop name="onItemClick" types="(value) => void">
        Callback called with value of clicked item.
      </PropTable.Prop>
      <PropTable.Prop
        name="position"
        types={[
          'auto',
          'auto-end',
          'auto-start',
          'bottom',
          'bottom-end',
          'bottom-start',
          'left',
          'left-end',
          'left-start',
          'right',
          'right-end',
          'right-start',
          'top',
          'top-end',
          'top-start',
        ]}
        defaults="bottom-start"
      >
        Sets the position of the Dropdown relative to the anchor.
      </PropTable.Prop>
      <PropTable.Prop name="trigger" types="ReactElement" required>
        Element used as anchor.
      </PropTable.Prop>
    </PropTable>

    <H2>Dropdown.Item</H2>
    <PropTable>
      <PropTable.Prop name="value" types="string | string[] | number">
        Value of the item
      </PropTable.Prop>
    </PropTable>

    <H1>Examples</H1>

    <H2>Trigger</H2>
    <Text>
      Dropdown can be anchored to any <code>ReactElement</code>, including all types of buttons.
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
      Dropdown can be anchored in different directions with the <code>position</code> property. It will automatically
      find a position if there's not enough space on the chosen direction.
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
      dimension by passing a <code>max-height</code> property.
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
      Dropdown expects <code>Dropdown.Item</code> as children. An item can have optional values.
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
