import { Button, H0, H1, H2, Popover, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview } from '../../components';
import { BoxPropTable, PaddingPropTable, PopoverPropTable } from '../../PropTables';

const PopoverPage = () => (
  <>
    <H0>Popover</H0>

    <Text>
      Popover is a component that floats around its anchor element. It's commonly used for building other components
      such as dropdowns, tooltips, combobox, etc.
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
            <Popover anchorElement={buttonRef} isOpen={isOpen} label="Example Popover" onClose={() => setIsOpen(false)}>
              <Text>This is the popover content!</Text>
            </Popover>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <PopoverPropTable />

    <H2>Inherited Props</H2>
    <BoxPropTable collapsible />
    <PaddingPropTable collapsible />
  </>
);

export default PopoverPage;
