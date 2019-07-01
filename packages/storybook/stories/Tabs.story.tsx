import { Box, Tabs, Text } from '@bigcommerce/big-design';
import { storiesOf } from '@storybook/react';
import React from 'react';

interface State {
  activeTab: string;
}

class TabsStory extends React.PureComponent<{}, State> {
  state = {
    activeTab: 'tab1',
  };

  render() {
    const { activeTab } = this.state;

    return (
      <>
        <Tabs activeTab={activeTab} onTabClick={clickedTab => this.setState({ activeTab: clickedTab })}>
          <Tabs.Tab id="tab1">Example 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Example 2</Tabs.Tab>
          <Tabs.Tab id="tab3">Example 3</Tabs.Tab>
          <Tabs.Tab id="tab4" disabled>
            Example 4
          </Tabs.Tab>
        </Tabs>
        <Box marginTop="large">
          {activeTab === 'tab1' && <Text>Content 1</Text>}
          {activeTab === 'tab2' && <Text>Content 2</Text>}
          {activeTab === 'tab3' && <Text>Content 3</Text>}
          {activeTab === 'tab4' && <Text>Content 4</Text>}
        </Box>
      </>
    );
  }
}

storiesOf('Tabs', module).add('Overview', () => <TabsStory />);
