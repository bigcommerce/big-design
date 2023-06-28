import { Breadcrumb, H1, Link, Panel, Text } from '@bigcommerce/big-design';
import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { LinkPropTable, MarginPropTable } from '../PropTables';

const LinkPage = () => {
  return (
    <>
      <H1>Breadcrumb</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Provides a history of navigated pages, navigation to another page, and/or execution of an
          action.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Display how a user got to the current section or page.</List.Item>
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
                    A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all
                    native anchor element attributes.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb iconBefore={<OpenInNewIcon size="large" />}>
                      <span>Account Settings</span>
                      <Link href="#">Payment Methods</Link>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'external-link',
              title: 'External link',
              render: () => (
                <Fragment key="external-link">
                  <Text>You can also include an external icon.</Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Breadcrumb>
                      <Link href="#">Link example</Link>
                      <span>hello, world</span>
                    </Breadcrumb>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <LinkPropTable
          inheritedProps={<MarginPropTable collapsible />}
          nativeElement={['a', 'all']}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[<>Avoid using links for actions – use a button instead.</>]}
          recommended={[
            <>
              Use the <Code primary>external</Code> prop when a link navigates away from the control
              panel.
            </>,
            <>Usually within a sentence to provide additional guidance or information.</>,
            <>Use descriptive text to set clear expectations of the link destination.</>,
          ]}
        />
      </Panel>
    </>
  );
};

export default LinkPage;
