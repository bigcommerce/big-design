import '@testing-library/react';
import { AlertProps } from 'components';

import { alertsManager } from './manager';

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
    const testAlert = { ...alert, key: testKey };
    const alertKey = alertsManager.add(testAlert);

    expect(alertKey).toEqual(testKey);

    const removed = alertsManager.remove(testKey);

    if (removed) {
      const { onClose, ...removedAlert } = removed;

      expect(removedAlert).toEqual(testAlert);
    }
  });

  test.skip('subscibes to updates', () => {
    // const callback = jest.fn();
  });
});
