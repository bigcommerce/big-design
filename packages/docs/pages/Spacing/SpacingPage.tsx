import { Box, Button, Flex, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ActiveTabContext, CodePreview, NextLink } from '../../components';

const BlueBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  display: 'inline-block',
  height: theme.spacing.large,
  width: theme.spacing.large,
}));

const StyledText = styled(Text)`
  padding: 0;
  margin: 0;
`;

const SpacingPage = () => {
  const { spacing } = useContext(ThemeContext);
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  const tabItems = [
    { id: 'examples', title: 'Examples' },
    { id: 'code', title: 'Code' },
  ];

  const renderTabs = () => {
    switch (activeTab) {
      case 'code':
        return (
          <>
            <Panel header="Spacing values">
              <Flex justifyContent="space-around">
                {Object.keys(spacing)
                  .reverse()
                  .map((key) => (
                    <Flex alignItems="center" key={key} flexDirection="column" paddingBottom="small">
                      <StyledText>{key}</StyledText>
                      <BlueBox marginTop="medium" style={{ width: spacing[key], height: spacing[key] }} />
                    </Flex>
                  ))}
              </Flex>
            </Panel>
          </>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel header="Applying to a property">
              <Text>
                Spacing can be used directly on certain properties that expect a size value, like{' '}
                <NextLink href="/Margin/MarginPage" as="/margin">
                  Margin
                </NextLink>{' '}
                and{' '}
                <NextLink href="/Padding/PaddingPage" as="/padding">
                  Padding
                </NextLink>
                .
              </Text>
              <CodePreview>
                {/* jsx-to-string:start */}
                <>
                  <Button marginRight="medium">Button</Button>
                  <Button>Button</Button>
                </>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Applying to a style">
              <Text>You can also use spacing directly from the theme to style other components, for example:</Text>

              <CodePreview>
                {/* jsx-to-string:start */}
                {function Example() {
                  const StyledBox = styled(Box)(({ theme }) => ({
                    backgroundColor: theme.colors.primary,
                    height: theme.spacing.large,
                    width: theme.spacing.large,
                  }));

                  return <StyledBox />;
                }}
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Spacing</H1>
      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default SpacingPage;
