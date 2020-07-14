import '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { fireEvent, render } from '@test/utils';

import { AlertProps } from '../../components/Alert';

import { AlertsManager } from './AlertsManager';
import { createAlertsManager } from './manager';

let alertsManager: ReturnType<typeof createAlertsManager>;

beforeEach(() => {
  alertsManager = createAlertsManager();
});

describe('alertsManager functionality', () => {
  const testKey = 'test';
  const alert = {
    messages: [{ text: 'Text' }],
  } as AlertProps;

  test('assigns auto generated key to alert', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).toEqual('alert-1');
  });

  test('passes custom key to alert', () => {
    const alertKey = alertsManager.add({ ...alert, key: testKey });

    expect(alertKey).toEqual(testKey);
  });

  test('adds an alert - without key', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts.length).toBe(0);

    alertsManager.add(alert);

    expect(alerts.length).toBe(1);
  });

  test('adds an alert - with key', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts.length).toBe(0);

    alertsManager.add({ ...alert, key: testKey });

    expect(alerts.length).toBe(1);
    expect(alerts[0].key).toBe(testKey);
  });

  test('removes an alert', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).not.toBeUndefined();

    const removed = alertsManager.remove(alertKey);

    if (removed) {
      const { onClose, ...removedAlert } = removed;

      expect(removedAlert.key).toEqual(alertKey);
    }
  });

  test('removes all alerts', () => {
    const testAlertA = { messages: [{ text: 'Text A' }] };
    const testAlertB = { messages: [{ text: 'Text B' }] };
    const mockSubscriber = jest.fn();

    alertsManager.subscribe(mockSubscriber);
    alertsManager.add(testAlertA);
    alertsManager.add(testAlertB);

    const removed = alertsManager.clear();

    expect(removed).toEqual([
      expect.objectContaining({ messages: testAlertA.messages }),
      expect.objectContaining({ messages: testAlertB.messages }),
    ]);

    expect(mockSubscriber).toHaveBeenCalledTimes(3);
    expect(mockSubscriber).toHaveBeenNthCalledWith(1, expect.objectContaining({ messages: testAlertA.messages }));
    expect(mockSubscriber).toHaveBeenNthCalledWith(2, expect.objectContaining({ messages: testAlertA.messages }));
    expect(mockSubscriber).toHaveBeenNthCalledWith(3, null);
  });

  test("doesn't remove existing alert with invalid key", () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).not.toBeUndefined();

    const removed = alertsManager.remove('some-random-key');

    expect(removed).toBeUndefined();
  });

  test('subscibes to updates', () => {
    const alerts = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts.length).toBe(0);
    expect(subscriber).not.toBeCalled();

    alertsManager.add(alert);

    expect(alerts.length).toBe(1);
    expect(subscriber).toBeCalled();
  });

  test('unsubscribes to updates', () => {
    const subscriber = jest.fn();

    const unsubscribe = alertsManager.subscribe(subscriber);

    expect(subscriber).not.toBeCalled();

    alertsManager.add(alert);

    expect(subscriber).toBeCalledTimes(1);

    unsubscribe();

    alertsManager.add(alert);

    expect(subscriber).toBeCalledTimes(1);
  });
});

describe('AlertsManager', () => {
  const successAlert = {
    messages: [{ text: 'Success' }],
    type: 'success',
    key: 'success',
    onClose: () => null,
  } as AlertProps;

  const errorAlert = {
    messages: [{ text: 'Error' }],
    type: 'error',
    key: 'error',
    onClose: () => null,
  } as AlertProps;

  const infoAlert = {
    messages: [{ text: 'Info' }],
    type: 'info',
    key: 'info',
    onClose: () => null,
  } as AlertProps;

  const alerts: AlertProps[] = [infoAlert, errorAlert, successAlert];

  test('renders alert', () => {
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alertsManager.add(successAlert);
    });

    expect(queryByRole('alert')).toBeInTheDocument();
  });

  // May need to write this differently
  test('renders alerts in proper order', () => {
    let displayedAlert: AlertProps;
    const { queryByRole, queryByText } = render(<AlertsManager manager={alertsManager} />);
    const subscriber = jest.fn((alert) => (displayedAlert = alert));

    alertsManager.subscribe(subscriber);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alerts.forEach((alert, index) => {
        alertsManager.add(alert);

        expect(subscriber).toHaveBeenCalledTimes(index + 1);

        if (index === alerts.length - 1) {
          expect(displayedAlert.key).toEqual(errorAlert.key);
        }
      });
    });

    expect(queryByText(errorAlert.messages[0].text)).toBeInTheDocument();

    act(() => {
      alertsManager.remove(errorAlert.key as string);
    });

    expect(queryByText(successAlert.messages[0].text)).toBeInTheDocument();

    act(() => {
      alertsManager.remove(successAlert.key as string);
    });

    expect(queryByText(infoAlert.messages[0].text)).toBeInTheDocument();
  });

  test('closes an alert with close button', () => {
    const { queryByRole, container } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alertsManager.add(successAlert);
    });

    expect(queryByRole('alert')).toBeInTheDocument();

    const closeButton = container.querySelector('button') as HTMLButtonElement;

    expect(closeButton).toBeDefined();

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('closes an alert with alertsManager', () => {
    let key: string;
    let removedAlert: AlertProps;
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      key = alertsManager.add(successAlert);
    });

    expect(queryByRole('alert')).toBeInTheDocument();

    act(() => {
      removedAlert = alertsManager.remove(key) as AlertProps;

      expect(removedAlert).toBeDefined();
    });

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('closes multiple alerts with close button', () => {
    const subscriber = jest.fn();
    const { queryByRole, container } = render(<AlertsManager manager={alertsManager} />);

    alertsManager.subscribe(subscriber);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alerts.forEach((alert) => {
        alertsManager.add(alert);
      });
    });

    expect(queryByRole('alert')).toBeInTheDocument();
    expect(subscriber).toHaveBeenCalledTimes(alerts.length);

    for (let index = 0; index < alerts.length; index++) {
      const closeButton = container.querySelector('button') as HTMLButtonElement;

      expect(closeButton).toBeDefined();

      act(() => {
        fireEvent.click(closeButton);
      });

      expect(subscriber).toHaveBeenCalledTimes(alerts.length + index + 1);
    }

    expect(subscriber).toHaveBeenCalledTimes(alerts.length * 2);
    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('closes multiple alerts', () => {
    const subscriber = jest.fn();
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    alertsManager.subscribe(subscriber);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alerts.forEach((alert) => {
        alertsManager.add(alert);
      });
    });

    expect(queryByRole('alert')).toBeInTheDocument();
    expect(subscriber).toHaveBeenCalledTimes(alerts.length);

    alerts.forEach((alert, index) => {
      act(() => {
        alertsManager.remove(alert.key as string);
      });

      expect(subscriber).toHaveBeenCalledTimes(alerts.length + index + 1);
    });

    expect(subscriber).toHaveBeenCalledTimes(alerts.length * 2);
    expect(queryByRole('alert')).not.toBeInTheDocument();
  });
});
