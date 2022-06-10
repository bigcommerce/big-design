import { Box, H1, Panel, ProgressBar, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { ProgressBarPropTable } from '../PropTables';

const ProgressBarPage = () => {
  return (
    <>
      <H1>ProgressBar</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Progress indicators give the user system visibility when a front end action triggers a
          need from the back end.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Progress indicators can be combined with additional status feedback.
          </List.Item>
          <List.Item>Use when there is a greater than one second waiting time.</List.Item>
        </List>
        <Text>Linear progress</Text>
        <List>
          <List.Item>Often used to reflect import/export actions.</List.Item>
          <List.Item>
            Use the indeterminant linear progress, where there is an unknown amount of time for a
            task to complete.
          </List.Item>
          <List.Item>
            Use the determinant linear progress, where there is a known amount of time for a task to
            complete.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'determinant',
              title: 'Determinant',
              render: () => (
                <Fragment key="determinant">
                  <Text>
                    Determinant Progress represents a known amount of time or completeness for a
                    task. A <Code primary>percent</Code> prop needs to be passed to render a
                    determinate progress.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box marginVertical="large">
                      <ProgressBar percent={50} />
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'indeterminant',
              title: 'Indeterminant',
              render: () => (
                <Fragment key="indeterminant">
                  <Text>
                    Indeterminant Progress represents an unknown amount of time for a task to
                    complete. Component will render an indeterminant progress when missing a{' '}
                    <Code primary>percent</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Box marginVertical="large">
                      <ProgressBar />
                    </Box>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ProgressBarPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>Don’t use if an action is not triggering a back end action.</>,
            <>Don’t use to indicate the completeness of a user-dependent task.</>,
          ]}
          recommended={[
            <>Status feedback should be clear and direct. Limit verbiage and information.</>,
            <>
              If progress is determinate, use a percentage or copy to reflect the completeness of
              the action.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default ProgressBarPage;
