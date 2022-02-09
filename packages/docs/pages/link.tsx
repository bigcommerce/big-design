import { H1, Link, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { LinkPropTable, MarginPropTable } from '../PropTables';

const LinkPage = () => {
  return (
    <>
      <H1>Link</H1>

      <Panel header="Overview" headerId="overview">
        <Text>Provides navigation to another page</Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Navigate to an external webpage</List.Item>
          <List.Item>Navigate to helpful documentation</List.Item>
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
                    A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element
                    attributes.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Link href="#">Link Example</Link>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'external-link',
              title: 'External Link',
              render: () => (
                <Fragment key="external-link">
                  <Text>You can also include an external icon.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Link href="#" target="_blank" external>
                      Learn More
                    </Link>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <LinkPropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Use the <Code primary>external</Code> prop when a link navigates away from the control panel.
            </>,
            <>Usually within a sentance to provide additional guidance or information.</>,
            <>Use descriptive text to set clear expectations of the link destination.</>,
          ]}
          discouraged={[<>Avoid using links for actions – use a button instead.</>]}
        />
      </Panel>
    </>
  );
};

export default LinkPage;
