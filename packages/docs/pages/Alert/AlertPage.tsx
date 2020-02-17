import { alertsManager, Alert, AlertsManager, AlertProps, Button, H0, H1, H2, Text } from '@bigcommerce/big-design';

import { Code, CodePreview, CodeSnippet } from '../../components';
import {
  AlertsManagerAddMethodList,
  AlertsManagerRemoveMethodList,
  AlertsManagerSubscribeMethodList,
  AlertsManagerUnsubscribeMethodList,
} from '../../MethodLists';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';
import { AlertPropTable } from '../../PropTables/AlertPropTable';

const errorAlert = {
  header: 'Optional Headline',
  messages: [{ text: 'Required description copy.' }],
  type: 'error',
  onClose: () => null,
} as AlertProps;

const successAlert = {
  header: 'Optional Headline',
  messages: [{ text: 'Required description copy.', link: { text: 'Optional Link', href: '#' } }],
  type: 'success',
  onClose: () => null,
} as AlertProps;

const warningAlert = {
  header: 'Optional Headline',
  messages: [
    {
      text: 'Required description copy.',
      link: { text: 'External Link', href: '#', external: true, target: '_blank' },
    },
  ],
  type: 'warning',
  onClose: () => null,
} as AlertProps;

const infoAlert = {
  header: 'Optional Headline',
  messages: [
    {
      text: 'Required description copy.',
      link: {
        href: '#',
        text: 'Optional Link',
      },
    },
    {
      text: 'Required description copy.',
      link: {
        text: 'External Link',
        href: '#',
        external: true,
        target: '_blank',
      },
    },
  ],
  type: 'info',
  onClose: () => null,
} as AlertProps;

export default () => (
  <>
    <H0>Alerts</H0>
    <Text>An alert appears at the top right of the interface notifying the user after an action.</Text>

    <CodeSnippet>
      {/* jsx-to-string:start */}
      <Alert
        header="Header"
        type="error"
        messages={[
          {
            text: 'An Error has occured.',
            link: {
              text: 'Learn more',
              href: '#',
              target: '_blank',
              external: true,
            },
          },
        ]}
        onClose={() => null}
      />
      {/* jsx-to-string:end */}
    </CodeSnippet>

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
      <AlertsManager>...</AlertsManager>
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

    <AlertsManagerUnsubscribeMethodList />

    <H2>Usage</H2>

    <CodePreview scope={{ alertsManager, errorAlert, warningAlert, successAlert, infoAlert }}>
      {/* jsx-to-string:start */}
      <>
        <Button onClick={() => alertsManager.add(errorAlert)}>Trigger Error</Button>
        <Button onClick={() => alertsManager.add(warningAlert)}>Trigger Warning</Button>
        <Button onClick={() => alertsManager.add(successAlert)}>Trigger Success</Button>
        <Button onClick={() => alertsManager.add(infoAlert)}>Trigger Info</Button>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
