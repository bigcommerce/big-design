import { Button, DropdownIcon, H0, H1, H2, Link, PlusIcon, Text } from '@bigcommerce/big-design';
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

    <CodePreview>
      <Button variant="primary">Primary</Button>
    </CodePreview>

    <H2>Secondary</H2>

    <Text>
      There can be several secondary actions per page. Can be used in conjunction with a primary action or
      independently.
    </Text>

    <Text>
      <b>Use Case:</b> A secondary button used in conjunction with a primary button. In Store Design: “Publish” =
      secondary button. “Save” = primary button.
    </Text>

    <CodePreview>
      <Button variant="secondary">Secondary</Button>
    </CodePreview>

    <H2>Subtle</H2>

    <Text>Subtle actions are used in together with other actions rather than independently.</Text>

    <Text>
      <b>Use Case:</b> Used as a "Cancel" action inside <Link onClick={linkTo('Modal') as any}>Modals</Link>.
    </Text>

    <CodePreview>
      <Button variant="subtle">Subtle</Button>
    </CodePreview>

    <H1>Action Types</H1>

    <Text>
      There are two action types: <code>normal</code> &amp; <code>destructive</code>. They are used to indicate the
      nature of the action when clicking on the button.
    </Text>

    <CodePreview options={{ showDefaultProps: true, filterProps: ['variant', 'isLoading', 'spinner'] }}>
      <>
        <Button actionType="normal" marginRight="xSmall">
          Normal
        </Button>
        <Button actionType="destructive">Destructive</Button>
      </>
    </CodePreview>

    <H1>States</H1>

    <H2>Loading</H2>

    <Text>The loading state is used when clicking a button will perform a asyncronous action.</Text>

    <CodePreview>
      <Button isLoading={true}>Loading</Button>
    </CodePreview>

    <Text>
      A custom loading indicator can be passed using the <code>spinner</code> prop, if needed.
    </Text>

    <CodeSnippet>
      {`
        import { TripleDotsLoader } from '<Custom Spinner/Loader>';
        // ...
        <Button isLoading spinner={<TripleDotsLoader />}>Loading</Button>
      `}
    </CodeSnippet>

    <H2>Disabled</H2>

    <Text>
      A disabled state is used to indicate no action can be done using the button by passing a <code>disabled</code>{' '}
      prop.
    </Text>

    <CodePreview>
      <Button disabled>Disabled</Button>
    </CodePreview>

    <H1>Icons</H1>

    <Text>
      A button can also include icons on either side of the text (or both). When using <code>iconOnly</code>, the{' '}
      <code>iconLeft</code> &amp; <code>iconRight</code> components will be removed.
    </Text>

    <CodePreview>
      <>
        <Button iconOnly={<PlusIcon title="add" />} marginRight="xSmall" />
        <Button iconLeft={<PlusIcon />} marginRight="xSmall">
          Label
        </Button>
        <Button iconLeft={<PlusIcon />} iconRight={<DropdownIcon />} marginRight="xSmall">
          Label
        </Button>
        <Button iconRight={<DropdownIcon />} marginRight="xSmall">
          Label
        </Button>
      </>
    </CodePreview>

    <H1>API</H1>

    <PropTable>
      <PropTable.Prop name="actionType" types={['normal', 'destructive']} defaults="normal">
        Indicates whether your button's action is of normal or destructive nature.
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
