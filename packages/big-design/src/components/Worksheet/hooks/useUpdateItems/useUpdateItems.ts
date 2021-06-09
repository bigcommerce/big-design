import { useContext } from 'react';

import { UpdateItemsContext } from '../../context';

export const useUpdateItems = () => {
  const updateItemsContext = useContext(UpdateItemsContext);

  if (!updateItemsContext) {
    throw new Error('useUpdateItems must be used within an <UpdateItemsProvider>');
  }

  return updateItemsContext;
};
