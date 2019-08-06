import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTable } from '../components';

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

export const FormFieldsetPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="description" types="ReactChild">
      Pass in a description to display in the fieldset.
    </PropTable.Prop>
    <PropTable.Prop name="legend" types="ReactChild">
      Pass in a legend to display in the fieldset.
    </PropTable.Prop>
  </PropTable>
);

export const FormLabelPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;label /&gt;</Code> element attributes.
  </Text>
);

export const FormGroupPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="errors" types={['string', 'React.ReactChild', 'Array<string | React.ReactChild>']}>
      Pass error(s) into the form group to override child input errors.
    </PropTable.Prop>
  </PropTable>
);
