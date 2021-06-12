import { Box, Flex, FlexItem, H1, Panel, Tabs, Text } from '@bigcommerce/big-design';
import React, { useContext } from 'react';

import { ActiveTabContext, Code, CodePreview } from '../../components';
import {
  BoxPropTable,
  DisplayPropTable,
  FlexItemPropTable,
  FlexPropTable,
  MarginPropTable,
  PaddingPropTable,
} from '../../PropTables';

const ExampleBox: React.FC<{ vertical?: boolean }> = ({ children, vertical }) => (
  <Box
    backgroundColor="secondary20"
    border="box"
    marginVertical={vertical ? 'xSmall' : 'none'}
    marginHorizontal={vertical ? 'none' : 'xSmall'}
    padding="small"
  >
    {children}
  </Box>
);

const FlexPage = () => {
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
            <FlexPropTable
              inheritedProps={
                <>
                  <BoxPropTable collapsible />
                  <DisplayPropTable collapsible />
                  <MarginPropTable collapsible />
                  <PaddingPropTable collapsible />
                </>
              }
            />
            <FlexItemPropTable
              inheritedProps={
                <>
                  <BoxPropTable collapsible />
                  <DisplayPropTable collapsible />
                  <MarginPropTable collapsible />
                  <PaddingPropTable collapsible />
                </>
              }
            />
          </>
        );
      case 'examples':
      default:
        return (
          <>
            <Panel>
              <CodePreview scope={{ ExampleBox }}>
                {/* jsx-to-string:start */}
                <Flex
                  alignContent="stretch"
                  alignItems="stretch"
                  flexDirection="row"
                  justifyContent="flex-start"
                  flexWrap="nowrap"
                >
                  <FlexItem alignSelf="auto" flexBasis="auto" flexGrow={0} flexOrder={0} flexShrink={1}>
                    <ExampleBox>Item 1</ExampleBox>
                  </FlexItem>
                  <FlexItem alignSelf="auto" flexBasis="auto" flexGrow={0} flexOrder={0} flexShrink={1}>
                    <ExampleBox>Item 2</ExampleBox>
                  </FlexItem>
                  <FlexItem alignSelf="auto" flexBasis="auto" flexGrow={0} flexOrder={0} flexShrink={1}>
                    <ExampleBox>Item 3</ExampleBox>
                  </FlexItem>
                  <FlexItem alignSelf="auto" flexBasis="auto" flexGrow={0} flexOrder={0} flexShrink={1}>
                    <ExampleBox>Item 4</ExampleBox>
                  </FlexItem>
                </Flex>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Justify content">
              <Text>
                Flex container's can space their element with uniform spacing in-between each flex item using the{' '}
                <Code primary>justifyContent</Code> prop.
              </Text>

              <CodePreview scope={{ ExampleBox }}>
                {/* jsx-to-string:start */}
                <Flex justifyContent="space-between">
                  <FlexItem>
                    <ExampleBox>Item 1</ExampleBox>
                  </FlexItem>
                  <FlexItem>
                    <ExampleBox>Item 2</ExampleBox>
                  </FlexItem>
                  <FlexItem>
                    <ExampleBox>Item 3</ExampleBox>
                  </FlexItem>
                  <FlexItem>
                    <ExampleBox>Item 4</ExampleBox>
                  </FlexItem>
                </Flex>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Column layout">
              <Text>
                One way of creating a column based layout is using a combination of the <Code primary>flexWrap</Code>{' '}
                prop on the flex container with an additional <Code primary>flexBasis</Code> prop on the flex items.
              </Text>

              <CodePreview scope={{ ExampleBox }}>
                {/* jsx-to-string:start */}
                <Flex flexWrap="wrap">
                  <FlexItem flexBasis="100%">
                    <ExampleBox vertical>Item 1</ExampleBox>
                  </FlexItem>
                  <FlexItem flexBasis="100%">
                    <ExampleBox vertical>Item 2</ExampleBox>
                  </FlexItem>
                  <FlexItem flexBasis="100%">
                    <ExampleBox vertical>Item 3</ExampleBox>
                  </FlexItem>
                  <FlexItem flexBasis="100%">
                    <ExampleBox vertical>Item 4</ExampleBox>
                  </FlexItem>
                </Flex>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
            <Panel header="Sort content">
              <Text>
                Using the <Code primary>flexOrder</Code> prop you can reorganize content based on the size generated by
                setting the <Code primary>flexGrow</Code> prop. <Code primary>flexGrow</Code> allows the flex items to
                grow relative to the flex container's width.
              </Text>

              <CodePreview scope={{ ExampleBox }}>
                {/* jsx-to-string:start */}
                <Flex>
                  <FlexItem flexGrow={2} flexOrder={2}>
                    <ExampleBox>Item 1</ExampleBox>
                  </FlexItem>
                  <FlexItem flexOrder={4}>
                    <ExampleBox>Item 2</ExampleBox>
                  </FlexItem>
                  <FlexItem flexGrow={4} flexOrder={1}>
                    <ExampleBox>Item 3</ExampleBox>
                  </FlexItem>
                  <FlexItem flexGrow={1} flexOrder={3}>
                    <ExampleBox>Item 4</ExampleBox>
                  </FlexItem>
                </Flex>
                {/* jsx-to-string:end */}
              </CodePreview>
            </Panel>
          </>
        );
    }
  };

  return (
    <>
      <H1>Flex</H1>

      <Text>A flex container used for customizable layouts.</Text>

      <Tabs activeTab={activeTab} items={tabItems} onTabClick={setActiveTab} />

      {renderTabs()}
    </>
  );
};

export default FlexPage;
