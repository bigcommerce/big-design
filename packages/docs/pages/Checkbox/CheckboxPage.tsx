import { Checkbox, Form, FormGroup, H1, H3, Link, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview } from '../../components';
import { CheckboxDescriptionLinkPropTable, CheckboxDescriptionPropTable, CheckboxPropTable } from '../../PropTables';

const CheckboxPage = () => (
  <>
    <H1>Checkbox</H1>

    <Text>
      Checkboxes are a stylized <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states.{' '}
      <Link href="https://design.bigcommerce.com/components/checkboxes" target="_blank">
        Checkbox Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Form>
            <FormGroup>
              <Checkbox label={checked ? 'Checked' : 'Unchecked'} checked={checked} onChange={handleChange} />
              <Checkbox label="Disabled" disabled={true} />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>API</H3>

    <CheckboxPropTable />
    <CheckboxDescriptionPropTable />
    <CheckboxDescriptionLinkPropTable />

    <H3>Indeterminate</H3>

    <Text>
      Checkboxes support <Code primary>isIndeterminate</Code> passed as a prop to show a combined state of partially
      selected checkboxes.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <Checkbox label="Indeterminate" isIndeterminate />
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H3>Description</H3>

    <Text>
      Checkboxes support <Code primary>description</Code> passed as a prop, which contains a text and an optional link.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checkedA, setChangeA] = useState(false);
        const [checkedB, setChangeB] = useState(false);
        const handleChangeA = () => setChangeA(!checkedA);
        const handleChangeB = () => setChangeB(!checkedB);

        return (
          <Form>
            <FormGroup>
              <Checkbox
                onChange={handleChangeA}
                checked={checkedA}
                label="Checkbox with description and link"
                description={{
                  text: 'I am a CheckboxDescription.',
                  link: {
                    text: 'Learn more',
                    href: 'http://www.bigcommerce.com',
                  },
                }}
              />
              <Checkbox
                onChange={handleChangeB}
                checked={checkedB}
                label="Checkbox with description"
                description="I am a string description."
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default CheckboxPage;
