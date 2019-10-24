import { memo } from 'react';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
export const typedMemo: <T>(c: T) => T = memo;
