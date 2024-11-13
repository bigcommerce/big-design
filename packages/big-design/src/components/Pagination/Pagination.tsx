import React from 'react';
import { OffsetPagination, OffsetPaginationProps } from './OffsetPagination';

export type PaginationProps = OffsetPaginationProps;

export const Pagination: React.FC<PaginationProps> = (props) => {
  return <OffsetPagination {...props} />;
};
