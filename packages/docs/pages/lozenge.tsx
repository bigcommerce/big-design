import { Grid, H1, Lozenge, Panel, Text } from '@bigcommerce/big-design';
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
          <Code primary>Lozenge</Code> are labels that indicate the development lifecycle status of
          a feature.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Lozenges</Code> to indicate the status of a feature (e.g. “alpha”,
            "beta", "new").
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
                    There are five types of variants to choose from: <Code>alpha</Code>,{' '}
                    <Code>beta</Code>, <Code>deprecated</Code>, <Code>legacy</Code>, and{' '}
                    <Code>new</Code>. You can determine what type by using the{' '}
                    <Code primary>variant</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(5, min-content)" style={{ justifyItems: 'start' }}>
                      <Lozenge label="Alpha" variant="alpha" />
                      <Lozenge label="Beta" variant="beta" />
                      <Lozenge label="Deprecated" variant="deprecated" />
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
                    Use the <Code>tooltipContent</Code> prop when using the <Code>Lozenge</Code> to
                    provide the lozenge with a tooltip holding extra information on the status.
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
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <LozengePropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[`Don't use the Lozenge to convey statuses other than feature lifecycle.`]}
          recommended={[
            <>
              Use the corresponding variant for the right lifecycle (e.g. <Code>new</Code> when
              something is "New" or in "Early access").
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default LozengePage;
