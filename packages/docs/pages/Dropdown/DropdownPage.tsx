import { Button, Dropdown, Grid, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { AssignmentIcon, DeleteIcon, EditIcon, FileCopyIcon, OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, NextLink } from '../../components';
import { DropdownItemPropTable, DropdownLinkItemPropTable, DropdownPropTable } from '../../PropTables';

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
        options={[
          { content: 'Edit', onClick: item => item, icon: <EditIcon />, value: 'edit' },
          {
            content: 'Duplicate',
            onClick: item => item,
            value: 'duplicate',
            icon: <FileCopyIcon />,
          },
          {
            content: 'Copy',
            onClick: item => item,
            value: 'copy',
            icon: <AssignmentIcon />,
            disabled: true,
          },
          {
            content: 'Delete',
            onClick: item => item,
            value: 'delete',
            icon: <DeleteIcon />,
            actionType: 'destructive',
          },
          {
            content: 'Link with tooltip',
            icon: <OpenInNewIcon />,
            type: 'link',
            url: '#',
          },
          {
            content: 'Link',
            icon: <OpenInNewIcon />,
            type: 'link',
            url: '#',
            tooltip: { message: ' Tooltip message', placement: 'right' },
          },
        ]}
        placement="bottom-start"
        trigger={<Button>Open Menu</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <DropdownPropTable />
    <DropdownItemPropTable />
    <DropdownLinkItemPropTable />

    <H1>Examples</H1>

    <H2>Links</H2>

    <Text>
      A Dropdown can render a list of <NextLink href="/link">Links</NextLink> if it receives an object of type{' '}
      <Code>LinkItem</Code>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Dropdown
        options={[
          { content: 'Option', type: 'link', url: '#' },
          { content: 'Option', type: 'link', url: '#' },
          { content: 'Option', type: 'link', url: '#' },
        ]}
        trigger={<Button>Button</Button>}
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
        options={[
          { content: 'Option', icon: <EditIcon /> },
          { content: 'Link', icon: <OpenInNewIcon />, type: 'link', url: '#' },
        ]}
        trigger={<Button>Button</Button>}
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
        options={[{ content: 'Save', actionType: 'normal' }, { content: 'Delete', actionType: 'destructive' }]}
        trigger={<Button>Button</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Trigger</H2>

    <Text>
      Dropdown can be anchored to any <Code>ReactElement</Code>, including all types of{' '}
      <NextLink href="/button">Buttons</NextLink>.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, min-content)">
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          trigger={<Button>Button</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          trigger={<Button actionType="destructive">Button</Button>}
        />

        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          trigger={<Button variant="secondary">Button</Button>}
        />

        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          trigger={<Button variant="subtle">Button</Button>}
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
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          placement="right"
          trigger={<Button>Right</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          placement="top"
          trigger={<Button>Top</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          placement="bottom-start"
          trigger={<Button>Bottom-Start</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
          ]}
          placement="bottom-end"
          trigger={<Button>Bottom-End</Button>}
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
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
            { content: 'Option', value: '4' },
            { content: 'Option', value: '5' },
            { content: 'Option', value: '6' },
            { content: 'Option', value: '7' },
            { content: 'Option', value: '8' },
          ]}
          trigger={<Button>Default</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
            { content: 'Option', value: '4' },
            { content: 'Option', value: '5' },
            { content: 'Option', value: '6' },
            { content: 'Option', value: '7' },
            { content: 'Option', value: '8' },
          ]}
          maxHeight={150}
          trigger={<Button>Smaller</Button>}
        />
        <Dropdown
          options={[
            { content: 'Option', value: '1' },
            { content: 'Option', value: '2' },
            { content: 'Option', value: '3' },
            { content: 'Option', value: '4' },
            { content: 'Option', value: '5' },
            { content: 'Option', value: '6' },
            { content: 'Option', value: '7' },
            { content: 'Option', value: '8' },
          ]}
          maxHeight={350}
          trigger={<Button>Longer</Button>}
        />
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
