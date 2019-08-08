import { Box, Button, Flex, H0, H1, Link, Text, Tooltip } from '@bigcommerce/big-design';
import { AddIcon, WarningIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

import { CodePreview } from '../../components';
import { TooltipPropTable } from '../../PropTables/TooltipPropTable';

export default () => (
  <>
    <H0>Tooltips</H0>

    <Text>
      Tooltips contain information to help users understand actions or page elements. They are short, and triggered by a
      user hovering with their keyboard or mouse over a UI element.{' '}
      <Link href="https://bigcommerce.design/tooltips" target="_blank">
        Tooltips Design Guidelines
      </Link>
    </Text>

    <CodePreview>
      {/* jsx-to-string:start */}
      <Tooltip content="Tooltip Content" placement="right">
        <Button>Hover</Button>
      </Tooltip>
      {/* jsx-to-string:end */}
    </CodePreview>

    <TooltipPropTable />

    <H1>Placement</H1>
    <CodePreview>
      {/* jsx-to-string:start */}
      <>
        <Tooltip content="Tooltip Content" placement="right">
          <Button marginRight="xSmall">Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="top">
          <Button marginRight="xSmall">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="left">
          <Button marginRight="xSmall">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip Content" placement="bottom">
          <Button marginRight="xSmall">Bottom</Button>
        </Tooltip>
      </>
      {/* jsx-to-string:end */}
    </CodePreview>

    <H1>Icons</H1>
    <CodePreview>
      {/* jsx-to-string:start */}
      <Tooltip content="Warning message" placement="right">
        <WarningIcon />
      </Tooltip>
      {/* jsx-to-string:end */}
    </CodePreview>
  </>
);
