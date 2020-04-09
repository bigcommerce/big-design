import React, { memo, useCallback, useMemo, useRef, Fragment } from 'react';

interface CounterProps {
  label?: string;
  description?: string;
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  disabled?: boolean;
  error?: string;
}
