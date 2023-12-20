import { H1, Panel, Text, Toggle } from '@bigcommerce/big-design';
import { VisibilityIcon, VisibilityOffIcon } from '@bigcommerce/big-design-icons';
import React, { useState } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { ToggleItemPropTable, TogglePropTable } from '../PropTables';

const TabsPage = () => {
  return (
    <>
      <H1>Toggle</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Toggle</Code> buttons allow users to switch between alternative states or
          modes of the same entity. Only one state is shown at a time.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            In forms to let users switch between different options of the setting with dependent
            subsettings.
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
                    const [activeTab, setActiveTab] = useState('product');

                    const items = [
                      { value: 'none', label: 'None' },
                      { value: 'product', label: 'Product' },
                      { value: 'variant', label: 'Variant' },
                    ];

                    return (
                      <Toggle
                        id="toggle-example"
                        items={items}
                        label="Inventory tracking"
                        onChange={setActiveTab}
                        value={activeTab}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'icons',
              title: 'Icons',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  {function Example() {
                    const [activeTab, setActiveTab] = useState('invisible');

                    const items = [
                      {
                        icon: <VisibilityIcon aria-label="Visible icon example" />,
                        value: 'visible',
                      },
                      {
                        icon: <VisibilityOffIcon aria-label="Visible off icon example" />,
                        value: 'invisible',
                      },
                    ];

                    return (
                      <Toggle
                        id="toggle-example"
                        items={items}
                        onChange={setActiveTab}
                        value={activeTab}
                      />
                    );
                  }}
                  {/* jsx-to-string:end */}
                </CodePreview>
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
              id: 'toggle',
              title: 'Toggle',
              render: () => <TogglePropTable />,
            },
            {
              id: 'toggle-item',
              title: 'ToggleItem',
              render: () => <ToggleItemPropTable id="toggle-item-prop-table" />,
            },
          ]}
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            'Use as tabs ',
            'Use as filters',
            'Add two lines of content',
            'Use icons that don’t clearly convey the options they represent',
            'Use icon with text',
          ]}
          recommended={['Stratch to fit toolbar width', 'Use option names of similar length']}
        />
      </Panel>
    </>
  );
};

export default TabsPage;
