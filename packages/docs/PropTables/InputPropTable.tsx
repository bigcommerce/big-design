import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, NextLink, Prop, PropTable } from '../components';

const props: Prop[] = [
  {
    name: 'description',
    types: 'ReactChild',
    description: 'Append a description to the input field.',
  },
  {
    name: 'error',
    types: ['ReactChild', 'ReactChild[]'],
    description: (
      <>
        Displays an error message for the field. Error message will be passed to the <Code>Form.Group</Code> for display
        purposes.
      </>
    ),
  },
  {
    name: 'iconLeft',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'iconRight',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the right of the text.
      </>
    ),
  },
  {
    name: 'label',
    types: 'ReactChild',
    description: (
      <>
        Label element for inputs. Component with auto generate <Code>id</Code>'s for the accessibility API.
      </>
    ),
  },
];

export const InputPropTable: React.FC = () => <PropTable propList={props} />;

export const InputDescriptionPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;p /&gt;</Code> element attributes.
  </Text>
);

export const InputErrorPropTable: React.FC = () => (
  <Text>
    See{' '}
    <NextLink href="/Form/FormPage" as="/form#error">
      Forms.Error
    </NextLink>
    .
  </Text>
);

export const InputLabelPropTable: React.FC = () => (
  <Text>
    See{' '}
    <NextLink href="/Form/FormPage" as="/form#label">
      Forms.Label
    </NextLink>
    .
  </Text>
);
