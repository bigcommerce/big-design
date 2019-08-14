import { Form, H0, H1, H2, Link, Radio, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { RadioPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Radio</H0>

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
        const [selected, setSelected] = React.useState('');

        const handleChange = event => setSelected(event.target.value);

        return (
          <Form>
            <Form.Group>
              <Radio label="On" checked={selected === 'on'} value="on" onChange={handleChange} />
              <Radio label="Off" checked={selected === 'off'} value="off" onChange={handleChange} />
            </Form.Group>
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
              <Form.Group>
                <Radio label="On" checked={firstRadio === 'on'} value="on" onChange={handleFirstChange} />
                <Radio label="Off" checked={firstRadio === 'off'} value="off" onChange={handleFirstChange} />
              </Form.Group>
            </Form.Fieldset>
            <Form.Fieldset legend="Second Group">
              <Form.Group>
                <Radio label="On" checked={secondRadio === 'on'} value="on" onChange={handleSecondChange} />
                <Radio label="Off" checked={secondRadio === 'off'} value="off" onChange={handleSecondChange} />
              </Form.Group>
            </Form.Fieldset>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
