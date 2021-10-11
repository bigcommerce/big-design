import { Box, Button, Flex, Grid, H1, Panel, Text, Tooltip } from '@bigcommerce/big-design';
import { WarningIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview, ContentRoutingTabs, List } from '../components';
import { TooltipPropTable } from '../PropTables';

const TooltipPage = () => {
  return (
    <>
      <H1>Tooltip</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Tooltip</Code>s contain information to help users understand actions or page elements.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            They are short, and triggered by a user hovering with their keyboard or mouse over a UI element.
          </List.Item>
          <List.Item>They are used to help reduce information density on otherwise crowded pages or forms.</List.Item>
          <List.Item>
            Use tooltips to explain columns in a table, explain buttons (e.g. add, edit) on page or alongisde a help
            icon.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <ContentRoutingTabs
          id="implementation"
          routes={[
            {
              id: 'basic',
              title: 'Basic',
              render: () => (
                <CodePreview>
                  {/* jsx-to-string:start */}
                  <Tooltip trigger={<Button>Hover</Button>} placement="right">
                    Tooltip Content
                  </Tooltip>
                  {/* jsx-to-string:end */}
                </CodePreview>
              ),
            },
            {
              id: 'anchor',
              title: 'Anchor',
              render: () => (
                <>
                  <Text>
                    Tooltips can wrap any <Code>Element</Code>. Tooltip will show on hover.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Flex alignItems="center">
                      <Box marginRight="medium">
                        <Tooltip trigger={<Button>Button</Button>} placement="right">
                          Tooltip Content
                        </Tooltip>
                      </Box>

                      <Box marginRight="medium">
                        <Tooltip trigger={<WarningIcon />} placement="right">
                          Tooltip Content
                        </Tooltip>
                      </Box>
                      <Box marginRight="medium">
                        <Tooltip trigger={<span>Span</span>} placement="right">
                          Tooltip Content
                        </Tooltip>
                      </Box>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
            {
              id: 'placement',
              title: 'Placement',
              render: () => (
                <>
                  <Text>
                    Tooltip can be anchored in different directions with the <Code primary>placement</Code> property. It
                    will automatically find a position if there's not enough space in the chosen direction.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(4, min-content)">
                      <Tooltip trigger={<Button>Right</Button>} placement="right">
                        Tooltip Content
                      </Tooltip>
                      <Tooltip trigger={<Button>Top</Button>} placement="top">
                        Tooltip Content
                      </Tooltip>
                      <Tooltip trigger={<Button>Left</Button>} placement="left">
                        Tooltip Content
                      </Tooltip>
                      <Tooltip trigger={<Button>Bottom</Button>} placement="bottom">
                        Tooltip Content
                      </Tooltip>
                    </Grid>

                    {/* jsx-to-string:end */}
                  </CodePreview>
                </>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <TooltipPropTable renderPanel={false} />
      </Panel>
    </>
  );
};

export default TooltipPage;
