import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AlertProps } from '../../components/Alert';

import { AlertsManager } from './AlertsManager';
import { createAlertsManager } from './manager';

let alertsManager: ReturnType<typeof createAlertsManager>;

type KeyedAlertProps = AlertProps & { key: string };

beforeEach(() => {
  alertsManager = createAlertsManager();
});

describe('alertsManager functionality', () => {
  const testKey = 'test';
  const alert: AlertProps = {
    messages: [{ text: 'Text' }],
  };

  test('assigns auto generated key to alert', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).toBe('alert-1');
  });

  test('passes custom key to alert', () => {
    const alertKey = alertsManager.add({ ...alert, key: testKey });

    expect(alertKey).toEqual(testKey);
  });

  test('replaces existing alert with same key', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    const firstAlert = { ...alert, key: testKey, messages: [{ text: 'First' }] };
    const secondAlert = { ...alert, key: testKey, messages: [{ text: 'Second' }] };

    alertsManager.add(firstAlert);

    expect(alerts).toHaveLength(1);
    expect(alerts[0].messages).toEqual([{ text: 'First' }]);

    alertsManager.add(secondAlert);

    expect(alerts).toHaveLength(3);
    expect(alerts[1]).toBeNull();
    expect(alerts[2].messages).toEqual([{ text: 'Second' }]);
  });

  test('adds an alert - without key', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts).toHaveLength(0);

    alertsManager.add(alert);

    expect(alerts).toHaveLength(1);
  });

  test('adds an alert - with key', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts).toHaveLength(0);

    alertsManager.add({ ...alert, key: testKey });

    expect(alerts).toHaveLength(1);
    expect(alerts[0].key).toBe(testKey);
  });

  test('removes an alert', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).toBeDefined();

    const removed = alertsManager.remove(alertKey);

    if (removed) {
      const { onClose, ...removedAlert } = removed;

      expect(removedAlert.key).toEqual(alertKey);
    }
  });

  test('removes an alert with autoDismiss', (done) => {
    jest.useFakeTimers();

    const mockSubscriber = jest.fn();
    const testAlert = { ...alert, autoDismiss: true, onClose: done, key: 'test-key' };

    alertsManager.subscribe(mockSubscriber);

    const alertKey = alertsManager.add(testAlert);

    jest.runAllTimers();

    expect(alertKey).toBeDefined();
    expect(mockSubscriber).toHaveBeenCalledTimes(2);
    expect(mockSubscriber).toHaveBeenCalledWith(expect.objectContaining({ key: 'test-key' }));
    expect(mockSubscriber).toHaveBeenCalledWith(null);
  });

  test('removes one alert with autoDismiss at a time', (done) => {
    jest.useFakeTimers();

    const mockSubscriber = jest.fn();
    const warningAlert = {
      ...alert,
      type: 'warning' as const,
      autoDismiss: true,
      onClose: done,
      key: 'test-key-warning',
    };
    const errorAlert = {
      ...alert,
      type: 'error' as const,
      autoDismiss: true,
      onClose: jest.fn(),
      key: 'test-key-error',
    };

    alertsManager.subscribe(mockSubscriber);

    const warningAlertKey = alertsManager.add(warningAlert);

    expect(warningAlertKey).toBeDefined();
    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    expect(mockSubscriber).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ key: 'test-key-warning' }),
    );

    const errorAlertKey = alertsManager.add(errorAlert);

    expect(errorAlertKey).toBeDefined();
    expect(mockSubscriber).toHaveBeenCalledTimes(2);
    expect(mockSubscriber).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ key: 'test-key-error' }),
    );

    // Run the timeout on the error alert and return back the next alert (warning).
    jest.runOnlyPendingTimers();

    expect(mockSubscriber).toHaveBeenCalledTimes(3);
    expect(mockSubscriber).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ key: 'test-key-warning' }),
    );

    // Run the timeout on the warning alert and return back the next alert (null).
    jest.runOnlyPendingTimers();

    expect(mockSubscriber).toHaveBeenCalledTimes(4);
    expect(mockSubscriber).toHaveBeenNthCalledWith(4, null);
  });

  test('does not set timeout for alert without autoDismiss', () => {
    jest.useFakeTimers();

    const mockSubscriber = jest.fn();
    const testAlert = { ...alert, key: 'test-key' };

    alertsManager.subscribe(mockSubscriber);
    alertsManager.add(testAlert);

    expect(mockSubscriber).toHaveBeenCalledTimes(1);

    jest.runAllTimers();

    expect(mockSubscriber).toHaveBeenCalledTimes(1);
  });

  test('calls custom onClose when alert is closed', () => {
    const onCloseMock = jest.fn();
    const testAlert = { ...alert, key: testKey, onClose: onCloseMock };

    const alertKey = alertsManager.add(testAlert);
    const addedAlert = alertsManager.remove(alertKey);

    addedAlert?.onClose?.();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
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
    expect(mockSubscriber).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ messages: testAlertA.messages }),
    );
    expect(mockSubscriber).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ messages: testAlertA.messages }),
    );
    expect(mockSubscriber).toHaveBeenNthCalledWith(3, null);
  });

  test("doesn't remove existing alert with invalid key", () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).toBeDefined();

    const removed = alertsManager.remove('some-random-key');

    expect(removed).toBeUndefined();
  });

  test('subscibes to updates', () => {
    const alerts: AlertProps[] = [];
    const subscriber = jest.fn((a) => alerts.push(a));

    alertsManager.subscribe(subscriber);

    expect(alerts).toHaveLength(0);
    expect(subscriber).not.toHaveBeenCalled();

    alertsManager.add(alert);

    expect(alerts).toHaveLength(1);
    expect(subscriber).toHaveBeenCalled();
  });

  test('unsubscribes to updates', () => {
    const subscriber = jest.fn();

    const unsubscribe = alertsManager.subscribe(subscriber);

    expect(subscriber).not.toHaveBeenCalled();

    alertsManager.add(alert);

    expect(subscriber).toHaveBeenCalledTimes(1);

    unsubscribe();

    alertsManager.add(alert);

    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});

describe('AlertsManager', () => {
  const successAlert: KeyedAlertProps = {
    messages: [{ text: 'Success' }],
    type: 'success',
    key: 'success',
    onClose: () => null,
  };

  const errorAlert: KeyedAlertProps = {
    messages: [{ text: 'Error' }],
    type: 'error',
    key: 'error',
    onClose: () => null,
  };

  const infoAlert: KeyedAlertProps = {
    messages: [{ text: 'Info' }],
    type: 'info',
    key: 'info',
    onClose: () => null,
  };

  const alerts: KeyedAlertProps[] = [infoAlert, errorAlert, successAlert];

  test('renders alert', () => {
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alertsManager.add(successAlert);
    });

    expect(getByRole('alert')).toBeInTheDocument();
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

    expect(getByText(errorAlert.messages[0].text)).toBeInTheDocument();

    act(() => {
      alertsManager.remove(errorAlert.key);
    });

    expect(getByText(successAlert.messages[0].text)).toBeInTheDocument();

    act(() => {
      alertsManager.remove(successAlert.key);
    });

    expect(getByText(infoAlert.messages[0].text)).toBeInTheDocument();
  });

  test('closes an alert with close button', async () => {
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alertsManager.add(successAlert);
    });

    expect(getByRole('alert')).toBeInTheDocument();

    const closeButton = await screen.findByRole('button');

    expect(closeButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(closeButton);
    });

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('closes an alert with alertsManager', () => {
    let key: string;
    let removedAlert: AlertProps | undefined;
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      key = alertsManager.add(successAlert);
    });

    expect(getByRole('alert')).toBeInTheDocument();

    act(() => {
      removedAlert = alertsManager.remove(key);

      expect(removedAlert).toBeDefined();
    });

    expect(queryByRole('alert')).not.toBeInTheDocument();
  });

  test('closes multiple alerts with close button', async () => {
    const subscriber = jest.fn();
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    alertsManager.subscribe(subscriber);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alerts.forEach((alert) => {
        alertsManager.add(alert);
      });
    });

    expect(getByRole('alert')).toBeInTheDocument();
    expect(subscriber).toHaveBeenCalledTimes(alerts.length);

    for (let index = 0; index < alerts.length; index++) {
      // eslint-disable-next-line no-await-in-loop
      const closeButtons = await screen.findAllByRole('button');

      expect(closeButtons[0]).toBeDefined();

      act(() => {
        fireEvent.click(closeButtons[0]);
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

    expect(getByRole('alert')).toBeInTheDocument();
    expect(subscriber).toHaveBeenCalledTimes(alerts.length);

    alerts.forEach((alert, index) => {
      act(() => {
        alertsManager.remove(alert.key);
      });

      expect(subscriber).toHaveBeenCalledTimes(alerts.length + index + 1);
    });

    expect(subscriber).toHaveBeenCalledTimes(alerts.length * 2);
    expect(queryByRole('alert')).not.toBeInTheDocument();
  });
});
