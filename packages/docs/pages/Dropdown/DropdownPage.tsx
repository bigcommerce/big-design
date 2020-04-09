import { Button, Dropdown, Grid, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { AssignmentIcon, DeleteIcon, EditIcon, FileCopyIcon, OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, NextLink } from '../../components';
import {
  DropdownItemGroupPropTable,
  DropdownItemPropTable,
  DropdownLinkItemPropTable,
  DropdownPropTable,
} from '../../PropTables';

export default () => (
  <>
    <H0>Dropdown</H0>

    <Text>
      Dropdowns are toggleable, contextual overlays for displaying lists.{' '}
      <Link href="https://design.bigcommerce.com/components/dropdown" target="_blank">
        Dropdown Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        maxHeight={250}
        items={[
          { content: 'Edit', onItemClick: item => item, hash: 'edit', icon: <EditIcon /> },
          {
            content: 'Duplicate',
            onItemClick: item => item,
            hash: 'duplicate',
            icon: <FileCopyIcon />,
          },
          {
            content: 'Copy',
            onItemClick: item => item,
            hash: 'copy',
            icon: <AssignmentIcon />,
            disabled: true,
            tooltip: 'You cannot copy this item...',
          },
          {
            content: 'Delete',
            onItemClick: item => item,
            hash: 'delete',
            icon: <DeleteIcon />,
            actionType: 'destructive',
          },
          {
            content: 'Link',
            icon: <OpenInNewIcon />,
            type: 'link',
            url: '#',
          },
        ]}
        placement="bottom-start"
        toggle={<Button>Open Menu</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <DropdownPropTable />
    <DropdownItemPropTable />
    <DropdownLinkItemPropTable />
    <DropdownItemGroupPropTable />

    <H1>Examples</H1>

    <H2>Links</H2>

    <Text>
      A Dropdown can render a list of <NextLink href="/link">Links</NextLink> if it receives an object of type{' '}
      <Code>LinkItem</Code>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        items={[
          { content: 'Item', type: 'link', url: '#' },
          { content: 'Item', type: 'link', url: '#' },
          { content: 'Item', type: 'link', url: '#', target: '_blank' },
        ]}
        toggle={<Button>Button</Button>}
      />

      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Icons</H2>

    <Text>
      An Item accepts an <NextLink href="/icons">Icon</NextLink> component to render.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}

      <Dropdown
        items={[
          { content: 'Item', icon: <EditIcon />, onItemClick: item => item },
          { content: 'Link', icon: <OpenInNewIcon />, type: 'link', url: '#' },
        ]}
        toggle={<Button>Button</Button>}
      />

      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Action Types</H2>

    <Text>
      There are two action types: <Code>normal</Code> &amp; <Code>destructive</Code>. They are used to indicate the
      nature of the action when hovering on the item.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        items={[
          { content: 'Save', onItemClick: item => item, actionType: 'normal' },
          { content: 'Delete', onItemClick: item => item, actionType: 'destructive' },
        ]}
        toggle={<Button>Button</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Toggle</H2>

    <Text>
      Dropdown can be anchored to any <Code>ReactElement</Code>, including all types of{' '}
      <NextLink href="/button">Buttons</NextLink>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, min-content)">
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          toggle={<Button>Button</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          toggle={<Button actionType="destructive">Button</Button>}
        />

        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          toggle={<Button variant="secondary">Button</Button>}
        />

        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          toggle={<Button variant="subtle">Button</Button>}
        />
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Placement</H2>

    <Text>
      Dropdown can be anchored in different directions with the <Code primary>placement</Code> property. It will
      automatically find a placement if there's not enough space in the chosen direction.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, min-content)">
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          placement="right"
          toggle={<Button>Right</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          placement="top"
          toggle={<Button>Top</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          placement="bottom-start"
          toggle={<Button>Bottom-Start</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          placement="bottom-end"
          toggle={<Button>Bottom-End</Button>}
        />
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
      <Grid gridColumns="repeat(3, min-content)">
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          toggle={<Button>Default</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          maxHeight={150}
          toggle={<Button>Smaller</Button>}
        />
        <Dropdown
          items={[
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
            { content: 'Item', onItemClick: item => item },
          ]}
          maxHeight={350}
          toggle={<Button>Longer</Button>}
        />
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Item Groups</H2>

    <Text>
      Create Dropdowns with labeled groupings by passing <Code primary>DropdownItemGroup</Code>'s to the Dropdown's{' '}
      <Code primary>options</Code> property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        items={[
          {
            label: 'Label 1',
            items: [
              { content: 'Option 1', onItemClick: item => item },
              { content: 'Option 2', onItemClick: item => item },
              { content: 'Option 3', onItemClick: item => item },
            ],
          },
          {
            label: 'Label 2',
            items: [
              { content: 'Option 4', onItemClick: item => item },
              { content: 'Option 5', onItemClick: item => item },
              { content: 'Option 6', onItemClick: item => item },
            ],
          },
        ]}
        toggle={<Button>Button</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
