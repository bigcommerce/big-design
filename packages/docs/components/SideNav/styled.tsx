import { Flex } from '@bigcommerce/big-design';
import styled from 'styled-components';

export const StyledFlex = styled(Flex)`
  bottom: 0;
  height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0;
`;

export const StyledLogo = styled.div`
  cursor: pointer;
  position: relative;
`;

export const StyledBadgeWrapper = styled.div`
  bottom: -1rem;
  position: absolute;
  right: 0;
`;
