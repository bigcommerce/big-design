import { render } from '@test/utils';
import '@testing-library/react';
import 'jest-styled-components';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AlertProps } from '../../components/Alert';

import { createAlertsManager } from './manager';
import { AlertsManager } from './AlertsManager';

let alertsManager: ReturnType<typeof createAlertsManager>;

beforeEach(() => {
  alertsManager = createAlertsManager();
});

describe('alertsManager', () => {
  const testKey = 'test';
  const alert = ({
    text: 'Test',
  } as unknown) as AlertProps;

  test('adds a message', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).toEqual('alert-1');
  });

  test('adds a message with key', () => {
    const alertKey = alertsManager.add({ ...alert, key: testKey });

    expect(alertKey).toEqual(testKey);
  });

  test('removes a message', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).not.toBeUndefined();

    const removed = alertsManager.remove(alertKey);

    if (removed) {
      const { onClose, ...removedAlert } = removed;

      expect(removedAlert.key).toEqual(alertKey);
    }
  });

  test('does not remove message with invalid key', () => {
    const alertKey = alertsManager.add(alert);

    expect(alertKey).not.toBeUndefined();

    const removed = alertsManager.remove('some-random-key');

    expect(removed).toBeUndefined();
  });

  test('subscibes to updates', () => {
    const alerts = [];
    const subscriber = jest.fn(a => alerts.push(a));

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
  const alert = ({
    text: 'Test',
    id: 'test',
  } as unknown) as AlertProps;

  test('renders alert', () => {
    const { queryByRole } = render(<AlertsManager manager={alertsManager} />);

    expect(queryByRole('alert')).not.toBeInTheDocument();

    act(() => {
      alertsManager.add(alert);
    });

    expect(queryByRole('alert')).toBeInTheDocument();
  });

  test.todo('closes an alerts');
  test.todo('renders alerts in proper order');
});
