import { H1, Message, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, PageNavigation } from '../components';
import { MarginPropTable, MessagePropTable } from '../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../PropTables/shared';

const MessagePage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>
              A message primarily used for displaying page/table messaging, feature/discover/system level messages, or
              even non-critical messaging.
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
          </Panel>
          <Panel header="Types">
            <Text>
              There are four types of <Code primary>Messages</Code> based on the level of message you want to display.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Message type="error" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
                <Message type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
                <Message type="warning" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
                <Message type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
              </>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Header">
            <Text>
              <Code primary>Message</Code>'s allow you to pass an optional <Code primary>header</Code> prop.
            </Text>

            <CodePreview>
              {/* jsx-to-string:start */}
              <>
                <Message type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
                <Message
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
                <Message type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
                <Message
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
              <Code primary>Message</Code>'s allow you to pass an optional <Code primary>actions</Code> prop.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => (
        <>
          <MessagePropTable inheritedProps={<MarginPropTable collapsible />} />
          <MessagingItemPropTable title="Message[MessageItem]" />
          <MessagingLinkItemPropTable title="Message[MessageLinkItem]" />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>Message</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default MessagePage;
