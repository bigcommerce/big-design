import { Button, H0, H1, H2, Link, Text } from '@bigcommerce/big-design';
import { AddIcon, ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, Collapsible } from '../../components';
import { ButtonPropTable, MarginPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Buttons</H0>

    <Text>
      Buttons are calls to action used throughout the product experience.{' '}
      <Link href="https://design.bigcommerce.com/components/buttons" target="_blank">
        Buttons Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Button actionType="normal" isLoading={false} variant="primary">
        Label
      </Button>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Button</H2>

    <ButtonPropTable />

    <H2>Inherited Props</H2>

    <Collapsible title="Margin Props">
      <MarginPropTable />
    </Collapsible>

    <H1>Variants</H1>

    <Text>
      There are three types of variants to choose from: <Code>primary</Code>, <Code>secondary</Code>, and{' '}
      <Code>subtle</Code>. You can determine what type of variant by using the <Code primary>variant</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="subtle">Subtle</Button>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Action Types</H1>

    <Text>
      There are two action types: <Code>normal</Code> &amp; <Code>destructive</Code>. They are used to indicate the
      nature of the action when clicking on the button.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Button actionType="normal">Normal</Button>
        <Button actionType="destructive">Destructive</Button>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>States</H1>

    <H2>Loading</H2>

    <Text>The loading state is used when clicking a button will perform a asyncronous action.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function LoadingButton() {
        const [isLoading, setLoading] = React.useState(false);

        function simulateNetworkRequest() {
          return new Promise(resolve => setTimeout(resolve, 2000));
        }

        React.useEffect(() => {
          if (isLoading) {
            simulateNetworkRequest().then(() => {
              setLoading(false);
            });
          }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
          <Button variant="primary" isLoading={isLoading} onClick={!isLoading ? handleClick : () => null}>
            Click to load
          </Button>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Disabled</H2>

    <Text>
      A disabled state is used to indicate no action can be done using the button by passing a{' '}
      <Code primary>disabled</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Button disabled>Disabled</Button>
        <Button disabled variant="secondary">
          Disabled
        </Button>
        <Button disabled variant="subtle">
          Disabled
        </Button>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Icons</H1>

    <Text>
      A button can also include icons on either side of the text (or both). When using <Code primary>iconOnly</Code>,
      the <Code primary>iconLeft</Code> &amp; <Code primary>iconRight</Code> components will be removed.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Button iconOnly={<AddIcon title="add" />} />
        <Button iconLeft={<AddIcon />}>Label</Button>
        <Button iconLeft={<AddIcon />} iconRight={<ArrowDropDownIcon />}>
          Label
        </Button>
        <Button iconRight={<ArrowDropDownIcon />}>Label</Button>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
