import { Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTable } from '../components';

export const InputPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="description" types="ReactChild">
      Append a description to the input field.
    </PropTable.Prop>
    <PropTable.Prop name="error" types="ReactChild">
      Displays an error message for the field. Error message will be passed to the <Code>Form.Group</Code> for display
      purposes.
    </PropTable.Prop>
    <PropTable.Prop name="iconLeft" types={<Link href="/icons">Icon</Link>}>
      Pass in an <Link href="/icons">Icon</Link> component to display to the left of the text.
    </PropTable.Prop>
    <PropTable.Prop name="iconRight" types={<Link href="/icons">Icon</Link>}>
      Pass in an <Link href="/icons">Icon</Link> component to display to the right of the text.
    </PropTable.Prop>
    <PropTable.Prop name="label" types="ReactChild">
      Label element for inputs. Component with auto generate <Code>id</Code>'s for the accessibility API.
    </PropTable.Prop>
  </PropTable>
);

export const InputDescriptionPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;p /&gt;</Code> element attributes.
  </Text>
);

export const InputErrorPropTable: React.FC = () => (
  <Text>
    See <Link href="/forms">Forms.Error</Link>.
  </Text>
);

export const InputLabelPropTable: React.FC = () => (
  <Text>
    See <Link href="/forms">Forms.Label</Link>.
  </Text>
);
