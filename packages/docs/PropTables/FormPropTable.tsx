import { Text, H3, Panel } from '@bigcommerce/big-design';
import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

export const FormErrorPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <Panel header="FormControlError" id={id}>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </Panel>
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

export const FormLabelPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <Panel header="FormControlLabel" id={id}>
    <Text>
      Supports all native <Code>&lt;label /&gt;</Code> element attributes.
    </Text>
  </Panel>
);

export const FormDescriptionPropTable: React.FC<{ id?: string }> = ({ id }) => (
  <Panel header="FormControlDescription" id={id}>
    <Text>
      Supports all native <Code>&lt;p /&gt;</Code> element attributes.
    </Text>
  </Panel>
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
