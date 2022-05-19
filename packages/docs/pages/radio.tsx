import { Fieldset, Form, FormGroup, H1, Panel, Radio, Text } from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  RadioDescriptionLinkPropTable,
  RadioDescriptionPropTable,
  RadioPropTable,
} from '../PropTables';

const RadioPage = () => {
  return (
    <>
      <H1>Radio</H1>

      <Panel header="Overview" headerId="overview">
        <Text>Radio buttons let users select an option from a list of two or more items.</Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use radio buttons when a user can only make one, mutually exclusive selection from a
            list.
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
                    A <Code primary>Radio</Code> is a group of items from which a single option can
                    be selected.
                  </Text>
                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [selected, setSelected] = useState('');

                      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
                        setSelected(event.target.value);

                      return (
                        <Form>
                          <FormGroup>
                            <Radio
                              checked={selected === 'on'}
                              label="On"
                              onChange={handleChange}
                              value="on"
                            />
                            <Radio
                              checked={selected === 'off'}
                              label="Off"
                              onChange={handleChange}
                              value="off"
                            />
                            <Radio
                              checked={selected === 'disabled'}
                              disabled={true}
                              label="Disabled"
                              onChange={handleChange}
                              value="disabled"
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
                    In order to group radio controls, use the <Code>Fieldset</Code> component to
                    separate the controls.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [firstRadio, setFirstRadio] = useState('');
                      const [secondRadio, setSecondRadio] = useState('');

                      const handleFirstChange = (event: React.ChangeEvent<HTMLInputElement>) =>
                        setFirstRadio(event.target.value);
                      const handleSecondChange = (event: React.ChangeEvent<HTMLInputElement>) =>
                        setSecondRadio(event.target.value);

                      return (
                        <Form>
                          <Fieldset legend="First Group">
                            <FormGroup>
                              <Radio
                                checked={firstRadio === 'on'}
                                label="On"
                                onChange={handleFirstChange}
                                value="on"
                              />
                              <Radio
                                checked={firstRadio === 'off'}
                                label="Off"
                                onChange={handleFirstChange}
                                value="off"
                              />
                            </FormGroup>
                          </Fieldset>
                          <Fieldset legend="Second Group">
                            <FormGroup>
                              <Radio
                                checked={secondRadio === 'on'}
                                label="On"
                                onChange={handleSecondChange}
                                value="on"
                              />
                              <Radio
                                checked={secondRadio === 'off'}
                                label="Off"
                                onChange={handleSecondChange}
                                value="off"
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
                    Radio support <Code primary>description</Code> passed as a prop, which contains
                    a text and an optional link.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [selected, setSelected] = useState('');

                      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
                        setSelected(event.target.value);

                      return (
                        <Form>
                          <FormGroup>
                            <Radio
                              checked={selected === 'on'}
                              description="Description for on"
                              label="On"
                              onChange={handleChange}
                              value="on"
                            />
                            <Radio
                              checked={selected === 'off'}
                              description="Description for off"
                              label="Off"
                              onChange={handleChange}
                              value="off"
                            />
                            <Radio
                              checked={selected === 'disabled'}
                              description={{
                                text: 'Description for disabled.',
                                link: {
                                  text: 'Learn more',
                                  target: '_blank',
                                  href: 'http://www.bigcommerce.com',
                                },
                              }}
                              disabled={true}
                              label="Disabled"
                              onChange={handleChange}
                              value="disabled"
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
          discouraged={[
            <>Don’t use radio buttons for long lists of short items. Use a select input instead.</>,
            <>
              A set of radio buttons should not have a state of being “unselected.” There must
              always be a selection.
            </>,
          ]}
          recommended={[
            <>Group related radio buttons under input headings.</>,
            <>Include a default selected option with the radio buttons.</>,
            <>Lay radio buttons vertically.</>,
          ]}
        />
      </Panel>
    </>
  );
};

export default RadioPage;
