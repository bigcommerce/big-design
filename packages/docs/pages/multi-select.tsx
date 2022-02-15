import { Form, FormGroup, Grid, H1, MultiSelect, Panel, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { MultiSelectPropTable, SelectActionPropTable, SelectOptionPropTable } from '../PropTables';

const MultiSelectPage = () => {
  return (
    <>
      <H1>MultiSelect</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Multiselects</Code> allow users to select multiple items within a list of options
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>To select multiple options within a list, usually of related or grouped items.</List.Item>
          <List.Item>To select four or more predefined selections.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <Fragment key="basic">
                  <Text>
                    <Code primary>MultiSelects</Code> are typeable inputs with multiple selectable items within a
                    dropdown.
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
                                actionType: 'destructive' as const,
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
                </Fragment>
              ),
            },
            {
              id: 'position',
              title: 'Position',
              render: () => (
                <Fragment key="position">
                  <Text>
                    <Code primary>MultiSelect</Code> can be anchored in different directions with the{' '}
                    <Code primary>placement</Code> property. It will automatically find a position if there's not enough
                    space in the chosen direction.
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
                </Fragment>
              ),
            },
            {
              id: 'max-height',
              title: 'Max height',
              render: () => (
                <Fragment key="max-height">
                  <Text>
                    Once the content is longer than the max-height, the Dropdown will be scrollable. It is possible to
                    modify the dimension by passing a <Code primary>maxHeight</Code> property.
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
                </Fragment>
              ),
            },
            {
              id: 'disabled',
              title: 'Disabled',
              render: () => (
                <Fragment key="disabled">
                  <Text>
                    It is possible to disable the entire select component, similar to how you would disable a native
                    HTML select element, by using the <Code primary>disabled</Code> property.
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
                </Fragment>
              ),
            },
            {
              id: 'actions',
              title: 'Actions',
              render: () => (
                <Fragment key="actions">
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
                </Fragment>
              ),
            },
            {
              id: 'error',
              title: 'Error',
              render: () => (
                <Fragment key="error">
                  <Text>
                    An <Code primary>error</Code> prop receives a <Code>string</Code> to display.
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
                </Fragment>
              ),
            },
            {
              id: 'multi-select-groups',
              title: 'Multi select groups',
              render: () => (
                <Fragment key="multi-select-groups">
                  <Text>
                    It is possible to create grouped options with labels with a <Code primary>Select Group</Code> by
                    passing <Code primary>label</Code> and <Code primary>options</Code> to the top-level{' '}
                    <Code primary>options</Code> property.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <MultiSelect
                          label="My Options"
                          filterable
                          onOptionsChange={() => null}
                          options={[
                            {
                              label: 'Group 1',
                              options: [
                                { value: 'mx', content: 'Mexico' },
                                { value: 'ca', content: 'Canada' },
                                { value: 'en', content: 'England' },
                              ],
                            },
                            {
                              label: 'Group 2',
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
                </Fragment>
              ),
            },
            {
              id: 'description',
              title: 'Description',
              render: () => (
                <Fragment key="description">
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
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <MultiSelectPropTable />
        <SelectOptionPropTable />
        <SelectActionPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>Have a default selection whenever possible. If there’s no logical default, leverage placeholder text</>,
            <>Sort the list of options in a way that makes the most sense to users</>,
            <>Provide the ability to search when there is a use case for particular choices</>,
          ]}
          discouraged={[<>Avoid using a multiselect if there are less than three options provided in the dropdown</>]}
        />
      </Panel>
    </>
  );
};

export default MultiSelectPage;
