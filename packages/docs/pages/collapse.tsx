import { Collapse, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  CollapsePanelPropTable,
  CollapsePropTable,
  CollapseTriggerPropTable,
  MarginPropTable,
  PaddingPropTable,
} from '../PropTables';

const CollapsePage = () => {
  return (
    <>
      <H1>Collapse</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>Collapse</Code> component can hide/reveal content within a panel.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Collapse</Code> to reduce clutter, hiding non-essential information or
            options on a panel or modal.
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
                    <Code primary>Collapse</Code> is a headless compound component. The root
                    provides state via context; place <Code primary>Collapse.Trigger</Code> and{' '}
                    <Code primary>Collapse.Panel</Code> anywhere inside. State can be uncontrolled (
                    <Code primary>initiallyOpen</Code>) — no extra wiring required.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Collapse>
                      <Collapse.Trigger title="Show more" />
                      <Collapse.Panel backgroundColor="secondary20" padding="medium">
                        <Text>
                          Ea tempor sunt amet labore proident dolor proident commodo in exercitation
                          ea nulla sunt pariatur. Nulla sunt ipsum do eu consectetur exercitation
                          occaecat labore aliqua.
                        </Text>
                      </Collapse.Panel>
                    </Collapse>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'controlled',
              title: 'Controlled',
              render: () => (
                <Fragment key="controlled">
                  <Text>
                    Lift state up by passing <Code primary>isOpen</Code> +{' '}
                    <Code primary>onCollapseChange</Code>. Useful when the open/closed state should
                    drive other UI — for example, swapping the trigger label.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [isOpen, setIsOpen] = useState(false);

                      return (
                        <Collapse isOpen={isOpen} onCollapseChange={setIsOpen}>
                          <Collapse.Trigger title={isOpen ? 'Show less' : 'Show more'} />
                          <Collapse.Panel backgroundColor="secondary20" padding="medium">
                            <Text>
                              Ea tempor sunt amet labore proident dolor proident commodo in
                              exercitation ea nulla sunt pariatur.
                            </Text>
                          </Collapse.Panel>
                        </Collapse>
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
                    The <Code primary>disabled</Code> prop disables the trigger. If the panel is
                    open when <Code primary>disabled</Code> becomes <Code>true</Code>, it
                    auto-collapses and fires <Code primary>onCollapseChange(false)</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Collapse disabled>
                      <Collapse.Trigger title="Show more" />
                      <Collapse.Panel backgroundColor="secondary20" padding="medium">
                        <Text>Hidden content.</Text>
                      </Collapse.Panel>
                    </Collapse>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'collapse',
              title: 'Collapse',
              render: () => <CollapsePropTable />,
            },
            {
              id: 'collapse-trigger',
              title: 'Collapse.Trigger',
              render: () => (
                <CollapseTriggerPropTable inheritedProps={<MarginPropTable collapsible />} />
              ),
            },
            {
              id: 'collapse-panel',
              title: 'Collapse.Panel',
              render: () => (
                <CollapsePanelPropTable
                  inheritedProps={
                    <>
                      <MarginPropTable collapsible />
                      <PaddingPropTable collapsible />
                    </>
                  }
                />
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Do not use <Code primary>Collapse</Code> to hide elements necessary to complete a form
              - only optional/extra content.
            </>,
            <>
              Do not move <Code primary>Collapse</Code> component after click; instead, show the new
              content directly below the component and let the component remain stationary.
            </>,
          ]}
          recommended={[
            'Users should be able tell what’s beneath the collapse button without having to open it - make sure the label is specific and helpful!',
            'Collapse buttons should read like actions, and start with the word “Show”.',
            'Collapsed content should be lower priority information that users don’t always need to see.',
            'Left align directly under the content that is collapsed.',
            'Position the collapsible content immediately after the collapse button.',
            'Chevron arrow should flip vertically when component is toggled, to indicate the state of showing/hiding the content.',
          ]}
        />
      </Panel>
    </>
  );
};

export default CollapsePage;
