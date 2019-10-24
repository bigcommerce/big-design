import { Flex } from '@bigcommerce/big-design';
import styled from 'styled-components';

export const StyledFlex = styled(Flex)`
  ${({ theme }) => theme.shadow.raised}

  background-color: ${({ theme }) => theme.colors.secondary10};
  border-radius: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.sticky};

  ${({ theme }) => theme.breakpoints.tablet} {
    bottom: 0;
    box-shadow: none;
    display: block;
    height: 100vh;
    overflow: auto;
    position: sticky;
  }
`;
