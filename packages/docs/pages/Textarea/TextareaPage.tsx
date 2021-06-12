import { Form, FormGroup, H1, Panel, Tabs, Text, Textarea } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { TextareaPropTable } from '../../PropTables';

const TextAreaPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <TextareaPropTable>
            <Text>
              Supports all native <Code>&lt;textarea /&gt;</Code> element attributes.
            </Text>
          </TextareaPropTable>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview>
                {/* jsx-to-string:start */}
                {function Example() {
                  const [value, setValue] = useState('');

                  const handleChange = (event) => setValue(event.target.value);

                  return (
                    <Form>
                      <FormGroup>
                        <Textarea
                          label="Label"
                          description="Description for the textarea."
                          placeholder="Placeholder"
                          rows={3}
                          resize={true}
                          value={value}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Form>
                  );
                }}
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Error state">
              <Text>
                Textareas allow you to pass in an <Code primary>error</Code> message that will control the styles of an
                input. The logic on the input can be controlled with the <Code primary>onChange</Code> prop.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Form>
                  <FormGroup>
                    <Textarea
                      label="Description"
                      description="Description needs to be at least 64 characters long."
                      value="Start of some text..."
                      minLength={64}
                      error="Field needs to contain at least 64 characters."
                      onChange={() => null}
                    />
                  </FormGroup>
                </Form>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Controlling rows">
              <Text>
                By default, a <Code>Textarea</Code> displays with <Code>3</Code> rows. In order to set the intial amount
                of rows, pass in the <Code>rows</Code> prop. There can only be a maximum of <Code>7</Code> rows.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Form>
                  <FormGroup>
                    <Textarea label="Label" description="Textarea with 5 rows." placeholder="Placeholder" rows={5} />
                  </FormGroup>
                </Form>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Resizable">
              <Text>
                You can also control whether <Code>Textarea</Code> components are resizeable. Resizing is only available
                on the vertical axis.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Form>
                  <FormGroup>
                    <Textarea label="Label" placeholder="Textarea cannot be resized." resize={false} />
                  </FormGroup>
                </Form>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Textarea</H1>

      <Text>Textareas are stylized form controls with the ability of controling validation.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default TextAreaPage;
