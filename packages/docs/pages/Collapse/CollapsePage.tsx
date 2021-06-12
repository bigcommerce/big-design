import { Collapse, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { CollapsePropTable } from '../../PropTables';

export default () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <CollapsePropTable />;
      case 'examples':
      default:
        return (
          <Panel>
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const [title, setTitle] = useState('Show more');
                const handleChange = (isOpen: boolean) => setTitle(isOpen ? 'Show less' : 'Show more');

                return (
                  <>
                    <Collapse title={title} onCollapseChange={handleChange}>
                      <Text>
                        Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt
                        pariatur. Nulla sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit
                        occaecat esse ea fugiat esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
                      </Text>
                    </Collapse>
                  </>
                );
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        );
    }
  };

  return (
    <>
      <H1>Collapse</H1>
      <Text>Allows for showing/hiding content.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};
