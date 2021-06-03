import { Fieldset, Form, FormGroup, H1, H3, Link, Radio, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { RadioDescriptionLinkPropTable, RadioDescriptionPropTable, RadioPropTable } from '../../PropTables';

const RadioPage = () => (
  <>
    <H1>Radio</H1>

    <Text>
      Radios are single-selectable form control groups.{' '}
      <Link href="https://design.bigcommerce.com/components/radio-buttons" target="_blank">
        Radio Design Guidelines
      </Link>
      .
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

    <H3>API</H3>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <RadioPropTable />
    <RadioDescriptionPropTable />
    <RadioDescriptionLinkPropTable />

    <H3>Grouping</H3>

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

    <H3>Description</H3>

    <Text>
      Radio support <Code primary>description</Code> passed as a prop, which contains a text and an optional link.
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
  </>
);

export default RadioPage;
