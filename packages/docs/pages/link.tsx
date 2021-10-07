import { H1, Link, Panel, Text } from '@bigcommerce/big-design';
import React from 'react';

import { CodePreview, PageNavigation } from '../components';
import { LinkPropTable, MarginPropTable } from '../PropTables';

const LinkPage = () => {
  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel>
            <Text>
              A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element
              attributes.
            </Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              <Link href="#">Link Example</Link>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
          <Panel header="External link">
            <Text>You can also include and external icon.</Text>
            <CodePreview>
              {/* jsx-to-string:start */}
              <Link href="#" target="_blank" external>
                Learn More
              </Link>
              {/* jsx-to-string:end */}
            </CodePreview>
          </Panel>
        </>
      ),
    },
    {
      id: 'props',
      title: 'Props',
      render: () => <LinkPropTable inheritedProps={<MarginPropTable collapsible />} />,
    },
  ];

  return (
    <>
      <H1>Link</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default LinkPage;
