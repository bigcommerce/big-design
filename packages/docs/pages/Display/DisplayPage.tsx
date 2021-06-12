import { Box, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview, NextLink } from '../../components';
import { DisplayPropTable } from '../../PropTables';

const DisplayPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <DisplayPropTable />;
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview>
                {/* jsx-to-string:start */}
                <Box display="inline-block" backgroundColor="secondary20" border="box" padding="medium">
                  Boxed content
                </Box>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Responsive breakpoints">
              <Text>
                It's also possible to use the prop with responsive{' '}
                <NextLink href="/Breakpoints/BreakpointsPage" as="/breakpoints">
                  breakpoints
                </NextLink>
                :
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <>
                  <Box
                    display={{ mobile: 'none', tablet: 'inline-block' }}
                    backgroundColor="secondary20"
                    border="box"
                    padding="medium"
                  >
                    Boxed content hidden on mobile.
                  </Box>
                  <Box
                    display={{ mobile: 'block', tablet: 'none' }}
                    backgroundColor="primary10"
                    border="box"
                    padding="medium"
                  >
                    Boxed content hidden on tablet.
                  </Box>
                </>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Display</H1>

      <Text>
        A few of our components expose a <Code primary>display</Code> prop in order to change the CSS display property.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default DisplayPage;
