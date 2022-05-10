import { Fieldset, Form, FormGroup, H1, Panel, Radio, Text } from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { RadioDescriptionLinkPropTable, RadioDescriptionPropTable, RadioPropTable } from '../PropTables';

const RadioPage = () => {
  return (
    <>
      <H1>Radio</H1>

      <Panel header="Overview" headerId="overview">
        <Text>Radio buttons let users select an option from a list of two or more items.</Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use radio buttons when a user can only make one, mutually exclusive selection from a list.
          </List.Item>
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
                    A <Code primary>Radio</Code> is a group of items from which a single option can be selected.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [selected, setSelected] = useState('');

                      const handleChange = (event) => setSelected(event.target.value);

                      return (
                        <Form>
                          <FormGroup>
                            <Radio label="On" checked={selected === 'on'} value="on" onChange={handleChange} />
                            <Radio label="Off" checked={selected === 'off'} value="off" onChange={handleChange} />
                            <Radio
                              label="Disabled"
                              disabled={true}
                              checked={selected === 'disabled'}
                              value="disabled"
                              onChange={handleChange}
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
              id: 'grouping',
              title: 'Grouping',
              render: () => (
                <Fragment key="grouping">
                  <Text>
                    In order to group radio controls, use the <Code>Fieldset</Code> component to separate the controls.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [firstRadio, setFirstRadio] = useState('');
                      const [secondRadio, setSecondRadio] = useState('');

                      const handleFirstChange = (event) => setFirstRadio(event.target.value);
                      const handleSecondChange = (event) => setSecondRadio(event.target.value);

                      return (
                        <Form>
                          <Fieldset legend="First Group">
                            <FormGroup>
                              <Radio label="On" checked={firstRadio === 'on'} value="on" onChange={handleFirstChange} />
                              <Radio
                                label="Off"
                                checked={firstRadio === 'off'}
                                value="off"
                                onChange={handleFirstChange}
                              />
                            </FormGroup>
                          </Fieldset>
                          <Fieldset legend="Second Group">
                            <FormGroup>
                              <Radio
                                label="On"
                                checked={secondRadio === 'on'}
                                value="on"
                                onChange={handleSecondChange}
                              />
                              <Radio
                                label="Off"
                                checked={secondRadio === 'off'}
                                value="off"
                                onChange={handleSecondChange}
                              />
                            </FormGroup>
                          </Fieldset>
                        </Form>
                      );
                    }}
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
                  <Text>
                    Radio support <Code primary>description</Code> passed as a prop, which contains a text and an
                    optional link.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [selected, setSelected] = useState('');

                      const handleChange = (event) => setSelected(event.target.value);

                      return (
                        <Form>
                          <FormGroup>
                            <Radio
                              label="On"
                              checked={selected === 'on'}
                              description="Description for on"
                              value="on"
                              onChange={handleChange}
                            />
                            <Radio
                              label="Off"
                              description="Description for off"
                              checked={selected === 'off'}
                              value="off"
                              onChange={handleChange}
                            />
                            <Radio
                              label="Disabled"
                              disabled={true}
                              description={{
                                text: 'Description for disabled.',
                                link: {
                                  text: 'Learn more',
                                  target: '_blank',
                                  href: 'http://www.bigcommerce.com',
                                },
                              }}
                              checked={selected === 'disabled'}
                              value="disabled"
                              onChange={handleChange}
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
              id: 'radio',
              title: 'Radio',
              render: () => <RadioPropTable />,
            },
            {
              id: 'radio-description',
              title: 'RadioDescription',
              render: () => <RadioDescriptionPropTable />,
            },
            {
              id: 'radio-description-link',
              title: 'RadioDescriptionLink',
              render: () => <RadioDescriptionLinkPropTable />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>Group related radio buttons under input headings.</>,
            <>Include a default selected option with the radio buttons.</>,
            <>Lay radio buttons vertically.</>,
          ]}
          discouraged={[
            <>Don’t use radio buttons for long lists of short items. Use a select input instead.</>,
            <>
              A set of radio buttons should not have a state of being “unselected.” There must always be a selection.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default RadioPage;
