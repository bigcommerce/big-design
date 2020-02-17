import { AlertProps } from '../../components/Alert';

import { Subscriber, TypeMap } from './types';

interface PrivateAlert extends AlertProps {
  onClose(): void;
}

class AlertsManager {
  private alerts: PrivateAlert[] = [];
  private counter = 0;
  private subscribers: Subscriber[] = [];
  private readonly typeMap: TypeMap = {
    error: 0,
    warning: 1,
    success: 2,
    info: 3,
  };

  add(alert: AlertProps, dismissCallback?: () => void): string {
    if (alert.key && this.containsKey(alert.key)) {
      this.remove(alert.key);
    }

    const key = this.getKey(alert.key);
    const onClose = () => {
      if (typeof dismissCallback === 'function') {
        dismissCallback(); // Should we return something with this?
      }

      if (typeof alert.onClose === 'function') {
        alert.onClose();
      }

      this.remove(key);
    };

    const newAlert: PrivateAlert = { ...alert, key, onClose };

    this.alerts = this.alerts.concat([newAlert]).sort(this.sortAlerts);

    this.contactSubscribers();

    return key;
  }

  remove(key: string): AlertProps | undefined {
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
    this.alerts = [];
    this.counter = 0;
    this.subscribers = [];
  }

  private contactSubscribers() {
    this.subscribers.forEach(subscriber => subscriber(this.alerts[0]));
  }

  private getUniqueId() {
    this.counter += 1;

    return `alert-${this.counter}`;
  }

  private getKey(key: AlertProps['key']) {
    return key ? key : this.getUniqueId();
  }

  private sortAlerts = (a: PrivateAlert, b: PrivateAlert) => {
    if (this.typeMap[a.type as keyof TypeMap] < this.typeMap[b.type as keyof TypeMap]) {
      return -1;
    }

    if (this.typeMap[a.type as keyof TypeMap] > this.typeMap[b.type as keyof TypeMap]) {
      return 1;
    }

    return 0;
  };

  private containsKey(key: string) {
    return !!this.alerts.find(alert => alert.key === key);
  }
}

export const alertsManager = new AlertsManager();
