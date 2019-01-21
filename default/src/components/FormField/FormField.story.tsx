import { storiesOf } from '@storybook/react';
import React from 'react';

import PlusIcon from '../Icons/PlusIcon';
import { Panel } from '../Panel';
import { H2, Text } from '../Text';

import { FormField } from './FormField';

storiesOf('Form Fields', module).add('Overview', () => (
  <div style={{ padding: 50 }}>
    <Panel>
      <H2>Form Field</H2>

      <Text>
        Form fields examples. Implementation detail: id will be auto-generated for input and label(for). Unless manually
        specifying one
      </Text>

      <FormField>
        <FormField.Label>First Name</FormField.Label>
        <FormField.Description>This is an example description for First Name</FormField.Description>
        <FormField.Input placeholder="Placeholder text" />
      </FormField>

      <FormField>
        <FormField.Label>Middle Name</FormField.Label>
        <FormField.Description>
          This is an example description for Last Name. Featuring a Left Icon.
        </FormField.Description>
        <FormField.Input placeholder="Placeholder text" iconLeft={<PlusIcon />} />
      </FormField>

      <FormField>
        <FormField.Label>Last Name</FormField.Label>
        <FormField.Description>
          This is an example description for Last Name. Featuring a Right Icon.
        </FormField.Description>
        <FormField.Input placeholder="Placeholder text" iconRight={<PlusIcon />} />
      </FormField>

      <FormField>
        <FormField.Label htmlFor="manualId">Password</FormField.Label>
        <FormField.Description>
          The password must contain at least 8 characters. (Also features manually setting id, inspect it!)
        </FormField.Description>
        <FormField.Input id="manualId" placeholder="Placeholder text" type="password" />
        <FormField.Error>Your password is not strong enough.</FormField.Error>
      </FormField>

      <FormField>
        <FormField.Label>Company</FormField.Label>
        <FormField.Description>
          This is an example description for Company. Featuring a Disabled field.
        </FormField.Description>
        <FormField.Input placeholder="Placeholder text disabled" disabled />
      </FormField>
    </Panel>
  </div>
));
