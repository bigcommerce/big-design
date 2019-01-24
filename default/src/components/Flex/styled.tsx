import styled from 'styled-components';

import { FlexProps } from './Flex';

export const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  ${({ theme }) => theme.breakpoints.medium} {
    flex-direction: ${({ flexDirection }) => flexDirection};
  }
`;
