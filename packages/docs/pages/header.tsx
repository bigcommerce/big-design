import { H1, Panel, Text } from '@bigcommerce/big-design';
import { AddIcon, ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { Header } from '@bigcommerce/big-design-patterns';
import React, { Fragment } from 'react';

import {
  Code,
  CodePreview,
  CodeSnippet,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
} from '../components';
import { ButtonPropTable, DropdownPropTable } from '../PropTables';
import {
  ActionButtonPropsTable,
  ActionDropdownPropsTable,
  BackLinkPropsTable,
  HeaderPropTable,
} from '../PropTables/HeaderPropTable';

const HeaderPage = () => {
  return (
    <>
      <H1>Header</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Header</Code> is a layout component that provides a standard structure for
          page titles, descriptions, icons, badges, and actions.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>To display a title and related actions at the top of a page.</List.Item>
          <List.Item>To provide context and quick actions for users.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Fragment key="basic">
          <Text>
            To use <Code primary>Header</Code> import the component from the package:
          </Text>
          <CodeSnippet>{`import { Header } from '@bigcommerce/big-design-patterns';`}</CodeSnippet>
        </Fragment>
        <CodePreview>
          {/* jsx-to-string:start */}
          <Header
            actions={[
              {
                text: 'Main',
                variant: 'primary',
                iconLeft: <AddIcon />,
              },
              {
                items: [
                  { content: 'Option 1', onItemClick: (item) => item },
                  { content: 'Option 2', onItemClick: (item) => item },
                ],
                toggle: {
                  text: 'Secondary',
                  variant: 'secondary',
                  iconRight: <ArrowDropDownIcon />,
                },
              },
              {
                text: 'Tertiary',
                variant: 'subtle',
              },
            ]}
            backLink={{
              text: 'Back to Dashboard',
              href: '/dashboard',
            }}
            badge={{ label: 'Active', variant: 'success' }}
            description="This is a description of the page content."
            lozenge={{ variant: 'beta', label: 'Beta' }}
            title="Page Title"
          />
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'header',
              title: 'Header',
              render: () => <HeaderPropTable />,
            },
            {
              id: 'action-button',
              title: 'ActionButton',
              render: () => (
                <ActionButtonPropsTable
                  id="action-button-prop-table"
                  inheritedProps={<ButtonPropTable collapsible />}
                />
              ),
            },
            {
              id: 'action-dropdown',
              title: 'ActionDropdown',
              render: () => (
                <ActionDropdownPropsTable
                  id="action-dropdown-prop-table"
                  inheritedProps={<DropdownPropTable collapsible />}
                />
              ),
            },
            {
              id: 'back-link',
              title: 'BackLink',
              render: () => <BackLinkPropsTable id="backlink-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            'Don’t overload the header with too many actions or content.',
            'Don’t use more than one primary action button.',
            'Avoid unrelated or non-contextual content in the header.',
            'Don’t use badges to showcase feature lifecycle.',
            'Don’t use lozenges to showcase system status.',
          ]}
          recommended={[
            'Use the header to provide a clear overview of the page’s purpose.',
            'Limit the number of actions to three.',
            'Utilize the back link option for easy navigation.',
            'Use badges to indicate system status.',
            'Use lozenges to indicate feature lifecycle.',
          ]}
        />
      </Panel>
    </>
  );
};

export default HeaderPage;
