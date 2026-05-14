import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { StyleableText } from '../../Typography/private';

export const StyledStep = styled(Grid).attrs(withDefaultTheme)`
  flex-basis: 100%;
  gap: ${({ theme }) => theme.spacing.xSmall};
  grid-template-areas:
    'light dash'
    'text text';
  grid-template-columns: auto 1fr;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: ${({ theme }) => theme.spacing.xLarge} 1fr;
    grid-template-rows: ${({ theme }) => theme.spacing.xLarge} 1fr;
    max-width: ${({ theme }) => theme.helpers.remCalc(228)};
    min-width: ${({ theme }) => theme.helpers.remCalc(96)};
  }
`;

export const StyledSrOnlyText = styled.span.attrs(withDefaultTheme)`
  ${({ theme }) => theme.breakpoints.tablet} {
    ${hideVisually()}
  }
`;

export const StyledLight = styled(Flex).attrs(withDefaultTheme)`
  border-radius: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.white};
  grid-area: light;
  user-select: none;

  ${({ theme }) => theme.breakpoints.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.circle};
    font-size: ${({ theme }) => theme.typography.fontSize.medium};
    line-height: ${({ theme }) => theme.lineHeight.medium};
  }
`;

export const StyledDash = styled(Box).attrs(withDefaultTheme)`
  align-self: center;
  height: ${({ theme }) => theme.helpers.remCalc(2)};
  grid-area: dash;
  width: 100%;
`;

export const StyledText = styled(StyleableText).attrs(withDefaultTheme)`
  grid-area: text;
`;
