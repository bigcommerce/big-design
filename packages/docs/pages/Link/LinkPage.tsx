import { H1, Link, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, CodePreview } from '../../components';
import { LinkPropTable, MarginPropTable } from '../../PropTables';

const LinkPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <LinkPropTable inheritedProps={<MarginPropTable collapsible />} />;
      case 'examples':
      default:
        return (
          <>
            <Panel>
              {' '}
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
        );
    }
  };

  return (
    <>
      <H1>Link</H1>

      <Text>
        A simple wrapper for anchor elements. Use instead of {'<a>'}. Supports all native anchor element attributes.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default LinkPage;
