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
    name: 'label',
    types: 'string',
    required: false,
    defaultValue: 'pagination',
    description: 'Overrides the aria label of the pagination wrapper navigation element.',
  },
  {
    name: 'rangeLabel',
    types: 'string',
    required: false,
    description: 'Sets the label of the per-page range dropdown.',
  },
  {
    name: 'localization',
    types: '{ of: string, previousPage: string, nextPage: string }',
    required: false,
    description: 'Overrides the labels with localized text.',
  },
];

export const StatelessPaginationPropTable: React.FC<PropTableWrapper> = (props) => {
  return <PropTable propList={statelessPaginationProps} title="Pagination" {...props} />;
};
