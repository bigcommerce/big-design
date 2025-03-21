import { Flex, H1, Panel, StatusMessage, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { GuidelinesTable } from '../components/GuidelinesTable';
import { ButtonPropTable } from '../PropTables';
import {
  StatusMessageButtonTable,
  StatusMessagePropTable,
} from '../PropTables/StatusMessagePropTable';

const BadgePage = () => {
  return (
    <>
      <H1>Status Message</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Status messages</Code> are a visual and textual representation of the
          current state of a page or feature. They are used to inform users about the status of
          their actions, such as success, error, or warning messages. Status messages can also be
          used to provide additional next steps by providing relevant actions.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Status messages</Code> to indicate the current status of a page or
            section (e.g. 401, 404 or 500 errors as well as empty states, connection failures and
            success screens).
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
                  <StatusMessage
                    actions={[{ text: 'Clear search', variant: 'secondary' }]}
                    heading='No results for search "yellow hat"'
                    message="Try adjusting your search or filter to find what you are looking for."
                    variant="search"
                  />
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
                    There are eight variants to choose from: <Code>404</Code>, <Code>info</Code>,{' '}
                    <Code>search</Code>, <Code>error</Code>, <Code>server-error</Code>,{' '}
                    <Code>success</Code>, <Code>unauthorized</Code> and <Code>warning</Code>. You
                    can determine what type by using the <Code primary>variant</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Flex flexDirection="column" flexGap="1rem">
                      <StatusMessage
                        actions={[{ text: 'Go back to main page', variant: 'subtle' }]}
                        heading="Page not found"
                        message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
                        variant="404"
                      />
                      <StatusMessage
                        actions={[{ text: 'Add product', variant: 'secondary' }]}
                        heading="You have no products yet"
                        message="Start adding products to your store to see them here."
                        variant="info"
                      />
                      <StatusMessage
                        actions={[{ text: 'Clear search', variant: 'secondary' }]}
                        heading='No results for search "yellow hat"'
                        message="Try adjusting your search or filter to find what you are looking for."
                        variant="search"
                      />
                      <StatusMessage
                        actions={[{ text: 'Retry', variant: 'secondary' }]}
                        heading="There was an error connecting to the server"
                        message="Please check your internet connection and try again."
                        variant="error"
                      />
                      <StatusMessage
                        actions={[{ text: 'Retry', variant: 'secondary' }]}
                        heading="Internal server error"
                        message="The server encountered an internal error and was unable to complete your request. Please try again later."
                        variant="server-error"
                      />
                      <StatusMessage
                        actions={[{ text: 'View details', variant: 'subtle' }]}
                        heading="Operation successful"
                        message="Your operation was completed successfully."
                        variant="success"
                      />
                      <StatusMessage
                        actions={[{ text: 'Request access', variant: 'secondary' }]}
                        heading="Unauthorized access"
                        message="You do not have the necessary permissions to access this resource."
                        variant="unauthorized"
                      />
                      <StatusMessage
                        actions={[{ text: 'Try again', variant: 'subtle' }]}
                        heading="Quota limit exceeded"
                        message="You have exceeded your quota limit for this resource. Please try again later."
                        variant="warning"
                      />
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'size',
              title: 'Size',
              render: () => (
                <Fragment key="size">
                  <Text>
                    There are two sizes to choose from: <Code>panel</Code> which is used to showcase
                    the message within panels, modals and other contained elemnts and{' '}
                    <Code>page</Code> which is used for full page status messages such as 404 pages
                    and 500 error pages .
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Flex flexDirection="column" flexGap="1rem">
                      <StatusMessage
                        actions={[{ text: 'Clear search', variant: 'secondary' }]}
                        heading='No results for search "yellow hat"'
                        message="Try adjusting your search or filter to find what you are looking for."
                        variant="search"
                      />
                      <StatusMessage
                        actions={[
                          { text: 'Go to main page', variant: 'subtle' },
                          { text: 'Retry', variant: 'subtle' },
                        ]}
                        heading="Internal server error"
                        message="The server encountered an internal error and was unable to complete your request. Please try again later."
                        size="page"
                        variant="server-error"
                      />
                    </Flex>
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
              id: 'status-message',
              title: 'StatusMessage',
              render: () => <StatusMessagePropTable />,
            },
            {
              id: 'status-message-button',
              title: 'StatusMessageButton',
              render: () => (
                <StatusMessageButtonTable
                  id="status-message-button-prop-table"
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
            <>
              Don’t use the <Code>page</Code> size within contained elments like panels, modals,
              etc.
            </>,
            'Avoid more than two actions, as this can overwhelm the user.',
          ]}
          recommended={[
            <>
              Use the <Code>page</Code> size for full page warnings and errors.
            </>,
            'Provide meaningful actions that are relevant to the status message.',
          ]}
        />
      </Panel>
    </>
  );
};

export default BadgePage;
