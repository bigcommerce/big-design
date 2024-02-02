import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { Flex } from '../Flex';

export const StyledAccordionPanelWrapper = styled(Flex)`
  flex-direction: column;

  margin-bottom: -${({ theme }) => theme.spacing.medium};
  margin-left: -${({ theme }) => theme.spacing.medium};
  margin-right: -${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-bottom: -${({ theme }) => theme.spacing.xLarge};
    margin-left: -${({ theme }) => theme.spacing.xLarge};
    margin-right: -${({ theme }) => theme.spacing.xLarge};
  }
`;

StyledAccordionPanelWrapper.defaultProps = { theme: defaultTheme };
