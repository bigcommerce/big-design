import { Collapse, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useState } from 'react';

import { CodePreview, PageNavigation } from '../components';
import { CollapsePropTable } from '../PropTables';

const CollapsePage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <Panel>
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
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <CollapsePropTable />,
    },
  ];

  return (
    <>
      <H1>Collapse</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default CollapsePage;
