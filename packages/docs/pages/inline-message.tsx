import { H1, InlineMessage, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import {
  Code,
  CodePreview,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
  NextLink,
} from '../components';
import { InlineMessagePropTable } from '../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../PropTables/shared';

const InlineMessagePage = () => {
  return (
    <>
      <H1>InlineMessage</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>InlineMessages</Code> inform merchants about important component/section
          level changes or persistent conditions that need their attention.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            To alert the merchant of a change or condition related to an individual component or
            section.
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
                <Fragment key="basic">
                  <Text>
                    An inline message, mostly used for displaying alerts within{' '}
                    <Code primary>Modals</Code>. Is a condensed version of the{' '}
                    <NextLink href="/message">Message</NextLink> component.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <InlineMessage
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
                    There are four types of <Code primary>InlineMessages</Code> based on the level
                    of message you want to display.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="error"
                      />
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="success"
                      />
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="warning"
                      />
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="info"
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
                    <Code primary>InlineMessages</Code> allow you to pass an optional{' '}
                    <Code primary>header</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="success"
                      />
                      <InlineMessage
                        header="Header"
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="success"
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
                  <Text>
                    Toggles the visibility of the close button, and provides an on click callback.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="info"
                      />
                      <InlineMessage
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        onClose={() => null}
                        type="info"
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
                    <Code primary>InlineMessages</Code> allow you to pass an optional{' '}
                    <Code primary>actions</Code> prop.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <>
                      <InlineMessage
                        header="header"
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="info"
                      />
                      <InlineMessage
                        actions={[
                          { text: 'First Action', onClick: () => null },
                          { text: 'Second Action', variant: 'subtle', onClick: () => null },
                        ]}
                        header="header"
                        marginVertical="medium"
                        messages={[{ text: 'Required description copy.' }]}
                        type="info"
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
              render: () => <InlineMessagePropTable />,
            },
            {
              id: 'message-item',
              title: 'MessageItem',
              render: () => <MessagingItemPropTable id="message-item-prop-table" />,
            },
            {
              id: 'message-link-item',
              title: 'MessageLinkItem',
              render: () => <MessagingLinkItemPropTable id="message-link-item-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Never use <Code primary>InlineMessages</Code> for marketing information or upsell.
            </>,
            <>
              Don’t use <Code primary>InlineMessages</Code> as the primary entry point for
              information or actions that the merchant needs on a regular basis.
            </>,
            <>
              Never place <Code primary>InlineMessages</Code> in the middle or at the bottom of a
              page. Instead use a <NextLink href="/message">Message</NextLink>.
            </>,
            <>
              Never use <Code primary>InlineMessages</Code> for quick, dismissable feedback on
              actions. Instead use <NextLink href="/alert">Alerts</NextLink>.
            </>,
          ]}
          recommended={[
            <>
              Place message within the <Code primary>Modal</Code> or <Code primary>Panel</Code>{' '}
              where the information or actions related to the message are located.
            </>,
            'Can be persistent (until the issue is resolved)  or dismissable.',
            'Focus on a single theme or piece of information and include a clear description that summarises the issue and how to resolve it. ',
            'Should be written in sentence case with appropriate punctuation. ',
          ]}
        />
      </Panel>
    </>
  );
};

export default InlineMessagePage;
