import { Form, Grid, H0, H1, H2, Link, Select, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { SelectOptionPropTable, SelectPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Selects</H0>

    <Text>
      Select are typeable inputs with selectable dropdown items.{' '}
      <Link href="https://bigcommerce.design/fields" target="_blank">
        Form Fields Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState('');
        const handleChange = val => setValue(val);

        return (
          <Form.Group>
            <Select
              label="Countries"
              maxHeight={300}
              onActionClick={inputText => inputText}
              onItemChange={handleChange}
              placeholder={'Choose country'}
              placement={'bottom-start'}
              value={value}
              error={value ? undefined : 'You must choose a country'}
              required
            >
              <Select.Option value="us">United States</Select.Option>
              <Select.Option value="mx">Mexico</Select.Option>
              <Select.Option value="ca">Canada</Select.Option>
              <Select.Option value="en">England</Select.Option>
              <Select.Option value="fr">France</Select.Option>
              <Select.Option value="gr">Germany</Select.Option>
              <Select.Option value="ar">Argentina</Select.Option>
              <Select.Option value="ch">Chile</Select.Option>
              <Select.Option value="bo">Bolivia</Select.Option>
              <Select.Option value="jp">Japan</Select.Option>
              <Select.Option value="cn">China</Select.Option>
              <Select.Option value="sk">South Korea</Select.Option>
              <Select.Option value="au">Australia</Select.Option>
              <Select.Option value="ug">Uganda</Select.Option>
              <Select.Option value="ru" disabled>
                Russia
              </Select.Option>
              <Select.Action>Action</Select.Action>
            </Select>
          </Form.Group>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Select</H2>

    <SelectPropTable />

    <H2>Select.Option</H2>

    <SelectOptionPropTable />

    <H1>Position</H1>

    <Text>
      Select can be anchored in different directions with the <Code primary>position</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, 1fr)">
        <Select label="Select" placeholder="Choose from above" onItemChange={() => null} placement="top">
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
        </Select>
        <Select label="Select" placeholder="Choose from below" onItemChange={() => null} placement="bottom-start">
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
        </Select>
        <Select label="Select" placeholder="Choose from the right" onItemChange={() => null} placement="right-start">
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
        </Select>
        <Select label="Select" placeholder="Choose from the left" onItemChange={() => null} placement="left-end">
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
        </Select>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Max Height</H1>

    <Text>
      Once the content is longer than the max-height, the Dropdown will be scrollable. It is possible to modify the
      dimension by passing a <Code primary>maxHeight</Code> property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(3, 1fr)">
        <Select label="Select" placeholder="Default" onItemChange={() => null}>
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
          <Select.Option value={5}>Option</Select.Option>
          <Select.Option value={6}>Option</Select.Option>
          <Select.Option value={7}>Option</Select.Option>
          <Select.Option value={8}>Option</Select.Option>
        </Select>
        <Select label="Select" placeholder="Smaller" onItemChange={() => null} maxHeight={150}>
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
          <Select.Option value={5}>Option</Select.Option>
          <Select.Option value={6}>Option</Select.Option>
          <Select.Option value={7}>Option</Select.Option>
          <Select.Option value={8}>Option</Select.Option>
        </Select>
        <Select label="Select" placeholder="Larger" onItemChange={() => null} maxHeight={350}>
          <Select.Option value={1}>Option</Select.Option>
          <Select.Option value={2}>Option</Select.Option>
          <Select.Option value={3}>Option</Select.Option>
          <Select.Option value={4}>Option</Select.Option>
          <Select.Option value={5}>Option</Select.Option>
          <Select.Option value={6}>Option</Select.Option>
          <Select.Option value={7}>Option</Select.Option>
          <Select.Option value={8}>Option</Select.Option>
        </Select>
      </Grid>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Disabled</H1>

    <Text>
      It is possible to disable the entire select component, similar to how you would disable a native HTML select
      element, by using the <Code primary>disabled</Code> property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Select label="Select" placeholder="Default" onItemChange={() => null} disabled>
        <Select.Option value={1}>Option</Select.Option>
        <Select.Option value={2}>Option</Select.Option>
      </Select>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Select.Action</H1>

    <Text>Select.Action allows you to add custom actions to the dropdown.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Select value={1} onItemChange={() => null} onActionClick={innerText => alert(innerText)}>
        <Select.Option value={1}>Action Example</Select.Option>
        <Select.Action>Action</Select.Action>
      </Select>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
