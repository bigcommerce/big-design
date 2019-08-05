import { Box, H4 } from '@bigcommerce/big-design';
import React from 'react';

export const SideNavGroup: React.FC<{ title: string }> = props => {
  return (
    <Box marginTop="xLarge">
      <H4>{props.title}</H4>
      {props.children}
    </Box>
  );
};
