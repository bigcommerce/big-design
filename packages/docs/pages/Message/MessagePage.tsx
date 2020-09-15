import { H0, H1, H2, Message, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, Collapsible } from '../../components';
import { MarginPropTable } from '../../PropTables';
import { MessagePropTable } from '../../PropTables/MessagePropTable';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';

const MessagePage = () => (
  <>
    <H0>Messages</H0>
    <Text>
      A message primarily used for displaying page/table messaging, feature/discover/system level messages, or even
      non-critical messaging.
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

    <H1>API</H1>

    <MessagePropTable />

    <MessagingItemPropTable title="Message[MessageItem]" />

    <MessagingLinkItemPropTable title="Message[MessageLinkItem]" />

    <H2>Inherited Props</H2>

    <Collapsible title="Inherited Props">
      <MarginPropTable />
    </Collapsible>

    <H1>Examples</H1>

    <H2>Types</H2>

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

    <H2>Header</H2>

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

    <H2>onClose</H2>

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

    <H2>Actions</H2>

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
            { text: 'Second Action', variant: 'secondary', onClick: () => null },
          ]}
          header="header"
          type="info"
          messages={[{ text: 'Required description copy.' }]}
          marginVertical="medium"
        />
      </>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default MessagePage;
