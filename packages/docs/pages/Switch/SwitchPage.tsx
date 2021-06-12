import { H1, Panel, Switch, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { SwitchPropTable } from '../../PropTables';

const SwitchPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <SwitchPropTable />;
      case 'examples':
      default:
        return (
          <Panel>
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const [checked, setChecked] = useState(false);
                const handleChange = () => setChecked(!checked);

                return <Switch checked={checked} onChange={handleChange} />;
              }}
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        );
    }
  };

  return (
    <>
      <H1>Switch</H1>

      <Text>
        Switches are intended for toggling actions that have an immediate effect and don't require saving. Therefore it
        is not appropriate to use a Switch in a form.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default SwitchPage;
