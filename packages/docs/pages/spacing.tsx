import { Box, Button, Flex, H1, Panel, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { CodePreview, NextLink, PageNavigation } from '../components';

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

  const items = [
    {
      id: 'examples',
      title: 'Examples',
      render: () => (
        <>
          <Panel header="Applying to a property">
            <Text>
              Spacing can be used directly on certain properties that expect a size value, like{' '}
              <NextLink href="/margin">Margin</NextLink> and <NextLink href="/padding">Padding</NextLink>.
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
      ),
    },
    {
      id: 'spacing',
      title: 'Spacing values',
      render: () => (
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
      ),
    },
  ];

  return (
    <>
      <H1>Spacing</H1>

      <PageNavigation items={items} />
    </>
  );
};

export default SpacingPage;
