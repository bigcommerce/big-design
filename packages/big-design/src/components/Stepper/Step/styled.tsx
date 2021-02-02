import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled from 'styled-components';

import { Box } from '../../Box';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { StyleableText } from '../../Typography/private';

export const StyledStep = styled(Grid)`
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

export const StyledSrOnlyText = styled.span`
  ${({ theme }) => theme.breakpoints.tablet} {
    ${hideVisually()}
  }
`;

export const StyledLight = styled(Flex)`
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

export const StyledDash = styled(Box)`
  align-self: center;
  height: ${({ theme }) => theme.helpers.remCalc(2)};
  grid-area: dash;
  width: 100%;
`;

export const StyledText = styled(StyleableText)`
  grid-area: text;
`;

StyledStep.defaultProps = { theme: defaultTheme };
StyledSrOnlyText.defaultProps = { theme: defaultTheme };
StyledLight.defaultProps = { theme: defaultTheme };
StyledDash.defaultProps = { theme: defaultTheme };
StyledText.defaultProps = { theme: defaultTheme };
