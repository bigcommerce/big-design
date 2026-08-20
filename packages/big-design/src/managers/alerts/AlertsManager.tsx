import React, { useEffect, useState } from 'react';

import { Alert, type AlertProps } from '../../components';

import { type createAlertsManager } from './manager';

export interface AlertsManagerProps {
  manager: ReturnType<typeof createAlertsManager>;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({ manager }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  useEffect(() => manager.subscribe(setAlert), [manager]);

  if (!alert) {
    return null;
  }

  // autoDismiss is consumed by the manager and must not reach the DOM via SC6's prop forwarding.
  // key must be passed explicitly in React 19; the manager stores it on the alert object.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { key, autoDismiss, ...alertProps } = alert as AlertProps & {
    key?: string;
    autoDismiss?: boolean;
  };

  return <Alert key={key} {...alertProps} />;
};
