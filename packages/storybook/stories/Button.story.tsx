import { Box, Button, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { CodePreview, CodeSnippet, List, PropTable } from '../components';

storiesOf('Button', module).add('Overview', () => (
  <>
    <H0>Buttons</H0>
    <CodePreview options={{ showDefaultProps: true, filterProps: ['spinner'] }}>
      <Button>Label</Button>
    </CodePreview>
    <Text>Buttons are calls to action used throughout the product experience.</Text>
    <List>
      <List.Item>Buttons provide a visual indication that users can take a specified action.</List.Item>
      <List.Item>Buttons should be clear and direct.</List.Item>
      <List.Item>Keep button labels short and concise.</List.Item>
      <List.Item>Button labels must remain on one line.</List.Item>
    </List>

    <H1>Variants</H1>

    <H2>Primary</H2>

    <Text>
      There should only be one primary button one per page. It is used to describe the most important action on the
      page.
    </Text>
    <Text>
      <b>Use Case:</b> A primary button is used to "Create a New Product".
    </Text>

    <CodeSnippet>{`<Button variant="primary">Add Product</Button>`}</CodeSnippet>

    <H2>Secondary</H2>

    <Text>
      There can be several secondary actions per page. Can be used in conjunction with a primary action, or
      independently.
    </Text>
    <Text>
      <b>Use Case:</b> A secondary button used in conjunction with a conjunction with a primary button. In Store Design:
      “Publish” = secondary button. “Save” = primary button.
    </Text>

    <CodeSnippet>{`
        <Button variant="secondary">Publish</Button>
        <Button variant="primary">Save</Button>
      `}</CodeSnippet>

    <H2>Subtle</H2>

    <Text>Subtle actions are either used as a "Cancel" function in conjunction with other actions.</Text>

    <CodeSnippet>{`
        <Modal>
          // ...
          <Modal.Actions>
              <Button variant="subtle">Cancel</Button>
              <Button variant="secondary">Confirm</Button>
          </Modal.Actions>
        </Modal>
      `}</CodeSnippet>

    <H1>States</H1>

    <H2>Loading</H2>

    <Text>
      The loading state is used when clicking a button will preform a asyncronous action. A custom loading indicator can
      be passed using the <code>spinner</code> prop, if needed.
    </Text>

    <CodeSnippet>{`
        import { TripleDotsLoader } from '<Custom Spinner/Loader>';
        // ...
        <Button isLoading={true}>Loading</Button>
        <Button isLoading spinner={<TripleDotsLoader />}>Loading</Button>
      `}</CodeSnippet>

    <H2>Disabled</H2>

    <Text>A disabled state is used to indicate no action can be done using the button.</Text>

    <CodeSnippet>{`
        <Button disabled>Disabled</Button>
        <Button disabled={true}>Disabled</Button>
      `}</CodeSnippet>

    <H1>Icons</H1>

    <Text>A button can also include icons on either side of the text (or both).</Text>

    <Box padding="medium" backgroundColor="white" border="box" marginBottom="large">
      Note: <code>iconOnly</code> will remove <code>iconLeft</code> &amp; <code>iconRight</code> components.
    </Box>

    <CodeSnippet>{`
        <Button iconOnly={<PlusIcon title="add" />} />
        <Button iconLeft={<PlusIcon />}>
          Label
        </Button>
        <Button iconLeft={<PlusIcon />} iconRight={<DropdownIcon />}>
          Label
        </Button>
        <Button iconRight={<DropdownIcon />}>
          Label
        </Button>
      `}</CodeSnippet>

    <H1>API</H1>

    <PropTable>
      <PropTable.Prop name="actionType" types={['normal', 'destructive']} defaults="normal">
        Indicates whether your buttons action is of normal or destructive nature.
      </PropTable.Prop>
      <PropTable.Prop name="iconLeft" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the left of the text.
      </PropTable.Prop>
      <PropTable.Prop name="iconOnly" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to replace content with an icon.
      </PropTable.Prop>
      <PropTable.Prop name="iconRight" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the right of the text.
      </PropTable.Prop>
      <PropTable.Prop name="isLoading" types="boolean" defaults="false">
        Used to determine if component is in a loading state.
      </PropTable.Prop>
      <PropTable.Prop
        name="spinner"
        types={<Link onClick={linkTo('Spinner') as any}>Spinner</Link>}
        defaults="<Spinner overlay={false} />"
      >
        Add a custom spinner to view when <code>isLoading</code> is <code>true</code>
      </PropTable.Prop>
      <PropTable.Prop name="variant" types={['primary', 'secondary', 'subtle']} defaults="primary">
        Determines which style of button to display.
      </PropTable.Prop>
    </PropTable>

    <Link href="http://bigcommerce.design/buttons">Buttons Design Guidelines</Link>
  </>
));
