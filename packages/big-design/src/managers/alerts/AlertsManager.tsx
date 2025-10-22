import React, { useEffect, useState } from 'react';

import { Alert, AlertProps } from '../../components';

import { createAlertsManager } from './manager';

export interface AlertsManagerProps {
  readonly manager: ReturnType<typeof createAlertsManager>;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({ manager }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  useEffect(() => manager.subscribe(setAlert), [manager]);

  return alert ? <Alert {...alert} /> : null;
};
