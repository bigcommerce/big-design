import { Flex } from '@bigcommerce/big-design';
import styled from 'styled-components';

export const StyledMenu = styled(Flex.Item)`
  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

interface Navigation {
  isExpanded: boolean;
}

export const StyledNavigation = styled(Flex.Item)<Navigation>`
  ${({ theme }) => theme.shadow.floating}

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ theme }) => theme.border.box};
  border-radius: 0;
  border-top: ${({ theme }) => theme.border.box};
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  height: 16rem;
  left: 0;
  overflow: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;

  ${({ theme }) => theme.breakpoints.tablet} {
    border: 0;
    box-shadow: none;
    display: block;
    height: auto;
    position: static;
    background-color: transparent;
  }
`;
