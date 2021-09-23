import { renderHook } from '@testing-library/react-hooks';

import { useUpdateItems } from './index';

test('throws if is not wrapped in UpdateItemsProvider', () => {
  const { result: hook } = renderHook(() => useUpdateItems());

  expect(hook.error.message).toContain('UpdateItemsProvider');
});
