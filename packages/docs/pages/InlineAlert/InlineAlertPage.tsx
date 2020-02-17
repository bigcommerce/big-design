import { H0, H1, H2, InlineAlert, Text } from '@bigcommerce/big-design';

import { Code, CodePreview, Collapsible } from '../../components';
import { MarginPropTable } from '../../PropTables';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';
import { InlineAlertPropTable } from '../../PropTables/InlineAlertPropTable';

export default () => (
  <>
    <H0>Inline Alerts</H0>
    <Text>
      An inline alert, mostly used for displaying alerts within Modals. Is a condensed version of the{' '}
      <Code primary>Message</Code> component.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <InlineAlert
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

    <InlineAlertPropTable />

    <MessagingItemPropTable title="InlineAlert[MessageItem]" />

    <MessagingLinkItemPropTable title="InlineAlert[MessageLinkItem]" />

    <H2>Inherited Props</H2>

    <Collapsible title="Inherited Props">
      <MarginPropTable />
    </Collapsible>

    <H1>Examples</H1>

    <H2>Types</H2>

    <Text>
      There are four types of <Code primary>InlineAlerts</Code> based on the level of message you want to display.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <InlineAlert type="error" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineAlert type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineAlert type="warning" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineAlert type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Header</H2>

    <Text>
      <Code primary>InlineAlert</Code>'s allow you to pass an optional <Code primary>header</Code> prop.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <InlineAlert type="success" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineAlert
          header="Header"
          type="success"
          messages={[{ text: 'Required description copy.' }]}
          marginVertical="medium"
        />
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>onClose</H2>

    <Text>Used the toggle the visibility the close button and provide an onClick callback.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <InlineAlert type="info" messages={[{ text: 'Required description copy.' }]} marginVertical="medium" />
        <InlineAlert
          onClose={() => null}
          type="info"
          messages={[{ text: 'Required description copy.' }]}
          marginVertical="medium"
        />
      </>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
