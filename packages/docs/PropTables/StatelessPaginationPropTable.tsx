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
    name: 'disableNext',
    types: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Set the the "next" navigation arrow to disabled.',
  },
  {
    name: 'onNext',
    types: '() => void',
    required: true,
    description: 'Function that will be called when the "next" navigation arrow is clicked.',
  },
  {
    name: 'disablePrevious',
    types: 'boolean',
    required: false,
    defaultValue: 'false',
    description: 'Set the the "previous" navigation arrow to disabled.',
  },
  {
    name: 'onPrevious',
    types: '() => void',
    required: true,
    description: 'Function that will be called when the "previous" navigation arrow is clicked.',
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
