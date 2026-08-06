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

  // key is tracked by the manager internally; destructure before spread to satisfy React 19
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { key, ...alertProps } = alert as AlertProps & { key?: string };

  return <Alert key={key} {...alertProps} />;
};
