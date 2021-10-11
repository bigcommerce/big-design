import { H1, Panel, Switch, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, List } from '../components';
import { SwitchPropTable } from '../PropTables';

const SwitchPage = () => {
  return (
    <>
      <H1>Switch</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          A <Code primary>Switch</Code> is an input that toggles a feature or setting on or off - the states must be
          mutually exclusive.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            <Code primary>Switch</Code>'s toggle between an “on” and an “off” state; one must always be selected.
          </List.Item>
          <List.Item>
            A <Code primary>Switch</Code>'s impact should be immediate. Therefore it is not appropriate to use a{' '}
            <Code primary>Switch</Code> in a form.
          </List.Item>
          <List.Item>
            <Code primary>Switch</Code>'s should be used if each item in a list or set can be individually controlled.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Text>
          <Code primary>Switch</Code>'s are a stylized <Code>input[type="checkbox"]</Code> with controllable
          checked/unchecked states.
        </Text>
        <CodePreview>
          {/* jsx-to-string:start */}
          {function Example() {
            const [checked, setChecked] = useState(false);
            const handleChange = () => setChecked(!checked);

            return <Switch checked={checked} onChange={handleChange} />;
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <SwitchPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default SwitchPage;
