import { Form, FormGroup, Grid, H0, H1, H2, Link, Select, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { SelectActionPropTable, SelectGroupPropTable, SelectOptionPropTable, SelectPropTable } from '../../PropTables';

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
        const [value, setValue] = React.useState('mx');
        const handleChange = val => setValue(val);

        return (
          <Form>
            <FormGroup>
              <Select
                action={{
                  actionType: 'destructive' as 'destructive',
                  content: 'Remove Country',
                  icon: <DeleteIcon />,
                  onActionClick: () => null,
                }}
                filterable={true}
                label="Countries"
                maxHeight={300}
                onOptionChange={handleChange}
                options={[
                  {
                    groupLabel: 'Group 1',
                    options: [
                      { value: 'us', content: 'United States' },
                      { value: 'mx', content: 'Mexico' },
                      { value: 'ca', content: 'Canada' },
                      { value: 'en', content: 'England' },
                      { value: 'fr', content: 'France' },
                      { value: 'gr', content: 'Germany' },
                      { value: 'ar', content: 'Argentina' },
                    ],
                  },
                  {
                    groupLabel: 'group 2',
                    options: [
                      { value: 'ru', content: 'Russia', disabled: true },
                      { value: 'ch', content: 'Chile' },
                      { value: 'bo', content: 'Bolivia' },
                      { value: 'jp', content: 'Japan' },
                      { value: 'cn', content: 'China' },
                      { value: 'sk', content: 'South Korea' },
                      { value: 'au', content: 'Australia' },
                      { value: 'ug', content: 'Uganda' },
                    ],
                  },
                ]}
                placeholder={'Choose country'}
                placement={'bottom-start'}
                required
                value={value}
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <SelectPropTable />
    <SelectOptionPropTable />
    <SelectActionPropTable />
    <SelectGroupPropTable />

    <H1>Examples</H1>

    <H2>Position</H2>

    <Text>
      Select can be anchored in different directions with the <Code primary>position</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, 1fr)">
        <Select
          label="Select"
          onOptionChange={() => null}
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
          onOptionChange={() => null}
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
          onOptionChange={() => null}
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
          onOptionChange={() => null}
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

    <H2>Max Height</H2>

    <Text>
      Once the content is longer than the max-height, the Dropdown will be scrollable. It is possible to modify the
      dimension by passing a <Code primary>maxHeight</Code> property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(3, 1fr)">
        <Select
          label="Select"
          onOptionChange={() => null}
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
          onOptionChange={() => null}
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
          onOptionChange={() => null}
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

    <H2>Disabled</H2>

    <Text>
      It is possible to disable the entire select component, similar to how you would disable a native HTML select
      element, by using the <Code primary>disabled</Code> property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Select
            disabled
            label="Select"
            maxHeight={350}
            onOptionChange={() => null}
            options={[
              { value: 1, content: 'Option' },
              { value: 2, content: 'Option' },
              { value: 3, content: 'Option' },
              { value: 4, content: 'Option' },
            ]}
            placeholder="Larger"
            required
          />
        </FormGroup>
      </Form>

      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Action</H2>

    <Text>
      Accepts an <Code>action</Code> object to display at the end of the list.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Select
            action={{
              actionType: 'destructive',
              content: 'Remove Country',
              icon: <DeleteIcon />,
              onActionClick: () => null,
            }}
            label="Countries"
            onOptionChange={() => null}
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
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Error</H2>

    <Text>
      An <Code>error</Code> prop receives a <Code>string</Code> to display.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Select
            label="Countries"
            error="Need to choose a country before proceeding"
            onOptionChange={() => null}
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
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Select Groups</H2>

    <Text>
      It is possible to create grouped options with labels with a <Code primary>Select Group</Code> by passing{' '}
      <Code primary>groupLabel</Code> and <Code primary>options</Code> to the top-level <Code primary>options</Code>{' '}
      property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Select
            label="My Options"
            filterable
            onOptionChange={() => null}
            options={[
              {
                groupLabel: 'Group 1',
                options: [
                  { value: 'mx', content: 'Mexico' },
                  { value: 'ca', content: 'Canada' },
                  { value: 'en', content: 'England' },
                ],
              },
              {
                groupLabel: 'Group 2',
                options: [
                  { value: 'fr', content: 'France' },
                  { value: 'gr', content: 'Germany' },
                  { value: 'ar', content: 'Argentina' },
                ],
              },
            ]}
          />
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
