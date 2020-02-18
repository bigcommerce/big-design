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

  add(alert: AlertProps): string {
    if (alert.key && this.containsKey(alert.key)) {
      this.remove(alert.key);
    }

    const key = alert.key === undefined ? this.getUniqueId() : alert.key;

    const onClose = () => {
      if (typeof alert.onClose === 'function') {
        alert.onClose();
      }

      this.remove(key);
    };

    const newAlert: PrivateAlert = { ...alert, key, onClose };

    this.alerts = this.alerts.concat([newAlert]).sort(this.sortAlerts);

    this.notifySubscribers();

    return key;
  }

  remove(key: string) {
    let removed: AlertProps | undefined;

    this.alerts = this.alerts.reduce((acc, alert) => {
      if (alert.key === key) {
        removed = alert;

        return acc;
      }

      return [...acc, alert];
    }, [] as PrivateAlert[]);

    this.notifySubscribers();

    return removed;
  }

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(subscriber => subscriber(this.alerts[0] || null));
  }

  private getUniqueId() {
    this.counter += 1;

    return `alert-${this.counter}`;
  }

  private sortAlerts = (a: PrivateAlert, b: PrivateAlert) => {
    return this.typeMap[a.type as keyof TypeMap] - this.typeMap[b.type as keyof TypeMap];
  };

  private containsKey(key: string) {
    return !!this.alerts.find(alert => alert.key === key);
  }
}

export const createAlertsManager = () => new AlertsManager();
