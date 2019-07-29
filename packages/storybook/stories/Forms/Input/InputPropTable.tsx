import { Link, Text } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

import { Code, PropTable } from '../../../components';

export const InputPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="description" types="ReactChild">
      Append a description to the input field.
    </PropTable.Prop>
    <PropTable.Prop name="error" types="ReactChild">
      Displays an error message for the field.
    </PropTable.Prop>
    <PropTable.Prop name="iconLeft" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>}>
      Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the left of the text.
    </PropTable.Prop>
    <PropTable.Prop name="iconRight" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>}>
      Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the right of the text.
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
    See <Link onClick={linkTo('Forms') as any}>Forms.Error</Link>.
  </Text>
);

export const InputLabelPropTable: React.FC = () => (
  <Text>
    See <Link onClick={linkTo('Forms') as any}>Forms.Label</Link>.
  </Text>
);
