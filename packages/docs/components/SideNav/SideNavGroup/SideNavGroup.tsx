import { Box, H4 } from '@bigcommerce/big-design';
import React from 'react';

import { List } from '../../List';

export const SideNavGroup: React.FC<{ children?: React.ReactNode; title: string }> = (props) => {
  return (
    <Box marginTop={{ mobile: 'xxSmall', tablet: 'xLarge' }} marginHorizontal={{ mobile: 'medium', tablet: 'none' }}>
      <H4>{props.title}</H4>
      <List reset>{props.children}</List>
    </Box>
  );
};
