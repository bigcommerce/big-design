import { Form, FormGroup, H0, H2, Link, NewSelect, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';

const NewSelectPage = () => (
  <>
    <H0>Selects</H0>

    <Text>
      Select are typeable inputs with selectable dropdown items.{' '}
      <Link href="https://design.bigcommerce.com/components/selects" target="_blank">
        Selects Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        return (
          <Form>
            <FormGroup>
              <NewSelect
                filterable={true}
                label="Countries"
                maxHeight={300}
                options={[
                  { value: 'us', content: 'United States' },
                  { value: 'mx', content: 'Mexico' },
                  { value: 'ca', content: 'Canada' },
                  { value: 'en', content: 'England' },
                  { value: 'fr', content: 'France' },
                  { value: 'gr', content: 'Germany' },
                  { value: 'ar', content: 'Argentina' },
                  { value: 'ru', content: 'Russia', disabled: true },
                  { value: 'ch', content: 'Chile' },
                  { value: 'bo', content: 'Bolivia' },
                  { value: 'jp', content: 'Japan' },
                  { value: 'cn', content: 'China' },
                  { value: 'sk', content: 'South Korea' },
                  { value: 'au', content: 'Australia' },
                  { value: 'ug', content: 'Uganda' },
                ]}
                placeholder={'Choose country'}
                required
              />
            </FormGroup>
          </Form>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H2>Select Groups</H2>

    <Text>
      It is possible to create grouped options with labels with a <Code primary>Select Group</Code> by passing{' '}
      <Code primary>label</Code> and <Code primary>options</Code> to the top-level <Code primary>options</Code>{' '}
      property.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Form>
        <FormGroup>
          <NewSelect
            label="My Options"
            filterable
            maxHeight={300}
            options={[
              {
                label: 'Group 1',
                options: [
                  { value: 'mx', content: 'Mexico' },
                  { value: 'ca', content: 'Canada' },
                  { value: 'en', content: 'England' },
                ],
              },
              {
                label: 'Group 2',
                options: [
                  { value: 'fr', content: 'France' },
                  { value: 'gr', content: 'Germany' },
                  { value: 'ar', content: 'Argentina' },
                ],
              },
            ]}
            placeholder={'Choose country'}
            required
          />
        </FormGroup>
      </Form>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);

export default NewSelectPage;
