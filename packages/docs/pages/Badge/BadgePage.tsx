import { Badge, Grid, H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { BadgePropTable, MarginPropTable } from '../../PropTables';

const BadgePage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>
              Badges are used to quickly indicate status or information to a user visually. Each variant correlates to a
              specific status or value.
            </Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              <Badge label="active" variant="success" />
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Variants">
            <Text>
              There are five types of variants to choose from: <Code>success</Code>, <Code>secondary</Code>,{' '}
              <Code>warning</Code>, <Code>danger</Code>, and <Code>primary</Code>. You can determine what type by using
              the <Code primary>variant</Code> prop.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <BadgePropTable inheritedProps={<MarginPropTable collapsible />} />,
    },
  ];

  return (
    <>
      <H1>Badge</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default BadgePage;
