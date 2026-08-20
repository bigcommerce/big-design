import { type DiscriminatedTablePaginationProps, type TablePaginationProps } from './types';

export const discriminatePagination = (
  pagination: TablePaginationProps,
): DiscriminatedTablePaginationProps => {
  if ('onPageChange' in pagination) {
    return {
      type: 'offset' as const,
      ...pagination,
    };
  }

  return {
    type: 'stateless' as const,
    ...pagination,
  };
};
