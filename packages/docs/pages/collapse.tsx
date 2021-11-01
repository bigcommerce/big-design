import { Collapse, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { CollapsePropTable } from '../PropTables';

const CollapsePage = () => {
  return (
    <>
      <H1>Collapse</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The <Code primary>Collapse</Code> component can hide/reveal content within a panel.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            Use <Code primary>Collapse</Code> to reduce clutter, hiding non-essential information or options on a panel
            or modal.
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

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          recommended={[
            'Users should be able tell what’s beneath the collapse button without having to open it - make sure the label is specific and helpful!',
            'Collapse buttons should read like actions, and start with the word “Show”.',
            'Collapsed content should be lower priority information that users don’t always need to see.',
            'Left align directly under the content that is collapsed.',
            'Position the collapsible content immediately after the collapse button.',
            'Chevron arrow should flip vertically when component is toggled, to indicate the state of showing/hiding the content.',
          ]}
          discouraged={[
            <>
              Do not use <Code primary>Collapse</Code> to hide elements necessary to complete a form - only
              optional/extra content.
            </>,
            <>
              Do not move <Code primary>Collapse</Code> component after click; instead, show the new content directly
              below the component and let the component remain stationary.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default CollapsePage;
