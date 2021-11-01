import { Form, FormGroup, H1, Panel, Text, Textarea } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { TextareaPropTable } from '../PropTables';

const TextAreaPage = () => {
  return (
    <>
      <H1>Textarea</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Textareas</Code> are text inputs that can be expanded to fit multi-line text content from users.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            <Code primary>Textareas</Code> are useful when users need to create multi-sentence or paragraph length
            content - e.g. product decriptions or messages.
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
              ),
            },
            {
              id: 'error-state',
              title: 'Error state',
              render: () => (
                <>
                  <Text>
                    <Code primary>Textareas</Code> allow you to pass in an <Code primary>error</Code> message that will
                    control the styles of an input. The logic on the input can be controlled with the{' '}
                    <Code primary>onChange</Code> prop.
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
                </>
              ),
            },
            {
              id: 'controlling-rows',
              title: 'Controlling rows',
              render: () => (
                <>
                  <Text>
                    By default, a <Code primary>Textarea</Code> displays with <Code>3</Code> rows. In order to set the
                    intial amount of rows, pass in the <Code>rows</Code> prop. There can only be a maximum of{' '}
                    <Code>7</Code> rows.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Form>
                      <FormGroup>
                        <Textarea
                          label="Label"
                          description="Textarea with 5 rows."
                          placeholder="Placeholder"
                          rows={5}
                        />
                      </FormGroup>
                    </Form>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'resizable',
              title: 'Resizable',
              render: () => (
                <>
                  <Text>
                    You can also control whether <Code primary>Textarea</Code> components are resizeable. Resizing is
                    only available on the vertical axis.
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
                </>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <TextareaPropTable renderPanel={false} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            <>
              Use the default size of the <Code primary>Textarea</Code> to set expectations of the size of user input -
              e.g. a paragraph or single sentence.
            </>,
          ]}
          discouraged={[
            <>
              Don’t use <Code primary>Textareas</Code> when a single line text input is fine (e.g. a line for an
              address).
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default TextAreaPage;
