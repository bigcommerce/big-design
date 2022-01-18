import React from 'react';

import { Prop, PropTable, PropTableWrapper } from '../components';

const searchProps: Prop[] = [
  {
    name: 'value',
    types: 'string',
    description: 'Value of the search input',
    required: true,
  },
  {
    name: 'onChange',
    types: '(event: React.ChangeEvent<HTMLInputElement>) => void',
    description: 'Native onChange attribute for a HTML input element.',
    required: true,
  },
  {
    name: 'onSubmit',
    types: '(event: React.FormEvent<HTMLFormElement>) => void',
    description: 'Native onSubmit attribute for a HTML form element.',
    required: true,
  },
];

export const SearchPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Search" propList={searchProps} nativeElement={['input', 'most']} {...props} />
);
