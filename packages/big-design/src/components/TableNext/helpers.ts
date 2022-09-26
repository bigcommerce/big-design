import { TablePaginationProps } from './types';

export function getPagedIndex(index: number, pagination?: TablePaginationProps) {
  const { currentPage, itemsPerPage } = pagination ?? { currentPage: 1, itemsPerPage: 0 };

  return index + (currentPage - 1) * itemsPerPage;
}
