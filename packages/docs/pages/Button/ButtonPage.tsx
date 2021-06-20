import { Button, H1, Panel, Text } from '@bigcommerce/big-design';
import { AddIcon, ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { ButtonPropTable, MarginPropTable } from '../../PropTables';

const ButtonPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>Buttons are calls to action used throughout the product experience.</Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              <Button actionType="normal" isLoading={false} variant="primary">
                Label
              </Button>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Variants">
            <Text>
              There are three types of variants to choose from: <Code>primary</Code>, <Code>secondary</Code>, and{' '}
              <Code>subtle</Code>. You can determine what type of variant by using the <Code primary>variant</Code>{' '}
              prop.
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
          </Panel>
          <Panel header="Action types">
            <Text>
              There are two action types: <Code>normal</Code> &amp; <Code>destructive</Code>. They are used to indicate
              the nature of the action when clicking on the button.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Button actionType="normal">Normal</Button>
                <Button actionType="destructive">Destructive</Button>
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Loading">
            <Text>The loading state is used when clicking a button will perform a asyncronous action.</Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              {function LoadingButton() {
                const [isLoading, setLoading] = useState(false);

                function simulateNetworkRequest() {
                  return new Promise((resolve) => setTimeout(resolve, 2000));
                }

                useEffect(() => {
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
          </Panel>
          <Panel header="Disabled">
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
          </Panel>
          <Panel header="Icons">
            <Text>
              A button can also include icons on either side of the text (or both). When using{' '}
              <Code primary>iconOnly</Code>, the <Code primary>iconLeft</Code> &amp; <Code primary>iconRight</Code>{' '}
              components will be removed.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'code',
      title: 'Code',
      render: () => <ButtonPropTable inheritedProps={<MarginPropTable collapsible />} />,
    },
  ];

  return (
    <>
      <H1>Button</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default ButtonPage;
