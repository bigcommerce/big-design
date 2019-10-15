import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable } from '../components';

export const FormPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;form /&gt;</Code> element attributes.
  </Text>
);

export const FormErrorPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;p /&gt;</Code> element attributes.
  </Text>
);

const formFieldsetProps: Prop[] = [
  {
    name: 'description',
    types: 'ReactChild',
    description: 'Pass in a description to display in the fieldset.',
  },
  {
    name: 'legend',
    types: 'ReactChild',
    description: 'Pass in a legend to display in the fieldset.',
  },
];

export const FormFieldsetPropTable: React.FC = () => <PropTable propList={formFieldsetProps} />;

export const FormLabelPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;label /&gt;</Code> element attributes.
  </Text>
);

const formGroupProps: Prop[] = [
  {
    name: 'errors',
    types: ['React.ReactChild', 'React.ReactChild[]'],
    description: 'Pass error(s) into the form group to override child input errors.',
  },
];

export const FormGroupPropTable: React.FC = () => <PropTable propList={formGroupProps} />;
