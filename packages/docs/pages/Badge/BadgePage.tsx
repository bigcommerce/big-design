import { Badge, Grid, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { BadgePropTable, MarginPropTable } from '../../PropTables';

const BadgePage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <BadgePropTable inheritedProps={<MarginPropTable collapsible />} />;
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview>
                {/* jsx-to-string:start */}
                <Badge label="active" variant="success" />
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Variants">
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
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Badge</H1>

      <Text>
        Badges are used to quickly indicate status or information to a user visually. Each variant correlates to a
        specific status or value.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default BadgePage;
