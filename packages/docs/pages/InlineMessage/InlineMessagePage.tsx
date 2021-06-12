import { H1, InlineMessage, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { InlineMessagePropTable } from '../../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';

const InlineMessagePage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <>
            <InlineMessagePropTable />

            <MessagingItemPropTable title="InlineMessage[MessageItem]" />

            <MessagingLinkItemPropTable title="InlineMessage[MessageLinkItem]" />
          </>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel>
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
        );
    }
  };

  return (
    <>
      <H1>Inline message</H1>
      <Text>
        An inline message, mostly used for displaying alerts within Modals. Is a condensed version of the{' '}
        <Code primary>Message</Code> component.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default InlineMessagePage;
