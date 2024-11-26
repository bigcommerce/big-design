import { TablePaginationProps } from '../../types';

export function getPagedIndex(index: number, pagination?: TablePaginationProps) {
  const { currentPage, itemsPerPage } = { currentPage: 1, itemsPerPage: 0, ...pagination };

  return index + (currentPage - 1) * itemsPerPage;
}
