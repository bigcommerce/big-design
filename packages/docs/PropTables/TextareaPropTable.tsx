import { Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTable } from '../components';

export const TextareaPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="description" types="ReactChild">
      Append a description to the textarea field.
    </PropTable.Prop>
    <PropTable.Prop name="error" types="ReactChild">
      Displays an error message for the field.
    </PropTable.Prop>
    <PropTable.Prop name="label" types="ReactChild">
      Label element for textareas. Component with auto generate <Code>id</Code>'s for the accessibility API.
    </PropTable.Prop>
    <PropTable.Prop name="rows" types={['1', '2', '3', '4', '5', '6', '7']} defaults="3">
      Determines the intial height via HTML's <Code>row</Code> property.
    </PropTable.Prop>
    <PropTable.Prop name="resize" types="boolean" defaults="true">
      Determines if the textarea is resizable vertically.
    </PropTable.Prop>
  </PropTable>
);

export const TextareaDescriptionPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;p /&gt;</Code> element attributes.
  </Text>
);

export const TextareaErrorPropTable: React.FC = () => (
  <Text>
    See <Link href="/forms">Forms.Error</Link>.
  </Text>
);

export const TextareaLabelPropTable: React.FC = () => (
  <Text>
    See <Link href="/forms">Forms.Label</Link>.
  </Text>
);
