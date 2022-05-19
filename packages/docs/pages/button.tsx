import { Button, H1, Panel, Text } from '@bigcommerce/big-design';
import { AddIcon, ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useEffect, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { ButtonPropTable, MarginPropTable } from '../PropTables';

const ButtonPage = () => {
  return (
    <>
      <H1>Button</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Buttons</Code> trigger an immediate action, which can continue within the
          current page, a new page or modal.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code>primary</Code> buttons for the most important action on a page (e.g. creating
            an object, saving changes).
          </List.Item>
          <List.Item>
            Use <Code>secondary</Code> buttons for other important page actions that are not the
            primary task on the page.
          </List.Item>
          <List.Item>
            Use <Code>subtle</Code> buttons alongside <Code>secondary</Code> or <Code>primary</Code>{' '}
            buttons for teritiary actions, like to cancel or visit a related task.
          </List.Item>
          <List.Item>
            Use <Code>destructive</Code> buttons in confirmations for important actions that cannot
            be undone (like deleting something).
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    <Code primary>Buttons</Code> are calls to action used throughout the product
                    experience.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Button actionType="normal" isLoading={false} variant="primary">
                      Label
                    </Button>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'variants',
              title: 'Variants',
              render: () => (
                <Fragment key="variants">
                  <Text>
                    There are three types of variants to choose from: <Code>primary</Code>,{' '}
                    <Code>secondary</Code>, and <Code>subtle</Code>. You can determine what type of
                    variant by using the <Code primary>variant</Code> prop.
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
                </Fragment>
              ),
            },
            {
              id: 'action-types',
              title: 'Action types',
              render: () => (
                <Fragment key="action-types">
                  <Text>
                    There are two action types: <Code>normal</Code> &amp; <Code>destructive</Code>.
                    They are used to indicate the nature of the action when clicking on the{' '}
                    <Code primary>Button</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Button actionType="normal">Normal</Button>
                      <Button actionType="destructive">Destructive</Button>
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'loading',
              title: 'Loading',
              render: () => (
                <Fragment key="loading">
                  <Text>
                    The loading state is used when clicking a <Code primary>Button</Code> will
                    perform a asyncronous action.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function LoadingButton() {
                      const [isLoading, setLoading] = useState(false);

                      function simulateNetworkRequest() {
                        return new Promise((resolve) => setTimeout(resolve, 2000));
                      }

                      useEffect(() => {
                        if (isLoading) {
                          await simulateNetworkRequest().then(() => {
                            setLoading(false);
                          });
                        }
                      }, [isLoading]);

                      const handleClick = () => setLoading(true);

                      return (
                        <Button
                          isLoading={isLoading}
                          onClick={!isLoading ? handleClick : () => null}
                          variant="primary"
                        >
                          Click to load
                        </Button>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'disabled',
              title: 'Disabled',
              render: () => (
                <Fragment key="disabled">
                  <Text>
                    A disabled state is used to indicate no action can be done using the{' '}
                    <Code primary>Button</Code> by passing a <Code primary>disabled</Code> prop.
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
                </Fragment>
              ),
            },
            {
              id: 'icons',
              title: 'Icons',
              render: () => (
                <Fragment key="icons">
                  <Text>
                    A <Code primary>Button</Code> can also include icons on either side of the text
                    (or both). When using <Code primary>iconOnly</Code>, the{' '}
                    <Code primary>iconLeft</Code> &amp; <Code primary>iconRight</Code> components
                    will be removed.
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
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ButtonPropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Have more than one <Code>primary</Code> button on a page.
            </>,
          ]}
          recommended={[
            <>Keep button labels short and concise.</>,
            <>
              Where there are multiple <Code primary>Buttons</Code> together, ensure the “default”
              action is the <Code>primary</Code> button.
            </>,
            <>
              <Code>primary</Code> button should only appear once per page.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default ButtonPage;
