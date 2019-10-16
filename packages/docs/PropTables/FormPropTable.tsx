import { H2, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

export const FormPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;form /&gt;</Code> element attributes.
  </Text>
);

export const FormErrorPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <>
    <H2 id={id}>Form.Error</H2>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </>
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

export const FormFieldsetPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Form.Fieldset" propList={formFieldsetProps} {...props} />
);

export const FormLabelPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <>
    <H2 id={id}>Form.Label</H2>
    <Text>
      Supports all native <Code>&lt;label /&gt;</Code> element attributes.
    </Text>
  </>
);

const formGroupProps: Prop[] = [
  {
    name: 'errors',
    types: ['React.ReactChild', 'React.ReactChild[]'],
    description: 'Pass error(s) into the form group to override child input errors.',
  },
];

export const FormGroupPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Form.Group" propList={formGroupProps} {...props} />
);
