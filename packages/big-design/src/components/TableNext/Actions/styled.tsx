import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { type TransientFlexedProps } from '../../Flex/types';
import { withFlexedContainer } from '../../Flex/withFlex';

interface StyledFlexProps extends TransientFlexedProps {
  $stickyHeader?: boolean;
}

export const StyledFlex = styled.div<StyledFlexProps>`
  ${withFlexedContainer()}

  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.xLarge}`};

  ${({ theme, $stickyHeader }) =>
    $stickyHeader &&
    css`
      ${theme.breakpoints.tablet} {
        position: sticky;
        top: 0;
        z-index: ${theme.zIndex.sticky + 1};
      }
    `}
`;

StyledFlex.defaultProps = { theme: defaultTheme };
