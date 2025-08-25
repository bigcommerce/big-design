import { Grid, H1, Lozenge, Panel, Popover, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { GuidelinesTable } from '../components/GuidelinesTable';
import { LozengePropTable, MarginPropTable } from '../PropTables';

const LozengePage = () => {
  return (
    <>
      <H1>Lozenge</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Lozenges</Code> are labels that indicate the development lifecycle status of
          a feature.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Lozenges</Code> to indicate the lifecycle status of a feature (e.g.
            <Code>alpha</Code>, <Code>beta</Code>, <Code>early-access</Code>, <Code>new</Code>,{' '}
            <Code>deprecated</Code>, <Code>legacy</Code>).
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
                <CodePreview key="basic">
                  {/* jsx-to-string:start */}
                  <Lozenge label="New" variant="new" />
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'variants',
              title: 'Variants',
              render: () => (
                <Fragment key="variants">
                  <Text>
                    There are six variants to choose from: <Code>alpha</Code>, <Code>beta</Code>,{' '}
                    <Code>deprecated</Code>, <Code>early-access</Code>, <Code>legacy</Code>, and{' '}
                    <Code>new</Code>. Choose with the <Code primary>variant</Code> prop. The default
                    is <Code>new</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(6, min-content)" style={{ justifyItems: 'start' }}>
                      <Lozenge label="Alpha" variant="alpha" />
                      <Lozenge label="Beta" variant="beta" />
                      <Lozenge label="Deprecated" variant="deprecated" />
                      <Lozenge label="Early access" variant="early-access" />
                      <Lozenge label="Legacy" variant="legacy" />
                      <Lozenge label="New" variant="new" />
                    </Grid>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'tooltipContent',
              title: 'With Tooltip',
              render: () => (
                <Fragment key="tooltipIcon">
                  <Text>
                    Provide <Code>tooltipContent</Code> to append an info icon and show additional
                    context on hover/focus.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Lozenge
                      label="Beta"
                      tooltipContent="This feature is in open beta until August 12"
                      variant="beta"
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'popover',
              title: 'With Popover',
              render: () => (
                <Fragment key="popover">
                  <Text>
                    Use <Code>onClick</Code> and <Code>isOpen</Code> to render a button-styled
                    lozenge that can act as a popover trigger. The caret and{' '}
                    <Code>aria-expanded</Code> state are controlled by <Code>isOpen</Code>.
                  </Text>
                  {/* eslint-disable import/no-named-as-default-member */}
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [isOpen, setIsOpen] = React.useState(false);
                      const lozengeRef = React.useRef<HTMLElement | null>(null);

                      return (
                        <>
                          <Lozenge
                            isOpen={isOpen}
                            label="New"
                            onClick={() => setIsOpen((prev) => !prev)}
                            ref={(el) => {
                              lozengeRef.current = el;
                            }}
                            variant="new"
                          />
                          {isOpen && (
                            <Popover
                              anchorElement={lozengeRef.current}
                              isOpen
                              label="Example Popover"
                              onClose={() => setIsOpen(false)}
                              placement="bottom-start"
                            >
                              <Text>This is the popover content!</Text>
                            </Popover>
                          )}
                        </>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                  {/* eslint-enable import/no-named-as-default-member */}
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <LozengePropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            `Don't use a Lozenge for statuses unrelated to feature lifecycle (e.g., “enabled/disabled”, success/error).`,
            `Don't use tooltip and popover modes together; pick one interaction pattern.`,
          ]}
          recommended={[
            <>
              Use the variant that matches the lifecycle:
              <List>
                <List.Item>
                  <Code>alpha</Code>/<Code>beta</Code> for pre-GA testing states.
                </List.Item>
                <List.Item>
                  <Code>early-access</Code> for limited/opt-in availability.
                </List.Item>
                <List.Item>
                  <Code>new</Code> for generally available, recently released features.
                </List.Item>
                <List.Item>
                  <Code>deprecated</Code>/<Code>legacy</Code> for sunsetting or superseded features.
                </List.Item>
              </List>
            </>,
            `When using as a popover trigger, keep the popover content short and action-oriented (e.g., links to docs or release notes).`,
          ]}
        />
      </Panel>
    </>
  );
};

export default LozengePage;
