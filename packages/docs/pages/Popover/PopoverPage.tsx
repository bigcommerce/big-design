import { Button, H1, Panel, Popover, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, PageNavigation } from '../../components';
import { BoxPropTable, PaddingPropTable, PopoverPropTable } from '../../PropTables';

const PopoverPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
          <Text>
            Popover is a component that floats around its anchor element. It's commonly used for building other
            components such as dropdowns, tooltips, combobox, etc.
          </Text>
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
      ),
    },
    {
      id: 'code',
      title: 'Code',
      render: () => (
        <PopoverPropTable
          inheritedProps={
            <>
              <BoxPropTable collapsible />
              <PaddingPropTable collapsible />
            </>
          }
        />
      ),
    },
  ];

  return (
    <>
      <H1>Popover</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default PopoverPage;
