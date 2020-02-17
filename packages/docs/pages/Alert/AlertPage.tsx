import { alertsManager, AlertsManager, AlertProps, Button, H0, H1, H2, Message, Text } from '@bigcommerce/big-design';

import { Code, CodePreview, CodeSnippet } from '../../components';
import {
  AlertsManagerAddMethodList,
  AlertsManagerRemoveMethodList,
  AlertsManagerSubscribeMethodList,
} from '../../MethodLists';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';
import { AlertPropTable } from '../../PropTables/AlertPropTable';

export default () => (
  <>
    <H0>Alerts</H0>
    <Text>An alert appears at the top right of the interface notifying the user after an action.</Text>

    <CodePreview scope={{ alertsManager }}>
      {/* jsx-to-string:start */}
      {function Example() {
        const alert = {
          header: 'Optional Headline',
          messages: [
            {
              text: 'Required description copy.',
              link: {
                text: 'Optional Link',
                href: '#',
              },
            },
          ],
          type: 'success',
          onClose: () => null,
        } as AlertProps;

        return <Button onClick={() => alertsManager.add(alert)}>Trigger Alert</Button>;
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <Message
      type="warning"
      messages={[
        {
          text:
            'Note: You should not use the Alert component directly. Instead, inject the AlertsManager component into your app and use the alertsManager utility to control which Alerts are displayed.',
        },
      ]}
      marginBottom="large"
    />

    <H1>API</H1>

    <AlertPropTable />

    <MessagingItemPropTable title="Alert[MessageItem]" />

    <MessagingLinkItemPropTable title="Alert[MessageLinkItem]" />

    <H1>Alerts Manager</H1>

    <H2>AlertsManager Component</H2>

    <Text>
      Big Design comes with an <Code primary>AlertsManager</Code> component that will manage and display which alerts to
      display and in which order by type. The order of priority from highest to lowest is <Code>error</Code>,{' '}
      <Code>warning</Code>, <Code>success</Code>, <Code>info</Code>.
    </Text>

    <Text>To use this component, wrap your app with this component:</Text>

    <CodeSnippet>
      {/* jsx-to-string:start */}
      import {AlertsManager} from '@bigcommerce/big-design';
      <AlertsManager />
      {/* jsx-to-string:end */}
    </CodeSnippet>

    <Text>
      This works in conjunction with the <Code>alertsManager</Code> instance exported.
    </Text>

    <H2>alertsManager</H2>

    <Text>
      The alertsManager helps in the functionality of display which alert and in which priority. Will only return one
      alert to display at a time.
    </Text>

    <AlertsManagerAddMethodList />

    <AlertsManagerRemoveMethodList />

    <AlertsManagerSubscribeMethodList />
  </>
);
