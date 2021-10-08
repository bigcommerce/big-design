import { H1, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, List } from '../components';
import { MarginPropTable, PanelPropTable } from '../PropTables';

const PanelPage = () => {
  return (
    <>
      <H1>Panel</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          Panels allows group content within a page. Content and actions on a page that are not in the header should be
          contained in a panel.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Use seperate panels to group related content or tasks on a page.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
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
              Lorem ipsum dolor amet officia humblebrag selvage, subway tile vexillologist id pickled adaptogen fashion
              axe. Ennui meh pitchfork banh mi. Keffiyeh PBRB echo park gastropub. Pop-up neutra brunch ullamco affogato
              shaman vexillologist quinoa post-ironic locavore. Retro selfies proident synth ethical quinoa marfa
              chartreuse dolor vexillologist gochujang. Tempor poke unicorn, readymade crucifix fugiat culpa. Kinfolk
              hella asymmetrical, meggings et consectetur lomo farm-to-table exercitation DIY.
            </Text>
          </Panel>
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <PanelPropTable inheritedProps={<MarginPropTable collapsible />} renderPanel={false} />
      </Panel>
    </>
  );
};

export default PanelPage;
