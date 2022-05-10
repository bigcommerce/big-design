import { Badge, Grid, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { GuidelinesTable } from '../components/GuidelinesTable';
import { BadgePropTable, MarginPropTable } from '../PropTables';

const BadgePage = () => {
  return (
    <>
      <H1>Badge</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Badges</Code> are labels that indicate the status of an object on the page.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Badges</Code> to indicate the connection status of a 3rd party integration (e.g. payment
            method, a channel connection).
          </List.Item>
          <List.Item>
            You can also use <Code primary>Badges</Code> to call attention to new features (e.g. “new”) or recommended
            integrations.
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
                  <Badge label="active" variant="success" />
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
                    There are five types of variants to choose from: <Code>success</Code>, <Code>secondary</Code>,{' '}
                    <Code>warning</Code>, <Code>danger</Code>, and <Code>primary</Code>. You can determine what type by
                    using the <Code primary>variant</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(5, min-content)">
                      <Badge variant="secondary" label="secondary" />
                      <Badge variant="success" label="success" />
                      <Badge variant="warning" label="warning" />
                      <Badge variant="danger" label="danger" />
                      <Badge variant="primary" label="primary" />
                    </Grid>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <BadgePropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={['Use the right colour for the right situation (e.g. red when something is broken / wrong).']}
          discouraged={[
            <>
              Don’t apply multiple <Code primary>Badges</Code> to the same object.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default BadgePage;
