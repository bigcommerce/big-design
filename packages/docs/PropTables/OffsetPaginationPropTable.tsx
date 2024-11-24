import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const offsetPaginationProps: Prop[] = [
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
    name: 'getRangeLabel',
    types: '(start: number, end: number, totalItems: number) => string',
    required: false,
    description: 'A callback to format the label of the per-page range dropdown.',
  },
  {
    name: 'localization',
    types: '{ of: string, previousPage: string, nextPage: string }',
    required: false,
    description: 'Overrides the labels with localized text.',
  },
];

export const OffsetPaginationPropTable: React.FC<PropTableWrapper> = (props) => {
  return <PropTable propList={offsetPaginationProps} title="Pagination" {...props} />;
};
