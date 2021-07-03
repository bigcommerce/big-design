import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

export const FormErrorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlError" {...props}>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </PropTable>
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
    types: ['string', 'FieldsetDescription'],
    description: 'Pass in a description to display in the fieldset. Will render nothing if not the correct type.',
  },
  {
    name: 'legend',
    types: ['string', 'FieldsetLegend'],
    description: 'Pass in a legend to display in the fieldset. Will render nothing if not the correct type.',
  },
];

export const FormFieldsetPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Fieldset" propList={formFieldsetProps} {...props} />
);

export const FormLabelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlLabel" {...props}>
    <Text>
      Supports all native <Code>&lt;label /&gt;</Code> element attributes.
    </Text>
  </PropTable>
);

export const FormDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormControlDescription" {...props}>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </PropTable>
);

const formGroupProps: Prop[] = [
  {
    name: 'errors',
    types: ['React.ReactChild', 'React.ReactChild[]'],
    description: 'Pass error(s) into the form group to override child input errors.',
  },
];

export const FormPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Form" propList={formProps} {...props}>
    <Text>
      Supports all native <Code>&lt;form /&gt;</Code> element attributes.
    </Text>
  </PropTable>
);

export const FormGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="FormGroup" propList={formGroupProps} {...props} />
);
