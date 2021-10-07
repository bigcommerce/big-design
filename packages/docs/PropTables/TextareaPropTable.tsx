import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const textareaProps: Prop[] = [
  {
    name: 'description',
    types: ['string', 'FormControlDescription'],
    description: 'Append a description to the textarea field.',
  },
  {
    name: 'error',
    types: ['string', 'string[]', 'FormControlError', 'FormControlError[]'],
    description: 'Displays an error message for the field.',
  },
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: (
      <>
        Label element for textareas. Component with auto generate <Code>id</Code>'s for the accessibility API.
      </>
    ),
  },
  {
    name: 'labelId',
    types: 'string',
    description: (
      <>
        Appends an <Code>id</Code> to the generated label element.
      </>
    ),
  },
  {
    name: 'rows',
    types: ['1', '2', '3', '4', '5', '6', '7'],
    defaultValue: '3',
    description: (
      <>
        Determines the intial height via HTML's <Code>row</Code> property.
      </>
    ),
  },
  {
    name: 'resize',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Determines if the textarea is resizable vertically.',
  },
];

export const TextareaPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Textarea" propList={textareaProps} nativeElement={['textarea', 'all']} {...props} />
);
