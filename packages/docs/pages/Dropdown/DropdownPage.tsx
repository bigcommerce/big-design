import { Button, Dropdown, Grid, H0, H1, H2, H3, Link, Panel, Text } from '@bigcommerce/big-design';
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
          { content: 'Edit', icon: <EditIcon />, onClick: item => item, value: 'edit' },
          { content: 'Duplicate', icon: <FileCopyIcon />, onClick: item => item, value: 'duplicate' },
          { content: 'Copy', icon: <AssignmentIcon />, onClick: item => item, value: '8', disabled: true },
          {
            content: 'Delete',
            icon: <DeleteIcon />,
            onClick: item => item,
            value: 'delete',
            actionType: 'destructive',
          },
          { content: 'Link', icon: <OpenInNewIcon />, type: 'link', url: '#' },
        ]}
        placement="bottom-start"
        trigger={<Button>Open Menu</Button>}
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Dropdown</H2>

    <DropdownPropTable />

    <H3>DropdownItem</H3>

    <DropdownItemPropTable />

    <H3>DropdownLinkItem</H3>

    <DropdownLinkItemPropTable />

    <H1>Examples</H1>

    <H2>Links</H2>

    <Text>
      A Dropdown can render a list of <NextLink href="/link">Links</NextLink> if it receives an object of type{' '}
      <Code>DropdownLinkItem</Code>.
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
