import { Checkbox, Form, FormGroup, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment, useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import {
  CheckboxDescriptionLinkPropTable,
  CheckboxDescriptionPropTable,
  CheckboxPropTable,
} from '../PropTables';

const CheckboxPage = () => {
  return (
    <>
      <H1>Checkbox</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Checkboxes</Code> let users toggle settings on and off within a form.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Checkboxes</Code> when users can toggle one or more items in a form.
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
                    <Code primary>Checkboxes</Code> are a stylized{' '}
                    <Code>input[type="checkbox"]</Code> with controllable checked/unchecked states.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    {function Example() {
                      const [checked, setChecked] = useState(false);
                      const handleChange = () => setChecked(!checked);

                      return (
                        <Form>
                          <FormGroup>
                            <Checkbox
                              checked={checked}
                              label={checked ? 'Checked' : 'Unchecked'}
                              onChange={handleChange}
                            />
                            <Checkbox disabled={true} label="Disabled" />
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
              id: 'indeterminate',
              title: 'Indeterminate',
              render: () => (
                <Fragment key="implementation">
                  <Text>
                    <Code primary>Checkboxes</Code> support <Code primary>isIndeterminate</Code>{' '}
                    passed as a prop to show a combined state of partially selected{' '}
                    <Code primary>Checkboxes</Code>.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Checkbox isIndeterminate label="Indeterminate" />
                      </FormGroup>
                    </Form>
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
                    <Code primary>Checkboxes</Code> support <Code primary>description</Code> passed
                    as a prop, which contains a text and an optional link.
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
                              checked={checkedA}
                              description={{
                                text: 'I am a CheckboxDescription.',
                                link: {
                                  text: 'Learn more',
                                  href: 'http://www.bigcommerce.com',
                                },
                              }}
                              label="Checkbox with description and link"
                              onChange={handleChangeA}
                            />
                            <Checkbox
                              checked={checkedB}
                              description="I am a string description."
                              label="Checkbox with description"
                              onChange={handleChangeB}
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
              id: 'checkbox',
              title: 'Checkbox',
              render: () => <CheckboxPropTable />,
            },
            {
              id: 'checkbox-description',
              title: 'CheckboxDescription',
              render: () => <CheckboxDescriptionPropTable id="checkbox-description-prop-table" />,
            },
            {
              id: 'checkbox-description-link',
              title: 'CheckboxDescriptionLink',
              render: () => <CheckboxDescriptionLinkPropTable id="checkbox-description-link-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Apply changes made with the <Code primary>Checkbox</Code> right away without
              additional save action.
            </>,
          ]}
          recommended={[
            <>
              Use <Code primary>Checkboxes</Code> to turn on and off settings within a form.
            </>,
            <>
              Group related <Code primary>Checkboxes</Code> under input label (h4).
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default CheckboxPage;
