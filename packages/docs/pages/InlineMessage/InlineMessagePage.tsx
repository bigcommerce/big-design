import { H0, H1, H2, InlineMessage, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview, Collapsible } from '../../components';
import { InlineMessagePropTable, MarginPropTable } from '../../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';

const InlineMessagePage = () => (
  <>
    <H0>Inline Messages</H0>
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

    <H1>API</H1>

    <InlineMessagePropTable />

    <MessagingItemPropTable title="InlineMessage[MessageItem]" />

    <MessagingLinkItemPropTable title="InlineMessage[MessageLinkItem]" />

    <H2>Inherited Props</H2>

    <Collapsible title="Inherited Props">
      <MarginPropTable />
    </Collapsible>

    <H1>Examples</H1>

    <H2>Types</H2>

    <Text>
      There are four types of <Code primary>InlineMessages</Code> based on the level of message you want to display.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <InlineMessage type="error" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineMessage type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineMessage type="warning" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineMessage type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Header</H2>

    <Text>
      <Code primary>InlineMessage</Code>'s allow you to pass an optional <Code primary>header</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <InlineMessage type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineMessage
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
        <InlineMessage type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineMessage
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
  </>
);

export default InlineMessagePage;
