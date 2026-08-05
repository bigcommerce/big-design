import { FlexItem } from '@bigcommerce/big-design';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export const StyledMenu = styled(FlexItem)`
  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

interface Navigation {
  isExpanded: boolean;
}

export const StyledNavigation = styled(FlexItem)<Navigation>`
  ${({ theme }) =>
    // Temporary until docs flips to styled-components 6: the theme dist now types
    // CSSRules as v6's RuleSet, which v5's css typings can't accept.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    theme.shadow.floating as unknown as FlattenSimpleInterpolation};

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: ${({ theme }) =>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    theme.border.box as unknown as FlattenSimpleInterpolation};
  border-radius: 0;
  border-top: ${({ theme }) =>
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    theme.border.box as unknown as FlattenSimpleInterpolation};
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  height: 16rem;
  left: 0;
  overflow: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.sticky};

  ${({ theme }) => theme.breakpoints.tablet} {
    border: 0;
    box-shadow: none;
    display: block;
    height: auto;
    position: static;
    background-color: transparent;
  }
`;
