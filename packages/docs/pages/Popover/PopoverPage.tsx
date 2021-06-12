import { Button, H1, Panel, Popover, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext, useState } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { BoxPropTable, PaddingPropTable, PopoverPropTable } from '../../PropTables';

const PopoverPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <PopoverPropTable
            inheritedProps={
              <>
                <BoxPropTable collapsible />
                <PaddingPropTable collapsible />
              </>
            }
          />
        );
      case 'examples':
      default:
        return (
          <Panel>
            <CodePreview>
              {/* jsx-to-string:start */}
              {function Example() {
                const [isOpen, setIsOpen] = useState(false);
                const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

                return (
                  <>
                    <Button ref={setButtonRef} onClick={() => setIsOpen(true)}>
                      Open Popover
                    </Button>
                    <Popover
                      anchorElement={buttonRef}
                      isOpen={isOpen}
                      label="Example Popover"
                      onClose={() => setIsOpen(false)}
                    >
                      <Text>This is the popover content!</Text>
                    </Popover>
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
      <H1>Popover</H1>

      <Text>
        Popover is a component that floats around its anchor element. It's commonly used for building other components
        such as dropdowns, tooltips, combobox, etc.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default PopoverPage;
