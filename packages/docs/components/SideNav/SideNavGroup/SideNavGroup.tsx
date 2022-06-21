import { Box, H4 } from '@bigcommerce/big-design';
import React from 'react';

import { List } from '../../List';

interface Props {
  children?: React.ReactNode;
  title: string;
}

export const SideNavGroup: React.FC<Props> = ({ children, title }) => {
  return (
    <Box
      marginHorizontal={{ mobile: 'medium', tablet: 'none' }}
      marginTop={{ mobile: 'xxSmall', tablet: 'xLarge' }}
    >
      <H4>{title}</H4>
      <List reset>{children}</List>
    </Box>
  );
};
