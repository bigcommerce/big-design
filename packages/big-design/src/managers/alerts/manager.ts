import { AlertProps } from '../../components/Alert';

import { Subscriber } from './types';

export interface PrivateAlert extends AlertProps {
  sortKey: number;
  onClose(): void;
}

class AlertsManager {
  private alerts: PrivateAlert[] = [];
  private subscribers: Subscriber[] = [];
  private counter = 0;

  add(alert: AlertProps, dismissCallback?: () => void): string {
    if (alert.key && this.containsKey(alert.key)) {
      this.remove(alert.key);
    }

    const sortKey = this.getSortKey(alert.type);
    const key = this.getKey(alert.key);
    const onClose = () => {
      if (typeof dismissCallback === 'function') {
        dismissCallback(); // Should we return something with this?
      }

      this.remove(key);
    };

    const newAlert = { ...alert, key, sortKey, onClose } as PrivateAlert;

    // Add new alert and sort by type
    this.alerts = this.alerts.concat([newAlert]).sort(this.sortAlerts);

    this.contactSubscribers();

    return key;
  }

  remove(key: string) {
    let removed;

    this.alerts = this.alerts.reduce((acc, alert) => {
      if (alert.key === key) {
        removed = alert;

        return acc;
      }

      acc.push(alert);

      return acc;
    }, [] as PrivateAlert[]);

    this.contactSubscribers();

    return removed;
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe() {
    this.subscribers = [];
  }

  private contactSubscribers() {
    this.subscribers.forEach(subscriber => subscriber(this.stripSortKey(this.alerts[0])));
  }

  // Not sure if we need to strip the sortKey or not
  private stripSortKey(alert: PrivateAlert): AlertProps & Pick<PrivateAlert, 'onClose'> {
    const { sortKey, ...stripedAlert } = alert;

    return stripedAlert;
  }

  private getUniqueId() {
    this.counter += 1;

    return `alert-${this.counter}`;
  }

  private getSortKey(type: AlertProps['type']) {
    switch (type) {
      case 'error':
        return 0;
      case 'warning':
        return 1;
      case 'success':
        return 2;
      case 'info':
      default:
        return 3;
    }
  }

  private getKey(key: AlertProps['key']) {
    return key ? key : this.getUniqueId();
  }

  private sortAlerts = (a: PrivateAlert, b: PrivateAlert) => {
    if (a.sortKey < b.sortKey) {
      return -1;
    }

    if (a.sortKey > b.sortKey) {
      return 1;
    }

    return 0;
  };

  private containsKey(key: string) {
    return !!this.alerts.find(alert => alert.key === key);
  }
}

export const alertsManager = new AlertsManager();
