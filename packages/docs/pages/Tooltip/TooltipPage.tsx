import { Box, Button, Flex, Grid, H0, H1, H2, Link, Text, Tooltip } from '@bigcommerce/big-design';
import { WarningIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { Code, CodePreview } from '../../components';
import { TooltipPropTable } from '../../PropTables/TooltipPropTable';

export default () => (
  <>
    <H0>Tooltips</H0>

    <Text>
      Tooltips contain information to help users understand actions or page elements. They are short, and triggered by a
      user hovering with their keyboard or mouse over a UI element.{' '}
      <Link href="https://design.bigcommerce.com/components/tooltips" target="_blank">
        Tooltips Design Guidelines
      </Link>
      .
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Tooltip trigger={<Button>Hover</Button>} placement="right">
        Tooltip Content
      </Tooltip>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>

    <H2>Tooltip</H2>

    <TooltipPropTable />

    <H1>Examples</H1>

    <H2>Anchor</H2>

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

    <H2>Placement</H2>

    <Text>
      Tooltip can be anchored in different directions with the <Code primary>placement</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
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
);
