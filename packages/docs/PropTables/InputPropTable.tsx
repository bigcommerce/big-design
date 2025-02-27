import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const inputProps: Prop[] = [
  {
    name: 'description',
    types: ['string', 'FormControlDescription'],
    description: 'Append a description to the input field.',
  },
  {
    name: 'error',
    types: ['string', 'string[]', 'FormControlError', 'FormControlError[]'],
    description: (
      <>
        Displays an error message for the field. Error message will be passed to the{' '}
        <Code>FormGroup</Code> for display purposes.
      </>
    ),
  },
  {
    name: 'iconLeft',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the left of the
        text.
      </>
    ),
  },
  {
    name: 'iconRight',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the right of the
        text.
      </>
    ),
  },
  {
    name: 'label',
    types: ['string', 'FormControlLabel'],
    description: (
      <>
        Label element for inputs. Component with auto generate <Code>id</Code>'s for the
        accessibility API.
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
];

export const InputPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['input', 'all']} propList={inputProps} title="Input" {...props} />
);
