import { AlertsManager, AlertProps, Button, H0, H1, H2, Message, Text } from '@bigcommerce/big-design';

import { Code, CodePreview, CodeSnippet } from '../../components';
import {
  AlertsManagerAddMethodList,
  AlertsManagerRemoveMethodList,
  AlertsManagerSubscribeMethodList,
} from '../../MethodLists';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';
import { AlertPropTable } from '../../PropTables/AlertPropTable';
import { alertsManager } from '../_app';

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
            'Note: You should not use the Alert component directly. Instead, inject the AlertsManager component into your app and use the instance created by the createAlertsManager utility function to control which Alerts are displayed.',
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
      {function App() {
        return (
          <>
            {/* ... */}
            <AlertsManager manager={alertsManager} />
            {/* ... */}
          </>
        );
      }}

      {/* jsx-to-string:end */}
    </CodeSnippet>

    <Text>
      This works in conjunction with an instance created by <Code>createAlertsManager</Code> function below.
    </Text>

    <H2>createAlertsManager</H2>

    <Text>
      The <Code>createAlertsManager</Code> function returns an instance for managing which alert to display.
    </Text>

    <CodeSnippet showControls={false}>
      {/* jsx-to-string:start */}
      const alertsManager = createAlertsManager();
      {/* jsx-to-string:end */}
    </CodeSnippet>

    <AlertsManagerAddMethodList />

    <AlertsManagerRemoveMethodList />

    <AlertsManagerSubscribeMethodList />
  </>
);
