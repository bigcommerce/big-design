import { Box, Button, Flex, Grid, H0, H1, Link, Text, Tooltip } from '@bigcommerce/big-design';
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
      <Link href="https://bigcommerce.design/tooltips" target="_blank">
        Tooltips Design Guidelines.
      </Link>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Tooltip content="Tooltip Content" placement="right">
        <Button>Hover</Button>
      </Tooltip>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>API</H1>
    <TooltipPropTable />

    <H1>Usage</H1>
    <Text>Tooltips can wrap any Element.</Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Flex alignItems="center">
        <Box marginRight="medium">
          <Tooltip content="Tooltip Content" placement="right">
            <Button>Button</Button>
          </Tooltip>
        </Box>

        <Box marginRight="medium">
          <Tooltip content="Tooltip Content" placement="right">
            <WarningIcon />
          </Tooltip>
        </Box>
        <Box marginRight="medium">
          <Tooltip content="Tooltip Content" placement="right">
            <span>Span</span>
          </Tooltip>
        </Box>
      </Flex>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Placement</H1>

    <Text>
      Dropdown can be anchored in different directions with the <Code primary>placement</Code> property. It will
      automatically find a position if there's not enough space in the chosen direction.
    </Text>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Grid gridColumns="repeat(4, min-content)">
        <Tooltip content="Tooltip Content" placement="right">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
      </Grid>

      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
