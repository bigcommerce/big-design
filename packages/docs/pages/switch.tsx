import { H1, Panel, Switch, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
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
            <Code primary>Switches</Code> toggle between an “on” and an “off” state; one must always be selected.
          </List.Item>
          <List.Item>
            A <Code primary>Switch</Code>'s impact should be immediate. Therefore it is not appropriate to use a{' '}
            <Code primary>Switch</Code> in a form.
          </List.Item>
          <List.Item>
            <Code primary>Switches</Code> should be used if each item in a list or set can be individually controlled.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Text>
          <Code primary>Switches</Code> are a stylized <Code>input[type="checkbox"]</Code> with controllable
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

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Place the <Code primary>Switch</Code> in the same row as the label for the setting it controls, to the
              left of the switch.
            </>,
            <>
              If the <Code primary>Switch</Code> appears in a table, label the control at the header of the column with
              1-3 words.
            </>,
            <>
              When a user toggles a <Code primary>Switch</Code>, the action should take effect immediately.
            </>,
            <>
              Label the <Code primary>Switch</Code> using non-neutral adjectives or nouns (e.g., “visibility”), not
              verbs (e.g., “show product”).
            </>,
            <>
              Labels should clearly indicate the state of the <Code primary>Switch</Code> (i.e., on or off) so the user
              knows what to expect when the <Code primary>Switch</Code> is toggled. Let users know about any non-obvious
              and/or important consequences of toggling the <Code primary>Switch</Code>.
            </>,
            'Label should be static.',
          ]}
          discouraged={[
            <>
              Don’t include the text "on" and "off" next to the <Code primary>Switch</Code>. The{' '}
              <Code primary>Switch</Code> alone should be sufficient to indicate status.
            </>,
            <>
              Don’t use <Code primary>Switches</Code> for actions that do not have immediate effect, or those that
              require a Save or Confirm button. A single checkbox or radio buttons are better suited for these
              instances.
            </>,
            <>
              Don’t use <Code primary>Switches</Code> for settings that have ambiguous options.{' '}
              <Code primary>Switches</Code> should be used to toggle between “on” and “off.”
            </>,
            <>Don’t use radio buttons, checkboxes, or other methods to indicate a setting is “on” or “off.”</>,
            <>
              Don’t flip the <Code primary>Switch</Code> upside down; “on” should always be to the right.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default SwitchPage;
