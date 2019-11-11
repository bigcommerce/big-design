import { Form, Grid, H0, H1, Link, Select, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { SelectActionPropTable, SelectOptionPropTable, SelectPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Selects</H0>

    <Text>
      Select are typeable inputs with selectable dropdown items.{' '}
      <Link href="https://design.bigcommerce.com/components/selects" target="_blank">
        Selects Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState(undefined);
        const handleChange = val => setValue(val);

        return (
          <Form.Group>
            <Select
              action={{
                actionType: 'destructive',
                content: 'Remove Country',
                icon: <DeleteIcon />,
                onClick: () => null,
              }}
              filterable={true}
              label="Countries"
              maxHeight={300}
              onItemChange={handleChange}
              options={[
                { value: 'us', content: 'United States' },
                { value: 'mx', content: 'Mexico' },
                { value: 'ca', content: 'Canada' },
                { value: 'en', content: 'England' },
                { value: 'fr', content: 'France' },
                { value: 'gr', content: 'Germany' },
                { value: 'ar', content: 'Argentina' },
                { value: 'ru', content: 'Russia', disabled: true },
                { value: 'ch', content: 'Chile' },
                { value: 'bo', content: 'Bolivia' },
                { value: 'jp', content: 'Japan' },
                { value: 'cn', content: 'China' },
                { value: 'sk', content: 'South Korea' },
                { value: 'au', content: 'Australia' },
                { value: 'ug', content: 'Uganda' },
              ]}
              placeholder={'Choose country'}
              placement={'bottom-start'}
              required
              value={value}
            />
          </Form.Group>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <SelectPropTable />
    <SelectOptionPropTable />
    <SelectActionPropTable />

    <H1>Multiselect</H1>

    <Text>
      Select has the ability to render a list of items as multiselectable. Select will return an <Code>array</Code> of
      the select options.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = React.useState([]);
        const handleChange = val => setValue(val);

        return (
          <Form.Group>
            <Select
              label="States"
              maxHeight={300}
              multi={true}
              onItemChange={handleChange}
              options={[
                { value: 'tx', content: 'Texas' },
                { value: 'ca', content: 'California' },
                { value: 'or', content: 'Oregon' },
                { value: 'ar', content: 'Arkansas' },
                { value: 'nv', content: 'Nevada', disabled: true },
              ]}
              placeholder={'Choose states'}
              placement={'bottom-start'}
              required
              value={value}
            />
          </Form.Group>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Position</H1>

    <Text>
      Select can be anchored in different directions with the <Code primary>position</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, 1fr)">
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Choose from above"
          placement="top"
          required
        />
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Choose from below"
          placement="bottom-start"
          required
        />
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Choose from the right"
          placement="right-start"
          required
        />
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Choose from the left"
          placement="left-end"
          required
        />
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
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Default"
          required
        />
        <Select
          label="Select"
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Default"
          required
        />
        <Select
          label="Select"
          maxHeight={150}
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Smaller"
          required
        />
        <Select
          label="Select"
          maxHeight={350}
          onItemChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
          ]}
          placeholder="Larger"
          required
        />
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
      <Select
        disabled
        label="Select"
        maxHeight={350}
        onItemChange={() => null}
        options={[
          { value: 1, content: 'Option' },
          { value: 2, content: 'Option' },
          { value: 3, content: 'Option' },
          { value: 4, content: 'Option' },
        ]}
        placeholder="Larger"
        required
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Action</H1>

    <Text>
      Accepts an <Code>action</Code> object to display at the end of the list.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Select
        action={{
          actionType: 'destructive',
          content: 'Remove Country',
          icon: <DeleteIcon />,
          onClick: () => null,
        }}
        label="Countries"
        onItemChange={() => null}
        options={[
          { value: 'us', content: 'United States' },
          { value: 'mx', content: 'Mexico' },
          { value: 'ca', content: 'Canada' },
          { value: 'en', content: 'England' },
        ]}
        placeholder={'Choose country'}
        placement={'bottom-start'}
        required
      />
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Error</H1>

    <Text>
      An <Code>error</Code> prop receives a <Code>string</Code> to display.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form.Group>
        <Select
          label="Countries"
          error="Need to choose a country before proceeding"
          onItemChange={() => null}
          options={[
            { value: 'us', content: 'United States' },
            { value: 'mx', content: 'Mexico' },
            { value: 'ca', content: 'Canada' },
            { value: 'en', content: 'England' },
          ]}
          placeholder={'Choose country'}
          placement={'bottom-start'}
          required
        />
      </Form.Group>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
