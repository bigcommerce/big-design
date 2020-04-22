import { Collapse, H0, H1, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { CollapsePropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Collapse</H0>

    <Text>
      A <Code primary>Collapse</Code> component allows for showing/hiding content.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [title, setTitle] = React.useState('Show additional data');
        const handleChange = (isOpen: boolean) => setTitle(isOpen ? 'Hide additional data' : 'Show additional data');

        return (
          <>
            <Collapse title={title} onCollapseChange={handleChange} id="test">
              <Text>
                Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur. Nulla
                sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea fugiat
                esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
              </Text>
            </Collapse>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <CollapsePropTable />
  </>
);
