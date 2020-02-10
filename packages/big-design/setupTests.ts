import { cleanup } from '@test/utils';
import '@testing-library/jest-dom/extend-expect';

import * as utils from './src/utils';

/**
 * Because this util generates straightforward IDs which are saved in the snapshots,
 * changing the order of the unit tests or adding a new one in the middle of the file (Not at the end)
 * will break snapshots randomly, because generated IDs will no longer match the arbitrary order.
 * This mock allows us to artificially reset the counter after each `test` clause, so that
 * generated IDs within the same test are always the same, and other tests dont randomly break
 * when adding or removing tests.
 *
 * The additional `resetCounter` method does not exist in the original util, but we need it here
 * because jest.mock does not allow access to variables outside of its closure
 */
jest.mock('./src/utils', () => {
  let counter = 0;

  return {
    ...jest.requireActual('./src/utils'),
    warning: jest.fn(),
    resetCounter: () => (counter = 0),
    uniqueId: (context: string) => {
      return `${context}${counter++}`;
    },
  };
});

afterEach(() => {
  (utils as any).resetCounter();
  jest.clearAllMocks();

  // https://github.com/testing-library/react-testing-library/pull/519
  cleanup();
});
