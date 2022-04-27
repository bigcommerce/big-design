import { Box, H4 } from '@bigcommerce/big-design';
import React from 'react';

import { List } from '../../List';

export const SideNavGroup: React.FC<{ title: string }> = (props) => {
  return (
    <Box
      marginHorizontal={{ mobile: 'medium', tablet: 'none' }}
      marginTop={{ mobile: 'xxSmall', tablet: 'xLarge' }}
    >
      <H4>{props.title}</H4>
      <List reset>{props.children}</List>
    </Box>
  );
};
