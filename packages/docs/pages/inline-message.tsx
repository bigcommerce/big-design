import { H1, InlineMessage, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../components';
import { InlineMessagePropTable } from '../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../PropTables/shared';

const InlineMessagePage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>
              An inline message, mostly used for displaying alerts within Modals. Is a condensed version of the{' '}
              <Code primary>Message</Code> component.
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
          </Panel>
          <Panel header="Types">
            <Text>
              There are four types of <Code primary>InlineMessages</Code> based on the level of message you want to
              display.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <InlineMessage
                  type="error"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
                  type="success"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
                  type="warning"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
                  type="info"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Header">
            <Text>
              <Code primary>InlineMessage</Code>'s allow you to pass an optional <Code primary>header</Code> prop.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <InlineMessage
                  type="success"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
                  header="Header"
                  type="success"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="onClose">
            <Text>Toggles the visibility of the close button, and provides an on click callback.</Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <InlineMessage
                  type="info"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
                  onClose={() => null}
                  type="info"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Actions">
            <Text>
              <Code primary>InlineMessage</Code>'s allow you to pass an optional <Code primary>actions</Code> prop.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <InlineMessage
                  header="header"
                  type="info"
                  messages={[{ text: 'Required description copy.' }]}
                  marginVertical="medium"
                />
                <InlineMessage
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => (
        <>
          <InlineMessagePropTable />
          <MessagingItemPropTable title="InlineMessage[MessageItem]" />
          <MessagingLinkItemPropTable title="InlineMessage[MessageLinkItem]" />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>InlineMessage</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default InlineMessagePage;
