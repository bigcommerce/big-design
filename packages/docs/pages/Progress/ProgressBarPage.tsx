import { Box, H1, Panel, ProgressBar, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { ProgressBarPropTable } from '../../PropTables';

const ProgressBarPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <ProgressBarPropTable />;
      case 'examples':
      default:
        return (
          <>
            <Panel header="Determinant">
              <Text>
                Determinant Progress represents a known amount of time or completeness for a task. A{' '}
                <Code primary>percent</Code> prop needs to be passed to render a determinate progress.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Box marginVertical="large">
                  <ProgressBar percent={50} />
                </Box>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Indeterminant">
              <Text>
                Indeterminant Progress represents an unknown amount of time for a task to complete. Component will
                render an indeterminant progress when missing a <Code primary>percent</Code> prop.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Box marginVertical="large">
                  <ProgressBar />
                </Box>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Progress bar</H1>

      <Text>Use a Progress bar to indicate progress in a process that's happening behind the scenes.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default ProgressBarPage;
