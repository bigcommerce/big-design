import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const sharedProps: Prop[] = [
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
    name: 'label',
    types: 'string',
    required: false,
    defaultValue: 'pagination',
    description: 'Overrides the aria label of the pagination wrapper navigation element.',
  },
  {
    name: 'localization',
    types: '{ of: string, previousPage: string, nextPage: string }',
    required: false,
    description: 'Overrides the labels with localized text.',
  },
];

const paginationProps: Record<'offset' | 'stateless', Prop[]> = {
  offset: [
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
      name: 'onPageChange',
      types: '(page: number) => void',
      required: true,
      description: 'Function that will be called when a navigation arrow is clicked.',
    },
    {
      name: 'getRangeLabel',
      types: '(start: number, end: number, totalItems: number) => string',
      required: false,
      description: 'A callback to format the label of the per-page range dropdown.',
    },
    ...sharedProps,
  ],
  stateless: [
    {
      name: 'onNext',
      types: '() => void',
      required: true,
      description: 'Function that will be called when the next button is clicked.',
    },
    {
      name: 'disableNext',
      types: 'boolean',
      defaultValue: 'false',
      required: false,
      description: 'Disables the next button.',
    },
    {
      name: 'onPrevious',
      types: '() => void',
      required: true,
      description: 'Function that will be called when the previous button is clicked.',
    },
    {
      name: 'disablePrevious',
      types: 'boolean',
      defaultValue: 'false',
      required: false,
      description: 'Disables the previous button.',
    },
    {
      name: 'rangeLabel',
      types: 'string',
      defaultValue: 'Show [itemsPerPage] items',
      required: false,
      description: 'Overrides the label of the per-page range dropdown.',
    },
    ...sharedProps,
  ],
};

interface Props extends PropTableWrapper {
  mode: 'offset' | 'stateless';
}

export const PaginationPropTable: React.FC<Props> = ({ mode, ...props }) => {
  return <PropTable propList={paginationProps[mode]} title="Pagination" {...props} />;
};
