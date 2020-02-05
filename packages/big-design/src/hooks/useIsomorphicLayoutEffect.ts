import { useEffect, useLayoutEffect } from 'react';

import { isClient } from '../utils';

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
