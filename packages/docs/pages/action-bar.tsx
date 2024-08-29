import { H1, Panel, Text } from '@bigcommerce/big-design';
import { ActionBar } from '@bigcommerce/big-design-patterns';
import React, { Fragment } from 'react';

import {
  Code,
  CodePreview,
  CodeSnippet,
  ContentRoutingTabs,
  GuidelinesTable,
} from '../components';

import { ButtonPropTable } from '../PropTables';

import { ActionBarPropsTable, ActionButtonPropsTable } from '../PropTables/ActionBarPropTable';

const ActionBarPage = () => {
  return (
    <>
      <H1>ActionBar</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>ActionBar</Code> component provides a consistent way to display a set of
          action buttons at the bottom of a page or section. It supports up to three actions and
          ensures visual consistency across the platform.
        </Text>

        <Text>Use to provide quick and consistent access to key actions at the bottom of a page.</Text>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Fragment key="basic">
          <Text>
            To use <Code primary>ActionBar</Code> import the component from the package:
          </Text>
          <CodeSnippet>{`import { ActionBar } from '@bigcommerce/big-design-patterns';`}</CodeSnippet>
        </Fragment>
        <CodePreview>
          {/* jsx-to-string:start */}
          <ActionBar
            actions={[
              {
                text: 'Primary',
                variant: 'primary',
              },
              {
                text: 'Secondary',
                variant: 'secondary',
              },
            ]}
          />
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'action-bar-props',
              title: 'ActionBar',
              render: () => <ActionBarPropsTable />,
            },
            {
              id: 'action-button-props',
              title: 'ActionButton',
              render: () => (
                <ActionButtonPropsTable
                  id="action-button-prop-table"
                  inheritedProps={<ButtonPropTable collapsible />}
                />
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            'Don\'t use for non-critical actions.',
          ]}
          recommended={[
            'Use to provide quick and consistent access to key actions.',
            'Limit the number of actions to three, prioritizing the most important ones.',
            'Ensure that only one primary action is included to guide user focus.',
          ]}
        />
      </Panel>
    </>
  );
};

export default ActionBarPage;
