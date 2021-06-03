import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const paginationProps: Prop[] = [
  {
    name: 'itemsPerPage',
    types: 'number',
    required: true,
    description: 'Indicates how many items are displayed per page.',
  },
  {
    name: 'currentPage',
    types: 'number',
    required: true,
    description: 'Indicates the page currently/initially displayed.',
  },
  {
    name: 'totalItems',
    types: 'number',
    required: true,
    description: 'Indicates how many items in total will be displayed.',
  },
  {
    name: 'itemsPerPageOptions',
    types: 'number[]',
    required: true,
    description: 'Indicates options for per-page ranges.',
  },
  {
    name: 'onPageChange',
    types: '(page: number) => void',
    required: true,
    description: 'Function that will be called when a navigation arrow is clicked.',
  },
  {
    name: 'onItemsPerPageChange',
    types: '(range: number) => void',
    required: true,
    description: 'Function that will be called when a new per-page range is selected.',
  },
];

export const PaginationPropTable: React.FC<PropTableWrapper> = (props) => {
  return <PropTable title="Pagination props" propList={paginationProps} {...props} />;
};
