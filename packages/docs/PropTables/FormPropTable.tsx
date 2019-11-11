import { H2, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

export const FormErrorPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <>
    <H2 id={id}>Form.Error</H2>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </>
);

const formProps: Prop[] = [
  {
    name: 'fullWidth',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Sets the form width to 100%',
  },
];

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

export const FormPropTable: React.FC<PropTableWrapper> = props => (
  <>
    <Text>
      Supports all native <Code>&lt;form /&gt;</Code> element attributes.
    </Text>
    <PropTable title="Form" propList={formProps} {...props} />
  </>
);

export const FormGroupPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Form.Group" propList={formGroupProps} {...props} />
);
