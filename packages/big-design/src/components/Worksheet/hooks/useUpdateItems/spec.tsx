import { renderHook } from '@testing-library/react';
import { Component, PropsWithChildren } from 'react';

import { useUpdateItems } from './index';

beforeEach(() => {
  // We need to suppress console errors, otherwise we'll blow up the console.
  // eslint-disable-next-line no-console
  console.error = jest.fn();
});

test('throws if is not wrapped in UpdateItemsProvider', () => {
  let error;

  renderHook(() => useUpdateItems(), {
    wrapper: class Wrapper extends Component<PropsWithChildren> {
      override componentDidCatch(err: unknown) {
        error = err;
      }
      override render() {
        // eslint-disable-next-line testing-library/no-node-access
        return this.props.children;
      }
    },
  });

  expect(error).toEqual(new Error('useUpdateItems must be used within an <UpdateItemsProvider>'));
});
