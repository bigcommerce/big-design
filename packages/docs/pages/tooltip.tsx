import { Box, Button, Flex, Grid, H1, Panel, Text, Tooltip } from '@bigcommerce/big-design';
import { WarningIcon } from '@bigcommerce/big-design-icons';
import React, { Fragment } from 'react';

import { Code, CodePreview, ContentRoutingTabs, GuidelinesTable, List } from '../components';
import { TooltipPropTable } from '../PropTables';

const TooltipPage = () => {
  return (
    <>
      <H1>Tooltip</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>Tooltip</Code>s contain information to help users understand actions or page
          elements.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>
            They are short, and triggered by a user hovering with their keyboard or mouse over a UI
            element.
          </List.Item>
          <List.Item>
            They are used to help reduce information density on otherwise crowded pages or forms.
          </List.Item>
          <List.Item>
            Use tooltips to explain columns in a table, explain buttons (e.g. add, edit) on page or
            alongisde a help icon.
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
                <CodePreview key="basic">
                  {/* jsx-to-string:start */}
                  <Tooltip placement="right" trigger={<Button>Hover</Button>}>
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
                <Fragment key="anchor">
                  <Text>
                    Tooltips can wrap any <Code>Element</Code>. Tooltip will show on hover.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Flex alignItems="center">
                      <Box marginRight="medium">
                        <Tooltip placement="right" trigger={<Button>Button</Button>}>
                          Tooltip Content
                        </Tooltip>
                      </Box>

                      <Box marginRight="medium">
                        <Tooltip placement="right" trigger={<WarningIcon />}>
                          Tooltip Content
                        </Tooltip>
                      </Box>
                      <Box marginRight="medium">
                        <Tooltip placement="right" trigger={<span>Span</span>}>
                          Tooltip Content
                        </Tooltip>
                      </Box>
                    </Flex>
                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
            {
              id: 'placement',
              title: 'Placement',
              render: () => (
                <Fragment key="placement">
                  <Text>
                    Tooltip can be anchored in different directions with the{' '}
                    <Code primary>placement</Code> property. It will automatically find a position
                    if there's not enough space in the chosen direction.
                  </Text>

                  <CodePreview>
                    {/* jsx-to-string:start */}
                    <Grid gridColumns="repeat(4, min-content)">
                      <Tooltip placement="right" trigger={<Button>Right</Button>}>
                        Tooltip Content
                      </Tooltip>
                      <Tooltip placement="top" trigger={<Button>Top</Button>}>
                        Tooltip Content
                      </Tooltip>
                      <Tooltip placement="left" trigger={<Button>Left</Button>}>
                        Tooltip Content
                      </Tooltip>
                      <Tooltip placement="bottom" trigger={<Button>Bottom</Button>}>
                        Tooltip Content
                      </Tooltip>
                    </Grid>

                    {/* jsx-to-string:end */}
                  </CodePreview>
                </Fragment>
              ),
            },
          ]}
        />
      </Panel>

      <Panel header="Props" headerId="props">
        <TooltipPropTable />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Avoid headers in <Code primary>Tooltip</Code>s.
            </>,
            <>
              Don’t place actions in <Code primary>Tooltip</Code>s.
            </>,
            <>
              If information is vital to complete a step, then it should be visible above/next to
              the element, not hidden in the <Code primary>Tooltip</Code>.
            </>,
          ]}
          recommended={[
            <>
              <Code primary>Tooltip</Code>s should have short, static information.
            </>,
            <>
              Keep <Code primary>Tooltip</Code>s to less than three lines tall.
            </>,
          ]}
        />
      </Panel>
    </>
  );
};

export default TooltipPage;
