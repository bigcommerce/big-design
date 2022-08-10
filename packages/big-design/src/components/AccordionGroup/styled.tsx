import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Box } from '../Box';
import { StyleableH2 } from '../Typography/Typography';

export const StyledAccordionGroup = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  border: ${({ theme }) => theme.border.box};
  ${({ theme }) => theme.shadow.raised};
`;

export const StyledH2 = styled(StyleableH2)`
  padding: ${({ theme }) => theme.spacing.xLarge};
  border-bottom: ${({ theme }) => theme.border.box};
  margin: 0;
`;

StyledAccordionGroup.defaultProps = { theme: defaultTheme };
