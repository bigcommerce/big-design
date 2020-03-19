import { Checkbox, Form, FormGroup, H0, H1, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { CheckboxDescriptionLinkPropTable, CheckboxDescriptionPropTable, CheckboxPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Checkbox</H0>

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
        const [checked, setChecked] = React.useState(false);
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

    <H1>API</H1>

    <CheckboxPropTable />
    <CheckboxDescriptionPropTable />
    <CheckboxDescriptionLinkPropTable />

    <H1>Indeterminate</H1>

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

    <H1>Description</H1>

    <Text>
      Checkboxes support <Code primary>description</Code> passed as a prop, which contains a text and an optional link.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [checked, setChecked] = React.useState(false);
        const handleChange = () => setChecked(!checked);

        return (
          <Form>
            <FormGroup>
              <Checkbox
                onChange={handleChange}
                checked={checked}
                label="Checkbox with description"
                description={{
                  text: 'Descriptive text.',
                  link: {
                    text: 'Learn more',
                    href: 'http://www.bigcommerce.com',
                  },
                }}
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
