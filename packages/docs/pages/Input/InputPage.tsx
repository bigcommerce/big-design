import { Form, FormGroup, H1, Input, Panel, Tabs, Text } from '@bigcommerce/big-design';
import { CheckCircleIcon } from '@bigcommerce/big-design-icons';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import { InputPropTable } from '../../PropTables';

const InputPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <InputPropTable>
            <Text>
              Supports all native <Code>&lt;input /&gt;</Code> element attributes.
            </Text>
          </InputPropTable>
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
                        <Input
                          label="Label"
                          description="Description for the input."
                          placeholder="Placeholder"
                          type="text"
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
            <Panel header="Error states">
              <Text>
                Inputs allow you to pass in an <Code primary>error</Code> message that will control the styles of an
                input. The logic on the input can be controlled with the <Code primary>onChange</Code> prop.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Form>
                  <FormGroup>
                    <Input
                      label="Email Address"
                      description="Provide a valid email address."
                      value="example@"
                      error="Email address must contain a domain name."
                      onChange={() => null}
                    />
                  </FormGroup>
                </Form>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>

            <Panel header="Icons">
              <Text>
                Inputs can also contain icons via the <Code>iconLeft</Code> &amp; <Code>iconRight</Code> props.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Form>
                  <FormGroup>
                    <Input label="Example" placeholder="Example" iconLeft={<CheckCircleIcon color="success" />} />
                    <Input label="Example" placeholder="Example" iconRight={<CheckCircleIcon color="success" />} />
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
      <H1>Input</H1>

      <Text>Inputs are stylized form controls with the ability of controling validation.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default InputPage;
