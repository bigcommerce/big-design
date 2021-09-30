import { Fieldset, Form, FormGroup, H1, Panel, Radio, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, PageNavigation } from '../components';
import { RadioDescriptionLinkPropTable, RadioDescriptionPropTable, RadioPropTable } from '../PropTables';

const RadioPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>Radios are group of items which a single option can be selected.</Text>
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
          </Panel>
          <Panel header="Grouping">
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
                        <Radio label="Off" checked={firstRadio === 'off'} value="off" onChange={handleFirstChange} />
                      </FormGroup>
                    </Fieldset>
                    <Fieldset legend="Second Group">
                      <FormGroup>
                        <Radio label="On" checked={secondRadio === 'on'} value="on" onChange={handleSecondChange} />
                        <Radio label="Off" checked={secondRadio === 'off'} value="off" onChange={handleSecondChange} />
                      </FormGroup>
                    </Fieldset>
                  </Form>
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="Description">
            <Text>
              Radio support <Code primary>description</Code> passed as a prop, which contains a text and an optional
              link.
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
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => (
        <>
          <RadioPropTable />
          <RadioDescriptionPropTable />
          <RadioDescriptionLinkPropTable />
        </>
      ),
    },
  ];

  return (
    <>
      <H1>Radio</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default RadioPage;
