import { H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, PageNavigation } from '../../components';
import { MarginPropTable, PanelPropTable } from '../../PropTables';

const PanelPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
          <Text>The panel component is used to contain content in a structured format.</Text>
          <CodePreview>
            {/* jsx-to-string:start */}
            <Panel
              header="Panel header"
              action={{
                variant: 'secondary',
                text: 'Button',
                onClick: () => {
                  // Do some action
                },
              }}
            >
              <Text>
                Lorem ipsum dolor amet officia humblebrag selvage, subway tile vexillologist id pickled adaptogen
                fashion axe. Ennui meh pitchfork banh mi. Keffiyeh PBRB echo park gastropub. Pop-up neutra brunch
                ullamco affogato shaman vexillologist quinoa post-ironic locavore. Retro selfies proident synth ethical
                quinoa marfa chartreuse dolor vexillologist gochujang. Tempor poke unicorn, readymade crucifix fugiat
                culpa. Kinfolk hella asymmetrical, meggings et consectetur lomo farm-to-table exercitation DIY.
              </Text>
            </Panel>
            {/* jsx-to-string:end */}
          </CodePreview>
        </Panel>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <PanelPropTable inheritedProps={<MarginPropTable collapsible />} />,
    },
  ];

  return (
    <>
      <H1>Panel</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default PanelPage;
