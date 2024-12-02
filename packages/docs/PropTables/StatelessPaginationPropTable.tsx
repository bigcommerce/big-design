import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const statelessPaginationProps: Prop[] = [
  {
    name: 'itemsPerPage',
    types: 'number',
    required: true,
    description: 'Indicates how many items are displayed per page.',
  },
  {
    name: 'itemsPerPageOptions',
    types: 'number[]',
    required: true,
    description: 'Indicates options for per-page ranges.',
  },
  {
    name: 'onItemsPerPageChange',
    types: '(range: number) => void',
    required: true,
    description: 'Function that will be called when a new per-page range is selected.',
  },
  {
    name: 'onNext',
    types: '() => void',
    defaultValue: 'undefined',
    required: false,
    description:
      'Function that will be called when the "next" navigation arrow is clicked. Disables the arrow if not provided.',
  },
  {
    name: 'onPrevious',
    types: '() => void',
    defaultValue: 'undefined',
    required: false,
    description:
      'Function that will be called when the "previous" navigation arrow is clicked. Disables the arrow if not provided.',
  },
  {
    name: 'localization',
    types: '{ previousPage: string, nextPage: string, label: string, rangeLabel: string }',
    required: false,
    description: 'Overrides the labels with localized text.',
  },
];

export const StatelessPaginationPropTable: React.FC<PropTableWrapper> = (props) => {
  return <PropTable propList={statelessPaginationProps} title="Pagination" {...props} />;
};
