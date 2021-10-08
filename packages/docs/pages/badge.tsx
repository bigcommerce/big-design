import { Badge, Grid, H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { BadgePropTable, MarginPropTable } from '../PropTables';

const BadgePage = () => {
  return (
    <>
      <H1>Badge</H1>

      <Panel header="Overview" headerId="overview">
        <Text>Badges are labels that indicate the status of an object on the page.</Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>
            Use badges to indicate the connection status of a 3rd party integration (e.g. payment method, a channel
            connection).
          </List.Item>
          <List.Item>
            You can also use badges to call attention to new features (e.g. “new”) or recommended integrations.
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
                <CodePreview>
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
                <>
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
                </>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <BadgePropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />
      </Panel>
    </>
  );
};

export default BadgePage;
