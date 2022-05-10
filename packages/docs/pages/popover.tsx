import { Button, H1, Panel, Popover, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { BoxPropTable, PaddingPropTable, PopoverPropTable } from '../PropTables';

const PopoverPage = () => {
  return (
    <>
      <H1>Popover</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Popover</Code> is a component that floats around its anchor element. It's commonly used for
          building other components such as dropdowns, tooltips, combobox, etc.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>Wanting to show additional content or information.</List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <>
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
        </>
      </Panel>

      <Panel header="Props" headerId="props">
        <PopoverPropTable
          inheritedProps={
            <>
              <BoxPropTable collapsible />
              <PaddingPropTable collapsible />
            </>
          }
        />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={['Tie popup to click or hover events on elements.', 'Use concise textual phrases.']}
          discouraged={['Always display the popover.']}
        />
      </Panel>
    </>
  );
};

export default PopoverPage;
