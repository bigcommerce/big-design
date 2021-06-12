import { Box, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, CodePreview, NextLink } from '../../components';
import { PaddingPropTable } from '../../PropTables';

const PaddingPage = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return <PaddingPropTable />;
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview>
                {/* jsx-to-string:start */}
                <Box padding="medium" backgroundColor="secondary20">
                  Example
                </Box>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Responsive breakpoints">
              <Text>
                You can also specify paddings with an object to handle different paddings with different{' '}
                <NextLink href="/Breakpoints/BreakpointsPage" as="/breakpoints">
                  breakpoints
                </NextLink>
                . All values must be of{' '}
                <NextLink href="/Spacing/SpacingPage" as="/spacing">
                  Spacing
                </NextLink>{' '}
                type.
              </Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                <Box padding={{ mobile: 'none', tablet: 'medium', desktop: 'xLarge' }} backgroundColor="secondary20">
                  Example
                </Box>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Padding</H1>

      <Text>
        Some of our components expose a simple way to modify their padding. The following example showcases the simples
        way to use the padding prop by giving it a{' '}
        <NextLink href="/Spacing/SpacingPage" as="/spacing">
          Spacing
        </NextLink>{' '}
        value.
      </Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default PaddingPage;
