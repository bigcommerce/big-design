import { Form, FormGroup, Grid, H0, H1, H2, Link, MultiSelect, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { MultiSelectPropTable, SelectActionPropTable, SelectOptionPropTable } from '../../PropTables';

const MultiSelectPage = () => (
  <>
    <H0>MultiSelects</H0>

    <Text>
      MultiSelect are typeable inputs with multiple selectable dropdown items.{' '}
      <Link href="https://design.bigcommerce.com/components/selects" target="_blank">
        Selects Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = useState(['mx']);
        const handleChange = (val) => setValue(val);

        return (
          <Form>
            <FormGroup>
              <MultiSelect
                action={{
                  actionType: 'destructive' as 'destructive',
                  content: 'Remove Country',
                  icon: <DeleteIcon />,
                  onActionClick: () => null,
                }}
                filterable={true}
                label="Countries"
                maxHeight={300}
                onOptionsChange={handleChange}
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
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <MultiSelectPropTable />
    <SelectOptionPropTable />
    <SelectActionPropTable />

    <H1>Examples</H1>

    <H2>Position</H2>

    <Text>
      MultiSelect can be anchored in different directions with the <Code primary>position</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, 1fr)">
        <MultiSelect
          label="Select"
          onOptionsChange={() => null}
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
        <MultiSelect
          label="Select"
          onOptionsChange={() => null}
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
        <MultiSelect
          label="Select"
          onOptionsChange={() => null}
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
        <MultiSelect
          label="Select"
          onOptionsChange={() => null}
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
        <MultiSelect
          label="Select"
          onOptionsChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
            { value: 5, content: 'Option' },
            { value: 6, content: 'Option' },
            { value: 7, content: 'Option' },
            { value: 8, content: 'Option' },
          ]}
          placeholder="Default"
          required
        />
        <MultiSelect
          label="Select"
          maxHeight={150}
          onOptionsChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
            { value: 5, content: 'Option' },
            { value: 6, content: 'Option' },
            { value: 7, content: 'Option' },
            { value: 8, content: 'Option' },
          ]}
          placeholder="Smaller"
          required
        />
        <MultiSelect
          label="Select"
          maxHeight={350}
          onOptionsChange={() => null}
          options={[
            { value: 1, content: 'Option' },
            { value: 2, content: 'Option' },
            { value: 3, content: 'Option' },
            { value: 4, content: 'Option' },
            { value: 5, content: 'Option' },
            { value: 6, content: 'Option' },
            { value: 7, content: 'Option' },
            { value: 8, content: 'Option' },
            { value: 9, content: 'Option' },
            { value: 10, content: 'Option' },
            { value: 11, content: 'Option' },
            { value: 12, content: 'Option' },
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
          <MultiSelect
            disabled
            label="Select"
            maxHeight={350}
            onOptionsChange={() => null}
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

    <H1>Action</H1>

    <Text>
      Accepts an <Code>action</Code> object to display at the end of the list.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <MultiSelect
            action={{
              actionType: 'destructive',
              content: 'Remove Country',
              icon: <DeleteIcon />,
              onActionClick: () => null,
            }}
            label="Countries"
            onOptionsChange={() => null}
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
          <MultiSelect
            label="Countries"
            error="Need to choose a country before proceeding"
            onOptionsChange={() => null}
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

    <H2>Option & Action Description</H2>

    <Text>It is possible to add a description for select options and actions.</Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [value, setValue] = useState([1]);
        const handleChange = (val) => setValue(val);

        return (
          <Form>
            <FormGroup>
              <MultiSelect
                action={{
                  actionType: 'destructive',
                  content: 'Remove',
                  description: 'Description for remove action',
                  icon: <DeleteIcon />,
                  onActionClick: () => null,
                }}
                label="Select"
                onOptionsChange={() => null}
                options={[
                  { value: 1, content: 'Option #1', description: 'Description for option #1' },
                  {
                    value: 2,
                    content: 'Option #2',
                    description: 'Description for option #2',
                    disabled: true,
                  },
                  { value: 3, content: 'Option #3' },
                  { value: 4, content: 'Option #4' },
                  { value: 5, content: 'Option #5' },
                ]}
                onChange={handleChange}
                placeholder="Choose option"
                required
                value={value}
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default MultiSelectPage;
