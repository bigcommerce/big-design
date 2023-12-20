import React from 'react';

import { MethodList } from '../components';

export const AlertsManagerAddMethodList: React.FC = () => (
  <MethodList
    intro="Adds an alert to the manager with an optional callback on dismiss."
    name="add"
    parameterList={[
      {
        param: 'alert',
        description: 'An object with the same key/values as the alert props.',
        required: true,
      },
    ]}
    returnDescription="The value of the alert key. If no key is provided, then an auto-generated one will be provided."
    usage="alertsManager.add({ messages: [{ text: 'error' }] }, () => null)"
  />
);

export const AlertsManagerRemoveMethodList: React.FC = () => (
  <MethodList
    intro="Removes an alert by key and displays the next alert, if available."
    name="remove"
    parameterList={[
      {
        param: 'key',
        description: 'Key of the alert to remove.',
        required: true,
      },
    ]}
    returnDescription="Contains the alert removed."
    usage="alertsManager.remove(key)"
  />
);

export const AlertsManagerClearMethodList: React.FC = () => (
  <MethodList
    intro="Removes all alerts."
    name="clear"
    parameterList={[]}
    returnDescription="Contains the alerts removed."
    usage="alertsManager.clear()"
  />
);

export const AlertsManagerSubscribeMethodList: React.FC = () => (
  <MethodList
    intro="Subscribe the the alerts manager."
    name="subscribe"
    parameterList={[
      {
        param: 'callback',
        description:
          'Callback function to run when the alerts list changes. Will pass the alert to display, or null.',
        required: true,
      },
    ]}
    returnDescription="An unsubscribe method for the subscibed method."
    usage="alertsManager.subscribe((alert) => {})"
  />
);
