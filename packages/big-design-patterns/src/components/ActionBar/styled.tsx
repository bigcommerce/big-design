import { Box, Flex } from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledActionBar = styled(Box).attrs({ theme: defaultTheme })`
  box-sizing: content-box;
  position: sticky;
  inset: auto 0 0;
  height: ${({ theme }) => theme.helpers.remCalc(60)};
`;

export const StyledActionBarContents = styled(Flex).attrs({ theme: defaultTheme })`
  margin: 0 auto;
  overflow: auto;

  ${({ theme }) => theme.breakpoints.desktop} {
    max-width: ${({ theme }) => theme.helpers.remCalc(1120)};
  }
  ${({ theme }) => theme.breakpoints.wide} {
    max-width: ${({ theme }) => theme.helpers.remCalc(1400)};
  }
`;
