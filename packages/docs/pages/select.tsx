import { Form, FormGroup, Grid, H1, Panel, Select, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment, useState } from 'react';

import {
  Code,
  CodePreview,
  ContentRoutingTabs,
  GuidelinesTable,
  List,
  NextLink,
} from '../components';
import {
  SelectActionPropTable,
  SelectGroupPropTable,
  SelectOptionPropTable,
  SelectPropTable,
} from '../PropTables';

const SelectPage = () => {
  return (
    <>
      <H1>Select</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Select</Code> gives merchants the ability to make a single selection or
          multiple selections from a list of options.
        </Text>

        <Text bold>When to use:</Text>
        <List>
          <List.Item>When a user needs to make selections in a form.</List.Item>
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
                    <Code primary>Selects</Code> are typeable inputs with selectable options.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [value, setValue] = useState('mx');
                      const handleChange = (val: string) => setValue(val);

                      return (
                        <Form>
                          <FormGroup>
                            <Select
                              action={{
                                actionType: 'destructive' as const,
                                content: 'Remove Country',
                                icon: <DeleteIcon />,
                                onActionClick: () => null,
                              }}
                              filterable={true}
                              label="Countries"
                              maxHeight={300}
                              onOptionChange={handleChange}
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
                              placeholder="Choose country"
                              placement="bottom-start"
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
                    <Code primary>Select</Code> can be anchored in different directions with the{' '}
                    <Code primary>position</Code> property. It will automatically find a position if
                    there's not enough space in the chosen direction.
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
                </Fragment>
              ),
            },
            {
              id: 'max-height',
              title: 'Max height',
              render: () => (
                <Fragment key="max-height">
                  <Text>
                    Once the content is longer than the max-height, the <Code primary>Select</Code>{' '}
                    will be scrollable. It is possible to modify the dimension by passing a{' '}
                    <Code primary>maxHeight</Code> property.
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
                          { value: 5, content: 'Option' },
                          { value: 6, content: 'Option' },
                          { value: 7, content: 'Option' },
                          { value: 8, content: 'Option' },
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
                          { value: 5, content: 'Option' },
                          { value: 6, content: 'Option' },
                          { value: 7, content: 'Option' },
                          { value: 8, content: 'Option' },
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
                    It is possible to disable the entire <Code primary>Select</Code> component,
                    similar to how you would disable a native HTML select element, by using the{' '}
                    <Code primary>disabled</Code> property.
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
                </Fragment>
              ),
            },
            {
              id: 'action',
              title: 'Action',
              render: () => (
                <Fragment key="action">
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
                          placeholder="Choose country"
                          placement="bottom-start"
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
                        <Select
                          error="Need to choose a country before proceeding"
                          label="Countries"
                          onOptionChange={() => null}
                          options={[
                            { value: 'us', content: 'United States' },
                            { value: 'mx', content: 'Mexico' },
                            { value: 'ca', content: 'Canada' },
                            { value: 'en', content: 'England' },
                          ]}
                          placeholder="Choose country"
                          placement="bottom-start"
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
              id: 'select-group',
              title: 'Select group',
              render: () => (
                <Fragment key="select-group">
                  <Text>
                    It is possible to create grouped options with labels with a{' '}
                    <Code primary>Select Group</Code> by passing <Code primary>label</Code> and{' '}
                    <Code primary>options</Code> to the top-level <Code primary>options</Code>{' '}
                    property.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Select
                          filterable
                          label="My Options"
                          onOptionChange={() => null}
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
                          value="ca"
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
                      const [value, setValue] = useState(1);
                      const handleChange = (val: string) => setValue(val);

                      return (
                        <Form>
                          <FormGroup>
                            <Select
                              action={{
                                actionType: 'destructive',
                                content: 'Remove',
                                description: 'Description for remove action',
                                icon: <DeleteIcon />,
                                onActionClick: () => null,
                              }}
                              label="Select"
                              onChange={handleChange}
                              onOptionChange={() => null}
                              options={[
                                {
                                  value: 1,
                                  content: 'Option #1',
                                  description: 'Description for option #1',
                                },
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
                              placeholder="Larger"
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
        <ContentRoutingTabs
          id="props"
          routes={[
            {
              id: 'select',
              title: 'Select',
              render: () => <SelectPropTable />,
            },
            {
              id: 'select-option',
              title: 'SelectOption',
              render: () => <SelectOptionPropTable />,
            },
            {
              id: 'select-action',
              title: 'SelectAction',
              render: () => <SelectActionPropTable />,
            },
            {
              id: 'select-group',
              title: 'SelectGroup',
              render: () => <SelectGroupPropTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t use <Code primary>Select </Code>component when user needs to make more than one
              selection (see <NextLink href="/multi-select">MultiSelect</NextLink>).
            </>,
            <>
              In most cases avoid using long <Code primary>labels</Code> (ideally less than three
              words).
            </>,
          ]}
          recommended={[
            <>
              Use within <NextLink href="/panel">Panels</NextLink>.
            </>,
            'Create all select options within a container.',
            <>
              Use for a single selection between 4 or more pre-defined <Code primary>options</Code>.
            </>,
            'Default a selection if possible.',
            'Add placeholder text if additional context is needed.',
            'Logically group select options when it makes sense.',
          ]}
        />
      </Panel>
    </>
  );
};

export default SelectPage;
