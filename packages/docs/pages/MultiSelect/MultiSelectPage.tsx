import { Form, FormGroup, Grid, H1, MultiSelect, Panel, Tabs, Text } from '@bigcommerce/big-design';
import { DeleteIcon } from '@bigcommerce/big-design-icons';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { MultiSelectPropTable, SelectActionPropTable, SelectOptionPropTable } from '../../PropTables';

const MultiSelectPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <>
            <MultiSelectPropTable />
            <SelectOptionPropTable />
            <SelectActionPropTable />
          </>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel>
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
            </Panel>
            <Panel header="Position">
              <Text>
                MultiSelect can be anchored in different directions with the <Code primary>position</Code> property. It
                will automatically find a position if there's not enough space in the chosen direction.
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
            </Panel>
            <Panel header="Max height">
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
            </Panel>
            <Panel header="Disabled">
              <Text>
                It is possible to disable the entire select component, similar to how you would disable a native HTML
                select element, by using the <Code primary>disabled</Code> property.
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
            </Panel>
            <Panel header="Actions">
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
            </Panel>
            <Panel header="Error">
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
            </Panel>
            <Panel header="Multi select groups">
              <Text>
                It is possible to create grouped options with labels with a <Code primary>Select Group</Code> by passing{' '}
                <Code primary>label</Code> and <Code primary>options</Code> to the top-level{' '}
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
            </Panel>
            <Panel header="Description">
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
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Multi select</H1>

      <Text>Multi selects are typeable inputs with multiple selectable items within a dropdown.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default MultiSelectPage;
