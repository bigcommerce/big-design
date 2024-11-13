import React from 'react';
import { OffsetPagination, OffsetPaginationProps } from './OffsetPagination';
import { StatelessPagination, StatelessPaginationProps } from './StatelessPagination';

export type PaginationProps = OffsetPaginationProps | StatelessPaginationProps;

export const Pagination: React.FC<PaginationProps> = (props) =>
  'onPageChange' in props ? <OffsetPagination {...props} /> : <StatelessPagination {...props} />;
