import { Box, H1, Panel, ProgressBar, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../../components';
import { ProgressBarPropTable } from '../../PropTables';

const ProgressBarPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
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
              Indeterminant Progress represents an unknown amount of time for a task to complete. Component will render
              an indeterminant progress when missing a <Code primary>percent</Code> prop.
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
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <ProgressBarPropTable />,
    },
  ];

  return (
    <>
      <H1>ProgressBar</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default ProgressBarPage;
