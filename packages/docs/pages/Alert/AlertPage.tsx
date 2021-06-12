import { AlertProps, Button, H1, H3, Message, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview, CodeSnippet } from '../../components';
import {
  AlertsManagerAddMethodList,
  AlertsManagerClearMethodList,
  AlertsManagerRemoveMethodList,
  AlertsManagerSubscribeMethodList,
} from '../../MethodLists';
import { AlertPropTable } from '../../PropTables/AlertPropTable';
import { MessagingItemPropTable, MessagingLinkItemPropTable } from '../../PropTables/shared';
import { alertsManager } from '../_app';

const AlertPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
    { id: 'manager', title: 'Alert manager' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <>
            <AlertPropTable>
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
            </AlertPropTable>

            <MessagingItemPropTable title="Alert[MessageItem]" />

            <MessagingLinkItemPropTable title="Alert[MessageLinkItem]" />
          </>
        );
      case 'manager':
        return (
          <>
            <Panel header="AlertsManager">
              <Text>
                BigDesign comes with an <Code primary>AlertsManager</Code> component that will manage and display which
                alerts to display and in which order by type. The order of priority from highest to lowest is{' '}
                <Code>error</Code>, <Code>warning</Code>, <Code>success</Code>, <Code>info</Code>.
              </Text>

              <Text>
                To use this component, put it in your root component (e.g. place it after <Code>GlobalStyles</Code>{' '}
                component):
              </Text>

              <CodeSnippet>
                {`
              export const alertsManager = createAlertsManager(); // import this in child components to use alerts

              function App() {
                return (
                  <>
                    {/* ... */}
                    <GlobalStyles />
                    <AlertsManager manager={alertsManager} />
                    {/* ... */}
                  </>
                );
              }
            `}
              </CodeSnippet>
              <H3>Add alert</H3>
              <Text>
                This works in conjunction with an instance created by <Code>createAlertsManager</Code> function below.
                You need to export <Code>alertsManager</Code> instance and then you can import it in child components in
                order to trigger alert:
              </Text>

              <CodeSnippet>
                {`
              import { alertsManager } from '../App';

              // ...

              const alert = {...}; // alert props
              alertsManager.add(alert);
            `}
              </CodeSnippet>
            </Panel>
            <Panel header="Alert manager functions">
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

              <AlertsManagerClearMethodList />

              <AlertsManagerSubscribeMethodList />
            </Panel>
          </>
        );
      case 'examples':
      default:
        return (
          <Panel>
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
          </Panel>
        );
    }
  };

  return (
    <>
      <H1>Alert</H1>
      <Text>
        Alerts are non-disruptive messages that appear at the top right of the window and provide quick, at a glance
        feedback on the outcome of an action.{' '}
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default AlertPage;
