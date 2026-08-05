import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import { ListProps } from './List';

interface StyledListProps {
  $columnCount?: ListProps['columnCount'];
  $columnGap?: ListProps['columnGap'];
  $reset?: ListProps['reset'];
}

const SharedListStyles = css<StyledListProps>`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding-left: ${({ theme }) => theme.spacing.xLarge};

  ${({ theme }) => theme.breakpoints.tablet} {
    column-count: ${({ $columnCount }) => $columnCount};
    column-gap: ${({ $columnGap }) => $columnGap};
  }

  ${({ $reset, theme }) =>
    $reset &&
    css`
      ${
        // Temporary until docs flips to styled-components 6: the theme dist now types
        // CSSRules as v6's RuleSet, which v5's css typings can't accept.
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        theme.helpers.listReset as unknown as FlattenSimpleInterpolation
      };
    `}
`;

export const StyledOrderedList = styled.ol<StyledListProps>`
  ${SharedListStyles};
`;

export const StyledUnorderedList = styled.ul<StyledListProps>`
  ${SharedListStyles}
`;
