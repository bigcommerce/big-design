import { Box, H4 } from '@bigcommerce/big-design';
import React from 'react';
import styled from 'styled-components';

import { List } from '../../List';

const StyledList = styled(List)`
  margin: ${({ theme }) => theme.spacing.none};
  padding: ${({ theme }) => theme.spacing.none};
`;

export const SideNavGroup: React.FC<{ title: string }> = props => {
  return (
    <Box marginTop={{ mobile: 'xxSmall', tablet: 'xLarge' }} marginHorizontal={{ mobile: 'medium', tablet: 'none' }}>
      <H4>{props.title}</H4>
      <StyledList bulleted={false}>{props.children}</StyledList>
    </Box>
  );
};
