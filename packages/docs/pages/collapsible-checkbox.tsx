import { H1, Panel, Text } from '@bigcommerce/big-design';
import { CollapsibleCheckbox } from '@bigcommerce/big-design-patterns';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, CodeSnippet, ContentRoutingTabs, GuidelinesTable } from '../components';
import { CollapsibleCheckboxPropsTable } from '../PropTables';

const CollapsibleCheckboxPage = () => {
  return (
    <>
      <H1>CollapsibleCheckbox</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>CollapsibleCheckbox</Code> component pairs a checkbox with a collapsible
          panel. The panel can only be expanded while the checkbox is checked, making it a
          convenient way to reveal optional settings that depend on a feature being enabled.
        </Text>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Fragment key="import">
          <Text>
            To use <Code primary>CollapsibleCheckbox</Code> import the component from the package:
          </Text>
          <CodeSnippet>{`import { CollapsibleCheckbox } from '@bigcommerce/big-design-patterns';`}</CodeSnippet>
        </Fragment>

        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    The component is controlled. Pass <Code primary>checked</Code> and{' '}
                    <Code primary>onChange</Code> to drive it — the panel is disabled automatically
                    while the checkbox is unchecked, so it can only be expanded once checked.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [checked, setChecked] = useState(false);

                      return (
                        <CollapsibleCheckbox
                          checked={checked}
                          label="Enable advanced settings"
                          onChange={(event) => setChecked(event.target.checked)}
                          triggerTitle="Advanced settings"
                        >
                          <Text marginBottom="none">
                            These settings are only available while the option above is enabled.
                          </Text>
                        </CollapsibleCheckbox>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'with-image',
              title: 'With image',
              render: () => (
                <Fragment key="with-image">
                  <Text>
                    Pass an <Code primary>img</Code> to display a thumbnail between the checkbox and
                    the label. The row is vertically centered automatically when an image is
                    present.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [checked, setChecked] = useState(false);

                      return (
                        <CollapsibleCheckbox
                          checked={checked}
                          description="Accept credit cards and digital wallets."
                          img={{ src: '/logo.svg', alt: 'Payment provider' }}
                          label="Enable payment provider"
                          onChange={(event) => setChecked(event.target.checked)}
                          triggerTitle="Provider settings"
                        >
                          <Text marginBottom="none">
                            Configure the provider once it has been enabled.
                          </Text>
                        </CollapsibleCheckbox>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'initially-open',
              title: 'Initially open',
              render: () => (
                <Fragment key="initially-open">
                  <Text>
                    Forward props to the underlying primitives with{' '}
                    <Code primary>collapseProps</Code>, <Code primary>triggerProps</Code>, and{' '}
                    <Code primary>panelProps</Code> — for example, start with the panel expanded, or
                    pass <Code primary>collapseProps.disabled</Code> to override the default gating.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [checked, setChecked] = useState(true);

                      return (
                        <CollapsibleCheckbox
                          checked={checked}
                          collapseProps={{ initiallyOpen: true }}
                          label="Subscribe to the newsletter"
                          onChange={(event) => setChecked(event.target.checked)}
                          panelProps={{ backgroundColor: 'secondary20', padding: 'medium' }}
                          triggerTitle="Email preferences"
                        >
                          <Text marginBottom="none">
                            Choose how often you want to hear from us.
                          </Text>
                        </CollapsibleCheckbox>
                      );
                    }}
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <CollapsibleCheckboxPropsTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={["Don't hide critical information inside the collapsible panel."]}
          recommended={[
            'Use to reveal optional settings that depend on a checkbox being enabled.',
            'Keep the trigger title short and descriptive of the revealed content.',
          ]}
        />
      </Panel>
    </>
  );
};

export default CollapsibleCheckboxPage;
