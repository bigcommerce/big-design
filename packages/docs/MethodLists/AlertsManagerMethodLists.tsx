import React from 'react';

import { Code, MethodList } from '../components';

export const AlertsManagerAddMethodList: React.FC = () => (
  <MethodList
    name="add"
    intro="Adds an alert to the manager with an optional callback on dismiss."
    usage="alertsManager.add({ messages: [{ text: 'error' }] }, () => null)"
    parameterList={[
      {
        param: 'alert',
        description: 'An object with the same key/values as the alert props.',
        required: true,
      },
      {
        param: 'dismissCallback',
        description: (
          <>
            Callback function to run when the alert is dismissed. Runs before the <Code>onClose</Code> function in the
            passed in alert.
          </>
        ),
      },
    ]}
    returnDescription="The value of the alert key. If no key is provided, then an auto-generated one will be provided."
  />
);

export const AlertsManagerRemoveMethodList: React.FC = () => (
  <MethodList
    name="remove"
    intro="Removes an alert by key and displays the next alert, if available."
    usage="alertsManager.remove(key)"
    parameterList={[
      {
        param: 'key',
        description: 'Key of the alert to remove.',
        required: true,
      },
    ]}
    returnDescription="Contains the alert removed."
  />
);

export const AlertsManagerClearMethodList: React.FC = () => (
  <MethodList
    name="clear"
    intro="Removes all alerts."
    usage="alertsManager.clear()"
    parameterList={[]}
    returnDescription="Contains the alerts removed."
  />
);

export const AlertsManagerSubscribeMethodList: React.FC = () => (
  <MethodList
    name="subscribe"
    intro="Subscribe the the alerts manager."
    usage="alertsManager.subscribe((alert) => {})"
    parameterList={[
      {
        param: 'callback',
        description: 'Callback function to run when the alerts list changes. Will pass the alert to display, or null.',
        required: true,
      },
    ]}
    returnDescription="An unsubscribe method for the subscibed method."
  />
);
