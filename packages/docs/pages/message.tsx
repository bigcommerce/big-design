import { H1, Message, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List, NextLink } from '../components';
import { MarginPropTable, MessagePropTable } from '../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../PropTables/shared';

const MessagePage = () => {
  return (
    <>
      <H1>Message</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Messages</Code> inform merchants about important page or system level changes or persistent
          conditions that need their attention.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>To communicate to the merchant in a prominent way.</List.Item>
          <List.Item>To update them about a change or give them pertinent information.</List.Item>
          <List.Item>To communicate a problem that needs to be resolved.</List.Item>
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
                <Fragment key="basic">
                  <Text>
                    A message primarily used for displaying page/table messaging, feature/discover/system level
                    messages, or even non-critical messaging.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Message
                      header="Header"
                      messages={[
                        {
                          text: 'Required description copy.',
                          link: {
                            text: 'Optional Link',
                            href: '#',
                          },
                        },
                      ]}
                      onClose={() => null}
                    />
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'types',
              title: 'Types',
              render: () => (
                <Fragment key="types">
                  <Text>
                    There are four types of <Code primary>Messages</Code> based on the level of message you want to
                    display.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Message
                        type="error"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        type="success"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        type="warning"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        type="info"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'header',
              title: 'Header',
              render: () => (
                <Fragment key="header">
                  <Text>
                    <Code primary>Messages</Code> allow you to pass an optional <Code primary>header</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Message
                        type="success"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        header="Header"
                        type="success"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'onclose',
              title: 'onClose',
              render: () => (
                <Fragment key="onclose">
                  <Text>Toggles the visibility of the close button, and provides an on click callback.</Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Message
                        type="info"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        onClose={() => null}
                        type="info"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                    </>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'actions',
              title: 'Actions',
              render: () => (
                <Fragment key="actions">
                  <Text>
                    <Code primary>Messages</Code> allow you to pass an optional <Code primary>actions</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <Message
                        header="header"
                        type="info"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                      <Message
                        actions={[
                          { text: 'First Action', onClick: () => null },
                          { text: 'Second Action', variant: 'subtle', onClick: () => null },
                        ]}
                        header="header"
                        type="info"
                        messages={[{ text: 'Required description copy.' }]}
                        marginVertical="medium"
                      />
                    </>
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
              id: 'inline-message',
              title: 'InlineMessage',
              render: () => <MessagePropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />,
            },
            {
              id: 'message-item',
              title: 'MessageItem',
              render: () => <MessagingItemPropTable id="message-item-prop-table" renderPanel={false} />,
            },
            {
              id: 'message-link-item',
              title: 'MessageLinkItem',
              render: () => <MessagingLinkItemPropTable id="message-link-item-prop-table" renderPanel={false} />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            'To display a page or system level message.',
            'Can be persistent (until the issue is resolved) or dismissable.',
            'Should be placed directly below the page header at the top of the page.',
            'Should focus on a single theme or piece of information and must include a clear description that summarises the issue and how to resolve it.',
            'Be written in sentence case with appropriate punctuation.',
          ]}
          discouraged={[
            <>
              Never use <Code primary>Messages</Code> for marketing information or upsell.
            </>,
            'Not be used as the primary entry point for information or actions that the merchant needs on a regular basis.',
            <>
              Never place <Code primary>Messages</Code> in the middle or on the bottom of a page. Instead use an{' '}
              <NextLink href="/inline-message">InlineMessage</NextLink>.
            </>,
            <>
              Never use <Code primary>Messages</Code> for quick, dismissable feedback on actions. Instead use{' '}
              <NextLink href="/alert">Alerts</NextLink>.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default MessagePage;
