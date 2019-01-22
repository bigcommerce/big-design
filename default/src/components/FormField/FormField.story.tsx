import { storiesOf } from '@storybook/react';
import React from 'react';

import { FormRow } from '../FormRow';
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

      <FormRow>
        <FormField>
          <FormField.Label>First Name</FormField.Label>
          <FormField.Description>This is an example description for First Name</FormField.Description>
          <FormField.Input placeholder="Placeholder text" />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label>Middle Name</FormField.Label>
          <FormField.Description>
            This is an example description for Last Name. Featuring a Left Icon.
          </FormField.Description>
          <FormField.Input placeholder="Placeholder text" iconLeft={<PlusIcon />} />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label>Last Name</FormField.Label>
          <FormField.Description>
            This is an example description for Last Name. Featuring a Right Icon.
          </FormField.Description>
          <FormField.Input placeholder="Placeholder text" iconRight={<PlusIcon />} />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label htmlFor="manualId">Password</FormField.Label>
          <FormField.Description>
            The password must contain at least 8 characters. (Also features manually setting id, inspect it!)
          </FormField.Description>
          <FormField.Input id="manualId" placeholder="Placeholder text" type="password" />
          <FormField.Error>Your password is not strong enough.</FormField.Error>
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label>Company</FormField.Label>
          <FormField.Description>
            This is an example description for Company. Featuring a Disabled field.
          </FormField.Description>
          <FormField.Input placeholder="Placeholder text disabled" disabled />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label>State</FormField.Label>
          <FormField.Input placeholder="Placeholder" />
        </FormField>
        <FormField>
          <FormField.Label>City</FormField.Label>
          <FormField.Input placeholder="Placeholder" />
        </FormField>
      </FormRow>

      <FormRow>
        <FormField>
          <FormField.Label>State</FormField.Label>
          <FormField.Input placeholder="Placeholder" />
        </FormField>
        <FormField>
          <FormField.Label>City</FormField.Label>
          <FormField.Input placeholder="Placeholder" />
        </FormField>
        <FormField>
          <FormField.Label>Country</FormField.Label>
          <FormField.Input placeholder="Placeholder" />
        </FormField>
      </FormRow>
    </Panel>
  </div>
));
