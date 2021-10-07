import { Collapse, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, List } from '../components';
import { CollapsePropTable } from '../PropTables';

const CollapsePage = () => {
  return (
    <>
      <H1>Collapse</H1>

      <Panel header="Overview" headerId="overview">
        <Text>The collapse component can hide/reveal content within a panel.</Text>
        <Text bold>When to use it:</Text>
        <List>
          <List.Item>
            Use collapse to reduce clutter, hiding non-essential information or options on a panel or modal.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <Text>Allows for showing/hiding content.</Text>

        <CodePreview>
          {/* jsx-to-string:start */}
          {function Example() {
            const [title, setTitle] = useState('Show more');
            const handleChange = (isOpen: boolean) => setTitle(isOpen ? 'Show less' : 'Show more');

            return (
              <>
                <Collapse title={title} onCollapseChange={handleChange}>
                  <Text>
                    Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur.
                    Nulla sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea
                    fugiat esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
                  </Text>
                </Collapse>
              </>
            );
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <CollapsePropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default CollapsePage;
