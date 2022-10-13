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
  {
    name: 'label',
    types: 'string',
    required: false,
    defaultValue: 'pagination',
    description: 'Overrides the aria label of the pagination wrapper navigation element.',
  },
  {
    name: 'previousLabel',
    types: 'string',
    required: false,
    defaultValue: 'Previous page',
    description: 'Overrides the title and aria label of the previous page navigation arrow.',
  },
  {
    name: 'nextLabel',
    types: 'string',
    required: false,
    defaultValue: 'Next page',
    description: 'Overrides the title and aria label of the next page navigation arrow.',
  },
  {
    name: 'getRangeLabel',
    types: '(start: number, end: number, totalItems: number) => string',
    required: false,
    description: 'A callback to format the label of the per-page range dropdown.',
  },
];

export const PaginationPropTable: React.FC<PropTableWrapper> = (props) => {
  return <PropTable propList={paginationProps} title="Pagination" {...props} />;
};
