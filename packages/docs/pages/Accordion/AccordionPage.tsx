import { Accordion, H0, H1, Link, Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { AccordionPropTable } from '../../PropTables';

export default () => (
  <>
    <H0>Accordion</H0>

    <Text>
      An <Code primary>Accordion</Code> component allows to show/hide a piece of data which is not relevant for users in
      a majority of use cases in order to save screen space.
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      {function Example() {
        const [title, setTitle] = React.useState('Show more');
        const handleToggle = (isOpen: boolean) => setTitle(isOpen ? 'Show less' : 'Show more');

        return (
          <>
            <Accordion title={title} onChange={handleToggle}>
              <Text>
                Ea tempor sunt amet labore proident dolor proident commodo in exercitation ea nulla sunt pariatur. Nulla
                sunt ipsum do eu consectetur exercitation occaecat labore aliqua. Aute elit occaecat esse ea fugiat
                esse. Reprehenderit sunt ea ea mollit commodo tempor amet fugiat.
              </Text>
            </Accordion>
          </>
        );
      }}
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <AccordionPropTable />
  </>
);
