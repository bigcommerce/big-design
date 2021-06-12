import { H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { MarginPropTable, PanelPropTable } from '../../PropTables';

const PanelPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <PanelPropTable inheritedProps={<MarginPropTable collapsible />} />;
      case 'examples':
      default:
        return (
          <Panel>
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
                  ullamco affogato shaman vexillologist quinoa post-ironic locavore. Retro selfies proident synth
                  ethical quinoa marfa chartreuse dolor vexillologist gochujang. Tempor poke unicorn, readymade crucifix
                  fugiat culpa. Kinfolk hella asymmetrical, meggings et consectetur lomo farm-to-table exercitation DIY.
                </Text>
              </Panel>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        );
    }
  };

  return (
    <>
      <H1>Panel</H1>
      <Text>The panel component is used to contain content in a structured format.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default PanelPage;
