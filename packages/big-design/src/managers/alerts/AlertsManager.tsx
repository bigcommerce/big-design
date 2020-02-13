import React, { useEffect, useState } from 'react';

import { Alert, AlertProps } from '../../components';

import { alertsManager } from './manager';

export const AlertsManager: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    alertsManager.subscribe(setAlert);

    return () => {
      alertsManager.unsubscribe();
    };
  }, []);

  return (
    <>
      {children}
      {alert && <Alert {...alert} />}
    </>
  );
};
