import React, { useEffect, useState } from 'react';

import { Alert, AlertProps } from '../../components';

import { createAlertsManager } from './manager';

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
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { autoDismiss, ...alertProps } = alert as AlertProps & { autoDismiss?: boolean };

  return <Alert {...alertProps} />;
};
