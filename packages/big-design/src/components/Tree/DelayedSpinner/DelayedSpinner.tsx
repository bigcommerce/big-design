import React, { useEffect, useState } from 'react';

import { ProgressCircle } from '../../ProgressCircle';

export const DelayedSpinner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 50ms is a good middleground for the human eye
    // to not regonized a flash.
    const timeoutId = setTimeout(() => setShow(true), 50);

    return () => clearInterval(timeoutId);
  }, []);

  return show ? <ProgressCircle size="xSmall" /> : null;
};
