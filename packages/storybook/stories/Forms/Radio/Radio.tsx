import { Form, H0, H1, H2, Link, Radio, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../../components';

import { RadioPropTable } from './index';

export const RadioStory: React.FC = () => (
  <>
    <H0>Radio</H0>

    <Text>
      Radios are single-selectable form control groups.{' '}
      <Link href="https://bigcommerce.design/fields" target="_blank">
        Form Fields Design Guidelines
      </Link>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [selected, setSelected] = React.useState('');

        const handleChange = event => setSelected(event.target.value);

        return (
          <Form>
            <Form.Row>
              <Radio label="On" checked={selected === 'on'} value="on" onChange={handleChange} />
            </Form.Row>
            <Form.Row>
              <Radio label="Off" checked={selected === 'off'} value="off" onChange={handleChange} />
            </Form.Row>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Radio</H2>

    <Text>
      Supports all native <Code>&lt;input /&gt;</Code> element attributes.
    </Text>

    <RadioPropTable />

    <H1>Grouping</H1>

    <Text>
      In order to group radio controls, use the <Code>Form.Fieldset</Code> component to separate the controls.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [firstRadio, setFirstRadio] = React.useState('');
        const [secondRadio, setSecondRadio] = React.useState('');

        const handleFirstChange = event => setFirstRadio(event.target.value);
        const handleSecondChange = event => setSecondRadio(event.target.value);

        return (
          <Form>
            <Form.Fieldset legend="First Group">
              <Form.Row>
                <Radio label="On" checked={firstRadio === 'on'} value="on" onChange={handleFirstChange} />
              </Form.Row>
              <Form.Row>
                <Radio label="Off" checked={firstRadio === 'off'} value="off" onChange={handleFirstChange} />
              </Form.Row>
            </Form.Fieldset>
            <Form.Fieldset legend="Second Group">
              <Form.Row>
                <Radio label="On" checked={secondRadio === 'on'} value="on" onChange={handleSecondChange} />
              </Form.Row>
              <Form.Row>
                <Radio label="Off" checked={secondRadio === 'off'} value="off" onChange={handleSecondChange} />
              </Form.Row>
            </Form.Fieldset>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
