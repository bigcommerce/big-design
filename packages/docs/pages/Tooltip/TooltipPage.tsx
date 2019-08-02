import { Box, Button, Flex, Tooltip } from '@bigcommerce/big-design';
import { AddIcon } from '@bigcommerce/big-design-icons';
import React from 'react';

export default () => (
  <Flex alignItems="center" flexDirection="column">
    <Tooltip content="Tooltip Content" placement="top">
      <Button>Hover</Button>
    </Tooltip>
    <Box marginTop="xxLarge">
      <Tooltip content="Tooltip Content" placement="right">
        <span>Hover</span>
      </Tooltip>
    </Box>
    <Box marginTop="xxLarge">
      <Tooltip content="Tooltip Content" placement="bottom">
        <AddIcon />
      </Tooltip>
    </Box>
  </Flex>
);
