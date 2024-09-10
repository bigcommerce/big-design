import { H1, Panel, Text } from '@bigcommerce/big-design';
import { AddIcon, ArrowDropDownIcon } from '@bigcommerce/big-design-icons';
import { ActionBar, Header, Page } from '@bigcommerce/big-design-patterns';
import React, { Fragment } from 'react';

import {
  Code,
  CodePreview,
  CodeSnippet,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
} from '../components';
import { BackgroundPropsTable, PagePropsTable } from '../PropTables/PagePropTable';

const HeaderPage = () => {
  return (
    <>
      <H1>Page</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>Page</Code> component serves as a high-level layout component that
          organizes the content of a page, including optional elements such as a{' '}
          <Code primary>Header</Code>, <Code primary>Message</Code>, and{' '}
          <Code primary>ActionBar</Code>. It ensures consistent spacing, background management, and
          placement of key UI elements.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            To provide a container for the entire page structure, including header, content,
            messages, and action buttons.
          </List.Item>
          <List.Item>
            To maintain consistency in page layout and background customization.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Fragment key="basic">
          <Text>
            To use <Code primary>Page</Code> import the component from the package:
          </Text>
          <CodeSnippet>{`import { Page } from '@bigcommerce/big-design-patterns';`}</CodeSnippet>
        </Fragment>
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    <Code primary>Page</Code> is a high-level layout component that organizes the
                    content of a page.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Page
                      header={
                        <Header description="Page description (optional)" title="Basic page" />
                      }
                    >
                      <Panel header="Main contents">
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </Text>
                      </Panel>
                    </Page>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'message',
              title: 'Status messasges',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    The <Code primary>Message</Code> prop allows you to deliver status information
                    relevant to the context shown on the page and relates to the information
                    displayed below it.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Page
                      header={<Header title="Status messages" />}
                      message={{
                        header: 'Status message title',
                        type: 'success',
                        messages: [
                          {
                            text: 'This is a success message.',
                            link: {
                              href: 'https://www.bigcommerce.com',
                              target: '_blank',
                              text: 'Learn more',
                            },
                          },
                        ],
                      }}
                    >
                      <Panel header="Main contents">
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </Text>
                      </Panel>
                    </Page>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'header-actions',
              title: 'Header actions',
              render: () => (
                <Fragment key="header-actions">
                  <Text>
                    The <Code primary>Header</Code> component allows you to add actions to the
                    header, such as buttons or dropdowns.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Page
                      header={
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
                          description="Page description (optional)"
                          title="Header with actions"
                        />
                      }
                    >
                      <Panel header="Page contents">
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </Text>
                      </Panel>
                    </Page>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'action-bar',
              title: 'Action Bar',
              render: () => (
                <Fragment key="action-bar">
                  <Text>
                    Use to provide quick and consistent access to key actions at the bottom of a
                    page. Be aware that pages may only have one primary action button, which would
                    be placed in the action bar.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Page
                      actionBar={
                        <ActionBar
                          actions={[
                            {
                              text: 'Main action',
                              variant: 'primary',
                            },
                            {
                              text: 'Dismiss',
                              variant: 'subtle',
                            },
                          ]}
                        />
                      }
                      header={
                        <Header
                          actions={[
                            {
                              text: 'Secondary',
                              variant: 'secondary',
                              iconLeft: <AddIcon />,
                            },
                          ]}
                          description="Page description (optional)"
                          title="Page with action bar"
                        />
                      }
                    >
                      <Panel header="Page contents">
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </Text>
                      </Panel>
                    </Page>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'background-images',
              title: 'Background images',
              render: () => (
                <Fragment key="background-images">
                  <Text>
                    On featured pages, you may want to add a background image to the page to provide
                    context or visual interest. The <Code primary>Page</Code> component allows you
                    to add a background image with custom positioning and size.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Page
                      background={{
                        src: '/page-background.svg',
                        backgroundSize: 'contain',
                        backgroundPosition: 'top right',
                      }}
                      header={
                        <Header
                          actions={[
                            { text: 'Primary', variant: 'primary' },
                            { text: 'Secondary', variant: 'secondary' },
                          ]}
                          description="Page description (optional)"
                          title="Page Title"
                        />
                      }
                    >
                      <Panel header="Main contents">
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </Text>
                      </Panel>
                    </Page>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'page-props',
              title: 'Page',
              render: () => <PagePropsTable />,
            },
            {
              id: 'background-props',
              title: 'Background',
              render: () => <BackgroundPropsTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            `Don’t pass non-Header or non-ActionBar components to the 'header' or 'actionBar' props.`,
            `Avoid using the Page component for small sections of content; 
            it’s meant to wrap the entire page.`,
          ]}
          recommended={[
            `Use the Page component as a container for your entire page structure, including header, 
            content, messages, and action buttons.`,
            `Utilize the 'background' prop to customize the page's background, 
            aligning it with the overall design.`,
          ]}
        />
      </Panel>
    </>
  );
};

export default HeaderPage;
